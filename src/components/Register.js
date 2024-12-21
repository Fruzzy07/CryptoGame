import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);  // Track sign-up state
  const navigate = useNavigate();  // Initialize navigate function

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Handle sign up logic here (e.g., send the data to a backend API)
    console.log('Signing up with', { username, email, password });

    // Here you would typically send the data to an API to create the account
    // For this demo, we'll assume the sign-up is successful

    // Store the user info (in this case, just the email)
    localStorage.setItem('userEmail', email);

    // Set the sign-up state to true
    setIsSignedUp(true);

    // Redirect to the homepage (games) after successful sign-up
    navigate('/login');
  };

  // If signed up, return null to hide the form
  if (isSignedUp) {
    return null;
  }

  return (
    <div className="auth-page">
      <h2>Registration Page</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
}

export default Register; 

