import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Logout.css';

function Logout({ onLogout }) {
  const navigate = useNavigate();
  const username = Cookies.get('username') || 'User';

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        console.log("User is not logged in.");
        return;
      }
      
      // Call logout API endpoint
      await axios.post(
        "https://s61-india-parks-guide-1.onrender.com/admin/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Remove all authentication cookies
      Cookies.remove("token");
      Cookies.remove("username");
      
      // Update parent component state
      onLogout();
      
      window.alert('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      // Even if the API call fails, remove cookies and log out locally
      Cookies.remove("token");
      Cookies.remove("username");
      onLogout();
      navigate('/');
    }
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        <h2 className="logout-heading">Account</h2>
        <div className="logout-user-info">
          <p>Logged in as: <strong>{username}</strong></p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Logout;