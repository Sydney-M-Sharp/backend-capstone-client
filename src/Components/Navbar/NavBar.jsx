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
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      
      <div className="navbar-menu">
        
        <div className="navbar-end">
          {isLoggedIn ? (
            <div className="navbar-item has-dropdown is-hoverable">
              <span className="navbar-link">
                <i className="fas fa-user-circle is-medium"></i>
              </span>
              <div className="navbar-dropdown is-right">
                <NavLink to="/my-trips" className="navbar-item">My Trips</NavLink>
                <hr className="navbar-divider" />
                <button onClick={handleLogout} className="navbar-item">Log out</button>
              </div>
            </div>
          ) : (
            <div className="navbar-item">
              {/* <div className="buttons">
                <NavLink to="/register" className="button is-primary">
                  <strong>Sign up</strong>
                </NavLink>
                <NavLink to="/login" className="button is-light">Log in</NavLink>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;