import React from 'react';

// CORRECTED: Add onLoginSuccess to the list of props here
const Login = ({ onSwitchToSignUp, onBack, onLoginSuccess }) => {
  return (
    <div className="page-wrapper auth-wrapper">
      <button onClick={onBack} className="back-button">&lt; Back</button>
      <div className="auth-container">
        <h2 className="auth-title">Welcome Back</h2>
        <form className="auth-form">
          <input type="email" placeholder="Email Address" className="auth-input" />
          <input type="password" placeholder="Password" className="auth-input" />
          {/* This button will now correctly call the function */}
          <button type="button" onClick={onLoginSuccess} className="cta-button">Login</button>
        </form>
        <p className="auth-switch-text">
          Don't have an account?{' '}
          <button onClick={onSwitchToSignUp} className="auth-switch-button">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;