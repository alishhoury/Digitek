import React from "react";
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
import ProtectedRoute from "../Components/protectedRoutes/ProtectedRoutes";
import Unauthorized from "../Pages/Shared/Unauthorized/Unauthorized";

const MyRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment/:order_number" element={<PaymentPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/adminPage"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manageProduct"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manageProduct/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manageStock"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageStock />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default MyRoutes;
