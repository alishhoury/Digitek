import NavBar from "../../Components/Navbar";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import ImageIcon from "../../assets/ImageIcon.svg";
import "./style.css";
import { useState, useEffect } from "react";
import api from "../../services/axios";
import { useParams } from "react-router-dom";

const ManageProduct = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [total_quantity, setTotalQuantity] = useState("");
  const [cost, setCost] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

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
      setImage(base64);
      setImageName(file.name);
    } else {
      setImage(null);
      setImageName("");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/retrieveProducts/${id}`);
        const product = response.data.product;

        setName(product.name);
        setPrice(product.price);
        setTotalQuantity(product.total_quantity);
        setCost(product.cost);
        setBrand(product.brand);
        setDescription(product.description);
        setImage(product.image);
        setImageName("Existing Image");
      } catch (err) {
        console.error("Error fetching product:", err);
        setMessage("Error fetching product data.");
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

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
        setMessage("Product updated successfully!");
      } else {
        await api.post("/products", payload, { withCredentials: true });
        setMessage("Product added successfully!");

        setName("");
        setPrice("");
        setTotalQuantity("");
        setCost("");
        setBrand("");
        setDescription("");
        setImage(null);
        setImageName("");
      }
    } catch (error) {
      setMessage(
        "Error: " +
          (error.response?.data?.message ||
            error.message ||
            "Failed to save product")
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
            onChangeListener={(e) => setName(e.target.value)}
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
                onChangeListener={(e) => setPrice(e.target.value)}
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
                onChangeListener={(e) => setTotalQuantity(e.target.value)}
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
                onChangeListener={(e) => setCost(e.target.value)}
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
                onChangeListener={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
