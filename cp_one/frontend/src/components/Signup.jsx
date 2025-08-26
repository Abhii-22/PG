import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-form-wrapper">
        <h2 className="signup-title">Create an Account</h2>
        <p className="signup-subtitle">Join us and find your perfect PG!</p>
        <form className="signup-form">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
