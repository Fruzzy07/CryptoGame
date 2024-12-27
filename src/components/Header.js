// src/components/Header.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logoImage from '../images/Logo.png';
import { useGlobalState } from '../context/GlobalState';

function Header() {
  const { balance, deposit, withdraw } = useGlobalState(); // Access balance, deposit, and withdraw functions
  const [amount, setAmount] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDeposit = () => {
    if (amount > 0) {
      deposit(amount);
      setAmount('');
    } else {
      alert('Enter a valid amount to deposit');
    }
  };

  const handleWithdraw = () => {
    if (amount > 0) {
      withdraw(amount);
      setAmount('');
    } else {
      alert('Enter a valid amount to withdraw');
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <span className="logo-crypto">Crypto</span>
        <span className="logo-games">Games</span>
      </div>
      <div className="balance">Balance: {balance} eth</div>
      <div className="actions">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <button onClick={handleDeposit} className="deposit-btn">Deposit</button>
        <button onClick={handleWithdraw} className="withdraw-btn">Withdraw</button>
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
