import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setField,
  setImage,
  setAllFields,
  resetForm,
  setMessage,
  clearMessage,
} from "../../features/productForm/productFormSlice";
import api from "../../services/axios";

const useManageProductLogic = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    name,
    price,
    total_quantity,
    cost,
    brand,
    description,
    image,
    imageName,
    message,
  } = useSelector((global) => global.productForm);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await api.get(`/retrieveProducts/${id}`, { withCredentials: true });
          const product = response.data.product;
          dispatch(setAllFields(product));
        } catch (err) {
          console.error("Error fetching product:", err);
          dispatch(setMessage("Error fetching product data."));
        }
      };
      fetchProduct();
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
        dispatch(resetForm());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadImage = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await fileToBase64(file);
      dispatch(setImage({ image: base64, name: file.name }));
    } else {
      dispatch(setImage({ image: "", name: "" }));
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      price: Number(price),
      total_quantity: Number(total_quantity),
      cost: Number(cost),
      brand,
      description,
      image: image || "",
    };

    try {
      if (id) {
        await api.put(`/products/${id}`, payload, { withCredentials: true });
        dispatch(setMessage("Product updated successfully!"));
      } else {
        await api.post("/products", payload, { withCredentials: true });
        dispatch(setMessage("Product added successfully!"));
      }
    } catch (error) {
      dispatch(
        setMessage(
          "Error: " +
            (error.response?.data?.message ||
              error.message ||
              "Failed to save product")
        )
      );
      console.error("Error saving product:", error);
    }
  };

  const handleFieldChange = (field, value) => {
    dispatch(setField({ field, value }));
  };

  return {
    id,
    name,
    price,
    total_quantity,
    cost,
    brand,
    description,
    image,
    imageName,
    message,
    uploadImage,
    handleAddProduct,
    handleFieldChange,
  };
};

export default useManageProductLogic;
