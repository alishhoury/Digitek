import React from "react";
import "./style.css";
import Button from "../../Button";

export default function PaymentBox({ cartItems, subtotal, onConfirm }) {
  return (
    <section className="right-section">
      <h2 className="section-title">Order Summary</h2>
      <div className="order-summary-box">
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="order-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <p className="item-name">{item.name}</p>
                <p className="item-brand">Brand: {item.brand}</p>
                <p className="item-price">
                  ${item.price} x {item.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <dl className="totals">
          <div className="total-row">
            <dt>Taxes</dt>
            <dd>$0.00</dd>
          </div>
          <div className="total-row subtotal">
            <dt>Sub Total</dt>
            <dd>${subtotal.toFixed(2)}</dd>
          </div>
        </dl>

        <Button
          text={`Confirm Payment – $${subtotal.toFixed(2)}`}
          onClickListener={onConfirm}
          className="btn-primary confirm-btn"
        />
      </div>
    </section>
  );
}
