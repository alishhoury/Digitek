import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/Digitek.svg";
import Profile from "../../assets/Profile.svg";
import { useState } from "react";
import "./style.css";
import api from "../../services/axios";
import { clearCart } from "../../features/cart/cartSlice";
import { persistor } from "../../app/store";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const isActive = (path) => location.pathname === path;

  const isLogged = () => {
    const user = localStorage.getItem("user");
    return user !== null && user !== undefined && user !== "";
  };

  const isAdmin = () => {
    return isLogged() && user.role === "admin";
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("user");
      dispatch(clearCart());
      await persistor.purge();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="NavBar">
      <div className="bar-content">
        <div className="logo">
          <img src={Logo} alt="Digitek" />
        </div>

        <div className="nav-buttons">
          {isAdmin() && (
            <Link
              to="/adminPage"
              className={
                isActive("/adminPage") ? "navbar-btn active" : "navbar-btn"
              }
            >
              Dashboard
            </Link>
          )}

          {isAdmin() && (
            <Link
              to="/manageStock"
              className={
                isActive("/manageStock") ? "navbar-btn active" : "navbar-btn"
              }
            >
              Edit Stock
            </Link>
          )}

          {isAdmin() && (
            <Link
              to="/manageProduct"
              className={
                isActive("/manageProduct") ? "navbar-btn active" : "navbar-btn"
              }
            >
              Add Product
            </Link>
          )}

          <Link
            to={isLogged() ? "/home" : "/auth"}
            className={isActive("/home") ? "navbar-btn active" : "navbar-btn"}
          >
            Home
          </Link>

          <Link
            to={isLogged() ? "/cart" : "/auth"}
            className={isActive("/cart") ? "navbar-btn active" : "navbar-btn"}
          >
            Cart
          </Link>

          {isLogged() && (
            <div className="user-menu">
              <button onClick={toggleDropdown} className="navbar-btn">
                <img src={Profile} alt="profile" />
              </button>

              {dropdownOpen && (
                <div className="dropdown">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <button onClick={logout} className="dropdown-item">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
