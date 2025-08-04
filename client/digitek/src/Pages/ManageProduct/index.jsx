import NavBar from "../../Components/Navbar";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import ImageIcon from "../../assets/ImageIcon.svg";
import "./style.css";
import useManageProductLogic from "./logic.js";

const ManageProduct = () => {
  const {
    id,
    name,
    price,
    total_quantity,
    cost,
    brand,
    description,
    imageName,
    message,
    uploadImage,
    handleAddProduct,
    handleFieldChange,
  } = useManageProductLogic();

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
            onChangeListener={(e) => handleFieldChange("name", e.target.value)}
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
                  handleFieldChange("price", e.target.value)
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
                  handleFieldChange("total_quantity", e.target.value)
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
                  handleFieldChange("cost", e.target.value)
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
                  handleFieldChange("brand", e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
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
