import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/Digitek.svg";
import "./style.css";
import api from "../../services/axios";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('user'));

  const isActive = (path) => location.pathname === path;
  const isLogged = () => {
    const user = localStorage.getItem('user');
    return user !== null && user !== undefined && user !== '';
  };

  const isAdmin = () => {
    return isLogged() && user.role === "admin";
  };

  const logout = async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="NavBar">
      <div className="bar-content">
        <div className="logo">
          <img src={Logo} alt="Digitek" />
        </div>

        <div className="nav-buttons">
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

          <Link
            to={isLogged() ? "/payment" : "/auth"}
            className={isActive("/payment") ? "navbar-btn active" : "navbar-btn"}
          >
            Payment
          </Link>

          <Link
            to={isLogged() ? "/profile" : "/auth"}
            className={isActive("/profile") ? "navbar-btn active" : "navbar-btn"}
          >
            Profile
          </Link>

          {isAdmin() && (
            <Link
              to="/adminPage"
              className={isActive("/adminPage") ? "navbar-btn active" : "navbar-btn"}
            >
              Admin Panel
            </Link>
          )}

          <button
            onClick={logout}
            className={isLogged() ? "logout-btn" : "logout-btn hidden"}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
