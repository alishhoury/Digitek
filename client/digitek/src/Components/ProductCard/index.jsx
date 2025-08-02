import React, { useState, useEffect } from "react";
import "./style.css";
import api from "../../services/axios";


const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
  if (quantity > 0) {
    console.log(`Current quantity of ${product.name}: ${quantity}`);
  }
}, [quantity, product.name]);


  const handleAddToCart = () => {
    if (quantity < product.total_quantity) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="product-card">
      <div className="card-container">
        <div className="card-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="card-content">
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
          </div>

          <div className="price-stock">
            <p className="price">${product.price}</p>
            <p className="stock">{product.total_quantity} pieces left</p>
          </div>

          <div className="quantity">
            <span className="quantity-display">{quantity}</span>
          </div>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = ({ currentPage }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    api.get(`/products?page=${currentPage}`)
      .then(response => {
        setProducts(response.data.payload.data);
      })
      .catch(error => {
        console.log('API Error:', error);
        setProducts([]);
      });
  }, [currentPage]);

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;