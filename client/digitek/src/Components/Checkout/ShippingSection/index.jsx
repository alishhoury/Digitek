import React from "react";
import "./style.css";
import Button from "../../Button";
import Input from "../../Input";

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
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                hint="Ali"
                required
                className="input"
                onChangeListener={onChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="lastName">Last name</label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                hint="Al Saghir"
                required
                className="input"
                onChangeListener={onChange}
              />
            </div>
            <div className="form-row full-width">
              <label htmlFor="city">City</label>
              <Input
                type="text"
                name="city"
                value={formData.city}
                hint="Beirut"
                required
                className="input"
                onChangeListener={onChange}
              />
            </div>
            <div className="form-row full-width">
              <label htmlFor="address">Address</label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                hint="Hamra Street"
                required
                className="input"
                onChangeListener={onChange}
              />
            </div>
            <div className="form-row full-width">
              <label htmlFor="phone">Phone</label>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                hint="+961 71 234 567"
                required
                className="input"
                onChangeListener={onChange}
              />
            </div>
            <div className="form-row full-width">
              <Button
                text="Add Shipping Address"
                className="btn-primary"
                insiders={null}
              />
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
