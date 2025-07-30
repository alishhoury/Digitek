import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from "../../assets/Digitek.svg";
import "./style.css"


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
        <div className="NavBar">

            <div className="bar-content">

                <div className="logo">
                    <img src={Logo} alt="Digitek" />
                </div>

               <div className="nav-buttons">
                    <button onClick={home} className={isActive('/home') ? 'navbar-btn active' : 'navbar-btn'}>
                        Home
                    </button>
                    <button onClick={cart} className={isActive('/cart') ? 'navbar-btn active' : 'navbar-btn'}>
                        Cart
                    </button>
                    <button onClick={payment} className={isActive('/payment') ? 'navbar-btn active' : 'navbar-btn'}>
                        Payment
                    </button>
                    <button onClick={profile} className={isActive('/profile') ? 'navbar-btn active' : 'navbar-btn'}>
                        Profile
                    </button>
                    <button onClick={logout} className={isLoged() ? 'logout-btn' : 'logout-btn hidden'}>
                        Logout
                    </button>
                </div>

            </div>


        </div>
    )
}

export default NavBar;