import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import "./style.css";
import fallbackImage from "../../assets/ProductImage.jpg";
import api from "../../services/axios";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);

  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    if (quantity > 0) {
      console.log(`Current quantity of ${product.name}: ${quantity}`);
    }
  }, [quantity, product.name]);

  const handleAddToCart = () => {
    if (quantity < product.total_quantity) {
      dispatch(
        addToCart({
          product: {
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            total_quantity: product.total_quantity,
          },
        })
      );
    }
  };

  return (
    <div className="product-card">
      <div className="card-container">
        <div className="card-image">
          <img
            src={product.image}
            alt={product.name}
            onError={e => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />
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
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);

    api
      .get(`/products?page=${currentPage}`)
      .then(response => {
        setProducts(response.data.payload.data);
        const next_page_url = response.data.payload.next_page_url
        const hasNext = next_page_url !== null;
        dispatch(sethasNext({
          hasNext,currentPage,next_page_url
        }))
        
      })
      .catch(error => {
        console.log("API Error:", error);
        setProducts([]);
      });
  }, [currentPage]);

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
