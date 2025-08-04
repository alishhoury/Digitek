import "./style.css";
import EditIcon from "../../assets/EditIcon.svg";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import useManageStockLogic from "./logic.js";
const ManageStock = () => {
  const { products, message, handleDelete, handleEdit } = useManageStockLogic();
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
