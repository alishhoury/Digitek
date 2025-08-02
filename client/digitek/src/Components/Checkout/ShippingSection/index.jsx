import React from "react";
import "./style.css";
export default function ShippingSection({
  showShippingDetails,
  formData,
  dummyShippingAddress,
  onChange,
  onSubmit,
}) {
  return (
    <section className="left-section">
      {!showShippingDetails ? (
        <>
          <h2 className="section-title">Shipping Address</h2>
          <form className="shipping-form" onSubmit={onSubmit}>
            <div className="form-row">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Ali"
                value={formData.firstName}
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
            <strong>City:</strong> {formData.city || dummyShippingAddress.city}
          </p>
          <p className="shipping-info">
            <strong>Phone:</strong>{" "}
            {formData.phone || dummyShippingAddress.phone}
          </p>
        </>
      )}
    </section>
  );
}
