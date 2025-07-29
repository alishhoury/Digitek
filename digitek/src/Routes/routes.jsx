import {Routes, Route } from "react-router-dom";

import LandingPage from "../Pages/LandingPage";
import Auth from "../Pages/Auth";
import HomePage from "../Pages/HomePage";
import CartPage from "../Pages/CartPage";
import PaymentPage from "../Pages/PaymentPage";
import ProfilePage from "../Pages/ProfilePage";
import AdminPage from "../Pages/AdminPage";
import ManageProduct from "../Pages/ManageProduct";
import ManageStock from "../Pages/ManageStock";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/payment" element={<PaymentPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/adminPage" element={<AdminPage/>}/>
      <Route path="/manageProduct" element={<ManageProduct/>}/>
      <Route path="/manageStock" element={<ManageStock/>}/>
    </Routes>
  );
};

export default MyRoutes;
