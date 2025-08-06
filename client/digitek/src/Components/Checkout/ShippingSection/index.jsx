import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "../../Button";
import Input from "../../Input";
import api from "../../../services/axios";
import { toast } from "react-toastify";

export default function ShippingSection() {
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      if (parsedUser.address) {
        setShowShippingDetails(true);
      }
    }
  }, []);

  function handleInputChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleAddShipping(e) {
    e.preventDefault();

    if (!user?.id) {
      toast.warn("User ID missing");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        city: formData.city,
        phone: formData.phone,
      };

      const response = await api.put(`/users/${user.id}`, payload);
      const updatedUser = { ...response.data.payload };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Shipping info is set Successfully.");
      setUser(updatedUser);
      setShowShippingDetails(true);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update shipping address"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="left-section">
      {!showShippingDetails ? (
        <>
          <h2 className="section-title">Shipping Address</h2>
          <form className="shipping-form" onSubmit={handleAddShipping}>
            <div className="form-row">
              <label htmlFor="firstName">First name</label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                hint="Ali"
                className="input"
                onChangeListener={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="lastName">Last name</label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                hint="Al Shhouri"
                className="input"
                onChangeListener={handleInputChange}
              />
            </div>
            <div className="form-row full-width">
              <label htmlFor="city">City</label>
              <Input
                type="text"
                name="city"
                value={formData.city}
                hint="Beirut"
                className="input"
                onChangeListener={handleInputChange}
              />
            </div>
            <div className="form-row full-width">
              <label htmlFor="address">Address</label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                hint="Hamra Street"
                className="input"
                onChangeListener={handleInputChange}
              />
            </div>
            <div className="form-row full-width">
              <label htmlFor="phone">Phone</label>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                hint="+961 71 234 567"
                className="input"
                onChangeListener={handleInputChange}
              />
            </div>
            <div className="form-row full-width">
              <Button
                text="Add Shipping Address"
                loading={loading}
                loadingText="Saving..."
                className="btn-primary"
              />
            </div>
          </form>
        </>
      ) : (
        <>
          <h2 className="section-title">Shipping Details</h2>
          <p className="shipping-info">
            <strong>First Name:</strong> {user?.first_name}
          </p>
          <p className="shipping-info">
            <strong>Last Name:</strong> {user?.last_name}
          </p>
          <p className="shipping-info">
            <strong>Address:</strong> {user?.address}
          </p>
          <p className="shipping-info">
            <strong>City:</strong> {user?.city}
          </p>
          <p className="shipping-info">
            <strong>Phone:</strong> {user?.phone}
          </p>
        </>
      )}
    </section>
  );
}
