import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/games');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  // Inline styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '40px',
      color: '#fff',
      backgroundColor: '#1a1a2e',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginTop: '10px',
      marginBottom: '10px',
    },
    input: {
      width: '100%',
      marginBottom: '15px',
      padding: '10px',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1rem',
      backgroundColor: "#333",
      color: '#fff',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#14b8a6',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#1a1a2e',
    },
    error: {
      color: 'red',
      fontSize: '14px',
      marginTop: '10px',
    },
    link: {
      color: '#14b8a6',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Login
        </button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/signup" style={styles.link}>Register</Link>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

export default Login;
