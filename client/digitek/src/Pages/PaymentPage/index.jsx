import React, { useState } from "react";
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
    id: 2,
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1199,
    quantity: 2,
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
    id: 2,
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1199,
    quantity: 2,
    image:
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-max-1.jpg",
  },
];

const dummyShippingAddress = {
  firstName: "Ali",
  lastName: "Al Saghir",
  city: "Beirut",
  address: "Hamra Street",
  phone: "+961 71 234 567",
};

export default function CheckoutPage() {
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    phone: "",
  });

  const subtotal = dummyCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleInputChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleAddShipping(e) {
    e.preventDefault();
    setShowShippingDetails(true);
  }

  return (
    <>
      <div className="header-bar"></div>
      <main className="container">
        <div className="checkout-grid">
          <ShippingSection
            showShippingDetails={showShippingDetails}
            formData={formData}
            dummyShippingAddress={dummyShippingAddress}
            onChange={handleInputChange}
            onSubmit={handleAddShipping}
          />
          <PaymentBox cartItems={dummyCartItems} subtotal={subtotal} />
        </div>
      </main>
    </>
  );
}
