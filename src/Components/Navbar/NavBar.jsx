// src/components/Navbar.jsx
import React, { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/state';
import './navbar.css';

const Navbar = () => {
  const { token, setToken } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== "null") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken("null");
    setIsLoggedIn(false);
    navigate('/');
  };
  const handleNavigate = () => {

    navigate('/my-trips');
  };

  return (
    <nav className={`navbar ${!isLoggedIn ? 'hidden' : ''}`}>
  
          {isLoggedIn ? (
              <div className="navbar-container">
              <button onClick={handleNavigate}  className="navbar-item">My Trips</button>

                <button onClick={handleLogout} className="navbar-item">Log out</button>
              </div>
          ) : (
            <div className="navbar-item">
              {}
            </div>
          )}
        
    </nav>
  );
};

export default Navbar;