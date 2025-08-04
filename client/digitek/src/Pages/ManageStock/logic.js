import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/axios";
import { setProducts, setMessage } from "../../features/stock/stockSlice";

const useManageStockLogic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, message } = useSelector((global) => global.stock);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(setMessage(""));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/stock", {
          withCredentials: true,
        });
        dispatch(setProducts(response.data));
      } catch (error) {
        console.error("Error fetching products: ", error);
        dispatch(setMessage("Error fetching products."));
      }
    };

    getProducts();
  }, [dispatch]);

  const handleDelete = async (product) => {
    try {
      await api.delete(`/products/${product.id}`, {
        withCredentials: true,
      });
      const updatedProducts = products.filter((p) => p.id !== product.id);
      dispatch(setProducts(updatedProducts));
      dispatch(setMessage(`Deleted "${product.name}" successfully.`));
    } catch (error) {
      console.error("Delete failed:", error);
      dispatch(setMessage(`Failed to delete "${product.name}".`));
    }
  };

  const handleEdit = (productId) => {
    navigate(`/manageProduct/${productId}`);
  };

  return { products, message, handleDelete, handleEdit };
};

export default useManageStockLogic;