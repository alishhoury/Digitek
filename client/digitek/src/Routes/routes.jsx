import { Routes, Route } from "react-router-dom";

import LandingPage from "../Pages/LandingPage";
import Auth from "../Pages/Auth";
import HomePage from "../Pages/HomePage";
import CartPage from "../Pages/CartPage";
import PaymentPage from "../Pages/PaymentPage";
import ProfilePage from "../Pages/ProfilePage";
import AdminPage from "../Pages/AdminPage";
import ManageProduct from "../Pages/ManageProduct";
import ManageStock from "../Pages/ManageStock";
import Layout from "../layout";

const MyRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment/:order_number" element={<PaymentPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/manageProduct" element={<ManageProduct />} />
        <Route path="/manageProduct/:id" element={<ManageProduct />} />
        <Route path="/manageStock" element={<ManageStock />} />
      </Route>

      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default MyRoutes;
