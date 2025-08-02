import { useState, useEffect } from "react";
import api from "../../services/axios";
import "./style.css";
import EditIcon from "../../assets/EditIcon.svg";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import { useNavigate } from "react-router-dom";

const ManageStock = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/products", {
          withCredentials: true,
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    getProducts();
  }, []);

  const handleDelete = async (product) => {
    try {
      await api.delete(`/products/${product.id}`, {
        withCredentials: true,
      });
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      setMessage(`Deleted "${product.name}" successfully.`);
    } catch (error) {
      console.error("Delete failed:", error);
      setMessage(`Failed to delete "${product.name}".`);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/manageProduct/${productId}`);
  };

  return (
    <div className="stock-products-page">
      {message && <div className="floating-message">{message}</div>}
      <h1>All Products</h1>
      <div className="product-table-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Status</th>
              <th>Total Quantity</th>
              <th>Total Sold</th>
              <th>Quantity Left</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const quantity_left =
                product.total_quantity - product.quantity_sold;
              const status = quantity_left === 0 ? "Out of Stock" : "In Stock";

              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td
                    className={
                      status === "Out of Stock" ? "out-of-stock" : "in-stock"
                    }
                  >
                    {status}
                  </td>
                  <td>{product.total_quantity}</td>
                  <td>{product.quantity_sold}</td>
                  <td>{quantity_left}</td>
                  <td>${product.price}</td>
                  <td>
                    <div className="icon-btn">
                      <img
                        src={EditIcon}
                        alt="Edit"
                        className="action-icon edit-icon"
                        onClick={() => handleEdit(product.id)}
                      />
                      <img
                        src={DeleteIcon}
                        alt="Delete"
                        className="action-icon delete-icon"
                        onClick={() => handleDelete(product)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStock;
