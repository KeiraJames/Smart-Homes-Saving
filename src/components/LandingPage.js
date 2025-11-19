import React from 'react';

// Accept `onNavigate` as a prop
const LandingPage = ({ onNavigate }) => {
  return (
    <div className="page-wrapper">
      <main className="hero-content">
        <h1 className="hero-title">
          Smarter
          <br />
          Energy
          <br />
          Savings
        </h1>
        <p className="hero-subtitle">Let EcoVolt guide your home's efficiency</p>
      </main>
      <footer className="page-footer">
        {/* Call the onNavigate function when the button is clicked */}
        <button onClick={onNavigate} className="cta-button">
          Get Started &nbsp; &gt;
        </button>
      </footer>
    </div>
  );
};

export default LandingPage;