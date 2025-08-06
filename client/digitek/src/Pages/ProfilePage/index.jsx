import OrderList from "../../Components/Profile/OrderList";
import ShippingInfo from "../../Components/Profile/ShippingInfo";
import UserInfo from "../../Components/Profile/UserInfo";
import "./styles.css";
const CustomerProfile = () => {
  return (
    <div className="customer-profile">
      <main className="main-container">
        <div className="details-container">
          <UserInfo />
          <ShippingInfo />
        </div>
        <OrderList />
      </main>
    </div>
  );
};

export default CustomerProfile;
