import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {  
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/users?username=${username}&password=${password}`);
      const data = await response.json();

      if (data.length > 0) {
        const user = data[0];
        localStorage.setItem('token', user.token); 
        setError(''); 
        setUsername('');
        setPassword(''); 
        navigate('/'); 
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Something went wrong');
    }
  };


  return (
    <div className="auth-page">
      <h2>Login Page</h2>
      <form onSubmit={handleLogin} className="auth-form">
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
        <button type="submit" className="submit-btn">Login</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/signup" class="welcome_reg">Register</Link>
    </div>
  );
}

export default Login;
