import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logoImage from '../images/Logo.png';
import { useGlobalState } from '../context/GlobalState';

function Header() {
  const { balance } = useGlobalState(); // Access balance
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <span className="logo-crypto">Crypto</span>
        <span className="logo-games">Games</span>
      </div>
      <div className="balance">Balance: ${balance}</div> {/* Display balance */}
      <nav className="nav">
        <Link to="/games">
          <img
            src={logoImage}
            alt="Games Logo"
            className="logo-nav"
          />
          Games
        </Link>
        {token ? (
          <>
            <button
              className="register-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="register-btn">Register</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
