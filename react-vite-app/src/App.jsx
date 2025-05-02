import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import {
  FaHome,
  FaPlusSquare,
  FaListUl,
  FaUserPlus,
  FaSignInAlt,
  FaSignOutAlt,
  FaGlobeAsia,
  FaBars,
  FaTimes,
  FaUser
} from "react-icons/fa";

// Other imports remain the same...
import RenderEntities from "./Components/RenderEntities";
import UpdateRender from "./Components/UpdateRender";
import AddEntityForm from "./Components/AddEntityForm";
import LandingPage from "./Components/LandingPage";
import LoginForm from "./Components/Login";
import Logout from "./Components/Logout";
import RegisterForm from "./Components/Register";

const App = () => {
  // Check for token on initial load
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState('');

  // Check for token on app load and route changes
  useEffect(() => {
    const token = Cookies.get('token');
    const storedUsername = Cookies.get('username');
    
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || 'User');
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername(Cookies.get('username') || 'User');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);



  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        {/* Header */}
        <header className="flex justify-between items-center bg-emerald-700 text-white p-4 shadow-lg">
          <h1 className="font-bold text-xl flex items-center">
            <FaGlobeAsia className="mr-2" /> Indian Parks
          </h1>

          {/* User status indicator (visible on larger screens) */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center mr-4 text-sm">
              <FaUser className="mr-2 text-2xl" /> 
              <span className="text-2xl font-bold">Welcome, <span className="text-orange-400">{username}</span></span>
            </div>
          )}

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </header>

        {/* Navigation */}
        <nav className={`bg-emerald-800 p-4 shadow-md ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row gap-10 md:justify-center space-y-4 md:space-y-0 md:space-x-6 text-white font-semibold text-lg">
            <li>
              <Link to="/" className="flex items-center space-x-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                <FaHome /> <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/add-entity" className="flex items-center space-x-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                <FaPlusSquare /> <span>Add Entity</span>
              </Link>
            </li>
            <li>
              <Link to="/all-entities" className="flex items-center space-x-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                <FaListUl /> <span>All Entities</span>
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/register" className="flex items-center space-x-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                    <FaUserPlus /> <span>Register</span>
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="flex items-center space-x-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                    <FaSignInAlt /> <span>Login</span>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/logout" className="flex items-center space-x-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                  <FaSignOutAlt /> <span>Logout</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/add-entity" element={<AddEntityForm />} />
            <Route path="/all-entities" element={<RenderEntities />} />
            <Route path="/update/:id" element={<UpdateRender />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;