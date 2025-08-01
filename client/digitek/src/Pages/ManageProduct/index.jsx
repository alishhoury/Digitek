import NavBar from "../../Components/Navbar";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import ImageIcon from "../../assets/ImageIcon.svg";
import "./style.css";

const ManageProduct = () => {

  return (
    <div className="product-page">
      <div className="product-upload">
        <div className="upload-label">Upload Image</div>

        <label htmlFor="fileInput" className="upload-box">
          <img src={ImageIcon} alt="Upload" className="upload-icon" />
          <p>Click to upload an image</p>
        </label>

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          className="hidden-file-input"
        />

        <div>
          <h1>Product details</h1>

          <label>Product name</label>
          <Input
            type="text"
            name="productName"
            value="iPhone 15 Pro max"
            hint="iPhone 15 Pro max"
            className="add-p-input"
            required={true}
          />

          <div className="input-row">
            <div>
              <label>Price</label>
              <Input
                type="text"
                name="price"
                value="$865.00"
                hint="$865.00"
                className="add-p-input"
                required={true}
              />
            </div>

            <div>
              <label>Quantity</label>
              <Input
                type="text"
                name="quantity"
                value="1"
                hint="1"
                className="add-p-input"
                required={true}
              />
            </div>
          </div>

          <div className="input-row">
            <div>
              <label>Cost</label>
              <Input
                type="text"
                name="cost"
                value="$800.00"
                hint="$800.00"
                className="add-p-input"
                required={true}
              />
            </div>

            <div>
              <label>Brand</label>
              <Input
                type="text"
                name="brand"
                value="Apple"
                hint="Apple"
                className="add-p-input"
                required={true}
              />
            </div>
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              defaultValue="Apple latest phone"
              className="add-p-textarea"
              placeholder="Apple latest phone"
            />
          </div>

          <div className="add-p-btn-cont">
            <Button 
              text={"Add Product"}
              className={"add-p-btn"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;