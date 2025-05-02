import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function RegisterForm() {
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e, field) => {
    setRegisterUser({ ...registerUser, [field]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Basic validation
    if (!registerUser.username || !registerUser.email || !registerUser.password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.post('https://s61-india-parks-guide-1.onrender.com/admin/register', {
        username: registerUser.username,
        email: registerUser.email,
        password: registerUser.password
      });
      
      if (response.status === 200) {
        setRegisterUser({ username: "", email: "", password: "" });
        window.alert('Registration successful! Please log in.');
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('User already exists. Please choose a different username.');
      } else {
        setError('Registration failed. Please try again.');
        console.error('Registration error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-heading">Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          {error && <div className="register-error">{error}</div>}
          
          <div className="register-field">
            <label className="register-label">Username</label>
            <input
              className="register-input"
              type="text"
              value={registerUser.username}
              onChange={(e) => handleChange(e, "username")}
              placeholder="Choose a username"
              required
            />
          </div>
          
          <div className="register-field">
            <label className="register-label">Email</label>
            <input
              className="register-input"
              type="email"
              value={registerUser.email}
              onChange={(e) => handleChange(e, "email")}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="register-field">
            <label className="register-label">Password</label>
            <input
              className="register-input"
              type="password"
              value={registerUser.password}
              onChange={(e) => handleChange(e, "password")}
              placeholder="Create a password"
              required
            />
          </div>
          
          <button
            className="register-button"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          
          <p className="register-login-prompt">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;