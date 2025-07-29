import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./style.css";

const NavBar = ({}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;
    const isLoged = () => {
        const token = localStorage.getItem('token');
        return token !== null && token !== undefined && token !== '';
    }

    const home = () => {
        if (isLoged()) {
            navigate('/home');
        } else {
            navigate('/auth');
        }
    };
    const cart = () => {
        if (isLoged()) {
            navigate('/cart');
        } else {
            navigate('/auth');
        }
    };
    const payment = () => {
        if (isLoged()) {
            navigate('/payment');
        } else {
            navigate('/auth');
        }
    };
    const profile = () => {
        if (isLoged()) {
            navigate('/profile');
        } else {
            navigate('/auth');
        }
    };

      const logout = () => {
        localStorage.removeItem('token');
         navigate('/');
  };

    return (
        <div className="SideBar">



        </div>
    )
}

export default NavBar;