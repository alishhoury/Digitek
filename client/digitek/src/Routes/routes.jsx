// Routes/routes.jsx
import { createBrowserRouter } from "react-router-dom";
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

const AppRoutes = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/auth", element: <Auth /> },
  { path: "/unauthorized", element: <Unauthorized /> },
  {
    element: <Layout />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/payment/:order_number", element: <PaymentPage /> },
      { path: "/profile", element: <ProfilePage /> },
      {
        path: "/adminPage",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/manageProduct",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/manageProduct/:id",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/manageStock",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageStock />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default AppRoutes;
