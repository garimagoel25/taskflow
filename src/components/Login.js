import React, { useState } from 'react';
import { FiLogIn, FiUser } from 'react-icons/fi';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username);
      onLogin(username);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <div className="logo-circle">
            <FiUser className="logo-icon" />
          </div>
          <h1>Welcome to TaskFlow</h1>
          <p className="subtitle">Organize your work effortlessly</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className={`input-container ${isFocused ? 'focused' : ''}`}>
            <FiUser className="input-icon" />
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            <span>Continue</span>
            <FiLogIn className="button-icon" />
          </button>
        </form>

        <div className="login-footer">
          <p>No account needed - just enter a username</p>
        </div>
      </div>
    </div>
  );
};

export default Login;