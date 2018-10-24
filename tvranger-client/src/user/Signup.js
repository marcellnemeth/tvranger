import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Signup.css';

class Signup extends Component {
  render() {
    return (
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Sign Up</h2>

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            className="signup-input"
            placeholder="Username"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="signup-input"
            placeholder="Email"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            className="signup-input"
            placeholder="Password"
          />
          <label htmlFor="password">Password Confirmation:</label>
          <input
            type="password"
            name=""
            className="signup-input"
            placeholder="Password"
          />
          <a href="#!" className="signup-button">
            Sign Up
          </a>

          <p>
            Already registered?&nbsp;
            <Link to="/login" className="login-link">
              Log In
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Signup;
