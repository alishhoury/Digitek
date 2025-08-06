import { useEffect, useState } from "react";
import shippingImage from "../../../assets/Shipping.jpeg";
import "./styles.css";

const ShippingInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedAddress = localStorage.getItem("user");
    if (storedAddress) {
      setUser(JSON.parse(storedAddress));
    }
  }, []);

  if (!user) {
    return <div className="shipping-card">No shipping information found.</div>;
  }

  return (
    <div className="shipping-card">
      <div className="shipping-image">
        <img src={shippingImage} alt="Shipping" />
      </div>

      <div className="shipping-details">
        <h2 className="shipping-title">Shipping Address Details</h2>
        <div className="shipping-info">
          <p>
            <strong>Full Name:</strong> {user.first_name ? `${user.first_name} ${user.last_name}` : ' Not Specified'}
          </p>
          <p>
            <strong>Address:</strong> {user.address || ' Not Specified'}
          </p>
          <p>
            <strong>City:</strong> {user.city || ' Not Specified'}
          </p>
          <p>
            <strong>Country:</strong> Lebanon
          </p>
          <p>
            <strong>Phone:</strong> {user.phone || ' Not Specified'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
