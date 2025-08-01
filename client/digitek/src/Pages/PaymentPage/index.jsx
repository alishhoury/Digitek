import React, { useState } from "react";
import "./style.css";

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
    // Could add validation here if needed
    setShowShippingDetails(true);
  }

  return (
    <>
      <div className="header-bar"></div>
      <main className="container">
        <div className="checkout-grid">
          {/* Left side: Either form or shipping details */}
          <section className="left-section">
            {!showShippingDetails ? (
              <>
                <h2 className="section-title">Shipping Address</h2>
                <form className="shipping-form" onSubmit={handleAddShipping}>
                  <div className="form-row">
                    <label htmlFor="firstName">First name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Ali"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Al Saghir"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-row full-width">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Beirut"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-row full-width">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Hamra Street"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-row full-width">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="+961 71 234 567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-row full-width">
                    <button type="submit" className="btn-primary">
                      Add Shipping Address
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="section-title">Shipping Details</h2>
                <p className="shipping-info">
                  <strong>First Name:</strong>{" "}
                  {formData.firstName || dummyShippingAddress.firstName}
                </p>
                <p className="shipping-info">
                  <strong>Last Name:</strong>{" "}
                  {formData.lastName || dummyShippingAddress.lastName}
                </p>
                <p className="shipping-info">
                  <strong>Address:</strong>{" "}
                  {formData.address || dummyShippingAddress.address}
                </p>
                <p className="shipping-info">
                  <strong>City:</strong>{" "}
                  {formData.city || dummyShippingAddress.city}
                </p>
                <p className="shipping-info">
                  <strong>Phone:</strong>{" "}
                  {formData.phone || dummyShippingAddress.phone}
                </p>
              </>
            )}
          </section>

          {/* Right side: Order Summary */}
          <section className="right-section">
            <h2 className="section-title">Order Summary</h2>
            <div className="order-summary-box">
              <ul>
                {dummyCartItems.map(item => (
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

              <button className="btn-primary confirm-btn">
                Confirm Payment – ${subtotal.toFixed(2)}
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
