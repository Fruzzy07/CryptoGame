// src/components/Header.js

import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logoImage from '../images/Logo.png';

function Header() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
      <Link to="/">
        <span className="logo-crypto">Crypto</span>
        <span className="logo-games">Games</span>
        </Link>

      </div>
    
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
           <Link to="/payment">
              <button className="login-btn">Payment</button>
            </Link>
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