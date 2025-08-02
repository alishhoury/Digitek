import React from "react";
import "./style.css";
import ShippingSection from "../../Components/Checkout/ShippingSection";
import PaymentBox from "../../Components/Checkout/PaymentBox";

const dummyCartItems = [
  {
    id: 1,
    name: "iPhone 13 Pro Max",
    brand: "Apple",
    price: 999,
    quantity: 1,
    image:
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-max-1.jpg",
  },
  {
    id: 2,
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1199,
    quantity: 2,
    image:
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-max-1.jpg",
  },
  {
    id: 3,
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1199,
    quantity: 2,
    image:
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-max-1.jpg",
  },
  {
    id: 4,
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1199,
    quantity: 2,
    image:
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-max-1.jpg",
  },
  {
    id: 5,
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1199,
    quantity: 2,
    image:
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-max-1.jpg",
  },
];

export default function CheckoutPage() {
  const subtotal = dummyCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="header-bar"></div>
      <main className="container">
        <div className="checkout-grid">
          <ShippingSection />
          <PaymentBox cartItems={dummyCartItems} subtotal={subtotal} />
        </div>
      </main>
    </>
  );
}
