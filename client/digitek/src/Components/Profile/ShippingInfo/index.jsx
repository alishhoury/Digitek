import shippingImage from "../../../assets/Shipping.jpeg";
import "./styles.css";

const ShippingInfo = () => {
  return (
    <div className="shipping-card">
      <div className="shipping-image">
        <img src={shippingImage} alt="Shipping" />
      </div>

      <div className="shipping-details">
        <h2 className="shipping-title">Shipping Address Details</h2>
        <div className="shipping-info">
          <p>
            <strong>Full Name:</strong> Ali Al Saghir
          </p>
          <p>
            <strong>Address:</strong> Hamra Street
          </p>
          <p>
            <strong>City:</strong> Beirut
          </p>
          <p>
            <strong>Country:</strong> Lebanon
          </p>
          <p>
            <strong>Phone:</strong> +961 71 234 567
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
