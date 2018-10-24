import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <input type="text" className="login-input" placeholder="Username" />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
          />
          <a href="#!" className="login-button">
            Login
          </a>
          <p>
            New user? &nbsp;
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    );
  }
}
export default Login;
