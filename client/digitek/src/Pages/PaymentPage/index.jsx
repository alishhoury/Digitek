import React from "react";
import "./style.css";
import ShippingSection from "../../Components/Checkout/ShippingSection";
import PaymentBox from "../../Components/Checkout/PaymentBox";

export default function CheckoutPage() {
  return (
    <>
      <div className="header-bar"></div>
      <main className="container">
        <div className="checkout-grid">
          <ShippingSection />
          <PaymentBox />
        </div>
      </main>
    </>
  );
}
