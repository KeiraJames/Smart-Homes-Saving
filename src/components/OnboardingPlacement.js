import React from 'react';

const OnboardingPlacement = ({ onComplete }) => {
  return (
    <div className="page-wrapper auth-wrapper onboarding">
      <div className="chat-bubble">
        <p>All set! Place your sensor near an air vent to start tracking accurately.</p>
      </div>
      
      <div className="onboarding-form">
        <div className="all-set-icon">✓</div>
        <h2 className="all-set-title">Setup Complete</h2>
        <button onClick={onComplete} className="cta-button">Go to Dashboard</button>
      </div>
    </div>
  );
};

export default OnboardingPlacement;