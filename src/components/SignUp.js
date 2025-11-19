import React, { useState } from 'react';

// The component now receives `onSignUpSuccess` to pass data up.
const SignUp = ({ onSwitchToLogin, onBack, onSignUpSuccess }) => {
  // NEW: Add state to hold the value of the 'Full Name' input field.
  const [fullName, setFullName] = useState('');

  const handleSignUp = () => {
    // Basic validation to ensure a name was entered.
    if (!fullName.trim()) {
      alert("Please enter your name.");
      return;
    }

    // --- Create a data object with the user's information ---
    const signUpData = {
      name: fullName,
      // In a real app, you would also include email and password here
      // to send to your authentication service.
    };

    // --- Pass the entire data object up to App.js ---
    onSignUpSuccess(signUpData);
  };

  return (
    <div className="page-wrapper auth-wrapper">
      <button onClick={onBack} className="back-button">&lt; Back</button>
      <div className="auth-container">
        <h2 className="auth-title">Create Account</h2>
        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          
          {/* UPDATED: This input now updates our new 'fullName' state variable. */}
          <input 
            type="text"
            placeholder="Full Name"
            className="auth-input"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input type="email" placeholder="Email Address" className="auth-input" />
          <input type="password" placeholder="Password" className="auth-input" />
          
          {/* The button now calls our new handleSignUp function. */}
          <button type="button" onClick={handleSignUp} className="cta-button">
            Sign Up
          </button>
        </form>
        <p className="auth-switch-text">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="auth-switch-button">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;