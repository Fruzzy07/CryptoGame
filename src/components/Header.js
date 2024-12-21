import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Header.css';
import logoImage from '../images/Logo.png'; // Your logo image

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-crypto">Crypto</span>
        <span className="logo-games">Games</span>
      </div>
      <nav className="nav">
        <Link to="/games">
          <img src={logoImage} alt="Games Logo" className="logo-nav" />
          Games
        </Link>
        <Link to="/login">
          <button className="login-btn">Login</button> {/* Update to Link */}
        </Link>
        <Link to="/signup">
          <button className="register-btn">Register</button> {/* Update to Link */}
        </Link>
      </nav>
    </header>
  );
}

export default Header;

