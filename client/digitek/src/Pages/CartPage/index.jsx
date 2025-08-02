// src/components/Cart.jsx
import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";

const Cart = () => {
  const cartProducts = useSelector(state => state.cart.cartItems);

  const subtotal = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <main className="shopping-cart">
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="cart-container">
          <section className="cart-items">
            <ul>
              {cartProducts.map(item => (
                <li className="cart-item" key={item.id}>
                  <button className="remove-btn" aria-label="Remove item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#6b7280"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="product-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{item.name}</h3>
                    <div className="product-meta">
                      <span className="brand-tag">Brand: {item.brand}</span>
                    </div>
                    <p className="product-price">
                      ${item.price} × {item.quantity}
                    </p>
                    <div className="quantity-select">
                      <select disabled>
                        <option value={item.quantity}>{item.quantity}</option>
                      </select>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <div className="summary-row total">
                <span>Order Total</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
            </div>
            <button className="submit-btn">Submit Order</button>
          </section>
        </div>
      </main>
    </>
  );
};

export default Cart;
