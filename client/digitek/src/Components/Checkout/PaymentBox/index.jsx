import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import Button from "../../Button";
import api from "../../../services/axios";
import { toast } from "react-toastify";
import fallbackImage from "../../../assets/ProductImage.jpg";

export default function PaymentBox() {
  const { order_number } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/getByOrderNumber/${order_number}`);

        if (response.data.status === "success") {
          const items = response.data.payload.products.map(product => ({
            id: product.id,
            name: product.name,
            brand: product.brand,
            image: product.image,
            price: parseFloat(product.pivot.price),
            quantity: product.pivot.quantity,
          }));

          setCartItems(items);
          console.log(response.data.payload.id);
          setOrderId(response.data.payload.id);

          const total = items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          setSubtotal(total);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    fetchOrder();
  }, [order_number]);

  const onConfirm = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.address) {
      toast.warn("Please fill in your shipping info first.");
      return;
    }

    setLoading(true); // Start loading
    try {
      await api.post(`/payOrder/${orderId}`);
      toast.success("Payment successful!");
      navigate("/profile");
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <section className="right-section">
      <h2 className="section-title">Order Summary</h2>
      <div className="order-summary-box">
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="order-item">
              <img
                src={item.image}
                alt={item.name}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
              />
              <div className="item-details">
                <p className="item-name">{item.name}</p>
                <p className="item-brand">Brand: {item.brand}</p>
                <p className="item-price">
                  ${item.price.toFixed(2)} x {item.quantity}
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
          loading={loading}
          loadingText="Processing..."
        />
      </div>
    </section>
  );
}
