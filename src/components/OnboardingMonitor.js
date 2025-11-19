import React, { useState } from 'react';

const OnboardingMonitor = ({ onNext, onBack }) => {
  // --- State for the form ---
  const [monitoring, setMonitoring] = useState({ temp: false, humidity: false });
  // NEW: Add state to hold the value of the 'ideal goal' input field.
  const [idealGoal, setIdealGoal] = useState(''); // Starts as an empty string

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setMonitoring(prev => ({ ...prev, [name]: checked }));
  };

  const handleNextClick = () => {
    // Basic validation to make sure a goal was entered.
    if (!idealGoal || isNaN(parseFloat(idealGoal))) {
      alert("Please enter a valid number for your ideal spending goal.");
      return;
    }

    // --- Create a data object with all the user's choices ---
    const onboardingData = {
      monitoring: monitoring,
      // In a real app, you would also capture the 'current spending' value here.
      
      // IMPORTANT: Include the ideal goal, converted to a number.
      idealGoal: parseFloat(idealGoal)
    };

    // --- Pass the entire data object up to App.js ---
    onNext(onboardingData);
  }

  return (
    <div className="page-wrapper auth-wrapper onboarding">
      <button onClick={onBack} className="back-button">&lt; Back</button>
      
      <div className="chat-bubble">
        <p>First, what do you want to monitor to save on costs?</p>
      </div>
      
      <div className="onboarding-form">
        <label className="checkbox-container">
          <input type="checkbox" name="temp" checked={monitoring.temp} onChange={handleCheckboxChange} />
          <span className="checkmark"></span>
          Temperature
        </label>
        <label className="checkbox-container">
          <input type="checkbox" name="humidity" checked={monitoring.humidity} onChange={handleCheckboxChange} />
          <span className="checkmark"></span>
          Humidity
        </label>

        <input type="number" placeholder="Current monthly spending ($)" className="auth-input" />
        
        {/* UPDATED: The 'ideal spending' input now updates our new state variable. */}
        <input 
          type="number"
          placeholder="Ideal monthly spending ($)"
          className="auth-input"
          value={idealGoal}
          onChange={(e) => setIdealGoal(e.target.value)}
        />
        
        <button onClick={handleNextClick} className="cta-button">Next</button>
      </div>
    </div>
  );
};

export default OnboardingMonitor;