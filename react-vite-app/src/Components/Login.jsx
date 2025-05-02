import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Login.css';

function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e, field) => {
    setLoginUser({ ...loginUser, [field]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('https://s61-india-parks-guide-1.onrender.com/admin/login', {
        username: loginUser.username,
        password: loginUser.password
      });
      
      if (response.status === 200) {
        // Set token with expiry
        Cookies.set('token', response.data.token, { expires: 7 }); // Expires in 7 days
        
        // Store username in cookie for display purposes
        Cookies.set('username', loginUser.username, { expires: 7 });
        
        // Set auth state in parent component
        onLogin();
        
        setLoginUser({ username: "", password: "" });
        window.alert('Login successful!');
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred. Please try again.');
        console.error('Login error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <div className="login-error">{error}</div>}
        
        <div className="login-field">
          <label className="login-label">Username</label>
          <input 
            className="login-input" 
            type="text" 
            value={loginUser.username} 
            onChange={(e) => handleChange(e, "username")} 
            placeholder="Enter your username"
            required
          />
        </div>
        
        <div className="login-field">
          <label className="login-label">Password</label>
          <input 
            className="login-input" 
            type="password" 
            value={loginUser.password} 
            onChange={(e) => handleChange(e, "password")} 
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button 
          className="login-button" 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <p className="login-register-prompt">
          Don't have an account? <a href="/register">Register now</a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;