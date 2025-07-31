import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
    }

  const isAdmin = () => {
    return isLogged() && user.role === "admin";
  };
  
  const admin = () => {
    navigate("/adminPage");
  };

  const home = () => {
    if (isLogged()) {
      navigate("/home");
    } else {
      navigate("/auth");
    }
  };
  const cart = () => {
    if (isLogged()) {
      navigate("/cart");
    } else {
      navigate("/auth");
    }
  };
  const payment = () => {
    if (isLogged()) {
      navigate("/payment");
    } else {
      navigate("/auth");
    }
  };
  const profile = () => {
    if (isLogged()) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
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
          <button
            onClick={home}
            className={isActive("/home") ? "navbar-btn active" : "navbar-btn"}
          >
            Home
          </button>
          <button
            onClick={cart}
            className={isActive("/cart") ? "navbar-btn active" : "navbar-btn"}
          >
            Cart
          </button>
          <button
            onClick={payment}
            className={
              isActive("/payment") ? "navbar-btn active" : "navbar-btn"
            }
          >
            Payment
          </button>
          <button
            onClick={profile}
            className={
              isActive("/profile") ? "navbar-btn active" : "navbar-btn"
            }
          >
            Profile
          </button>

          {isAdmin() && (
            <button
              onClick={admin}
              className={isActive("/adminPage") ? "navbar-btn active" : "navbar-btn"}
            >
              Admin Panel
            </button>
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
