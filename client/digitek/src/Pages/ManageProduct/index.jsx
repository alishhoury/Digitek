import NavBar from "../../Components/Navbar";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import ImageIcon from "../../assets/ImageIcon.svg";
import "./style.css";
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

const ManageProduct = () => {
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
          const response = await api.get(`/retrieveProducts/${id}`);
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

  return (
    <div className="product-page">
      <div className="product-upload">
        <div className="upload-label">Upload Image</div>

        <label htmlFor="fileInput" className="upload-box">
          <img src={ImageIcon} alt="Upload" className="upload-icon" />
          <p>{imageName ? imageName : "Click to upload an image"}</p>
        </label>

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          className="hidden-file-input"
          onChange={uploadImage}
        />

        <form onSubmit={handleAddProduct}>
          <h1>Product details</h1>

          <label>Product name</label>
          <Input
            type="text"
            name="productName"
            value={name}
            hint="iPhone 15 Pro max"
            className="add-p-input"
            required={true}
            onChangeListener={(e) =>
              dispatch(setField({ field: "name", value: e.target.value }))
            }
          />

          <div className="input-row">
            <div>
              <label>Price</label>
              <Input
                type="number"
                name="price"
                value={price}
                hint="$865.00"
                className="add-p-input"
                required={true}
                onChangeListener={(e) =>
                  dispatch(setField({ field: "price", value: e.target.value }))
                }
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label>Quantity</label>
              <Input
                type="number"
                name="quantity"
                value={total_quantity}
                hint="1"
                className="add-p-input"
                required={true}
                onChangeListener={(e) =>
                  dispatch(
                    setField({ field: "total_quantity", value: e.target.value })
                  )
                }
                min="0"
              />
            </div>
          </div>

          <div className="input-row">
            <div>
              <label>Cost</label>
              <Input
                type="number"
                name="cost"
                value={cost}
                hint="$800.00"
                className="add-p-input"
                required={true}
                onChangeListener={(e) =>
                  dispatch(setField({ field: "cost", value: e.target.value }))
                }
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label>Brand</label>
              <Input
                type="text"
                name="brand"
                value={brand}
                hint="Apple"
                className="add-p-input"
                required={true}
                onChangeListener={(e) =>
                  dispatch(setField({ field: "brand", value: e.target.value }))
                }
              />
            </div>
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) =>
                dispatch(
                  setField({ field: "description", value: e.target.value })
                )
              }
              className="add-p-textarea"
              placeholder="Apple latest phone"
            />
          </div>

          <div className="add-p-btn-cont">
            <Button
              text={id ? "Update Product" : "Add Product"}
              className={"add-p-btn"}
              type="submit"
            />
          </div>

          {message && (
            <p
              className={`message ${
                message.startsWith("Error") ? "error" : ""
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ManageProduct;
