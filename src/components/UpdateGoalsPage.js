import React, { useState } from 'react';

// This component receives the CURRENT goal and two functions as props:
// 1. onBack: To navigate back to the dashboard.
// 2. onSaveGoal: To pass the new goal value up to App.js.
const UpdateGoalsPage = ({ currentGoal, onBack, onSaveGoal }) => {
  // State to manage the value inside the input field. It's initialized with the current goal.
  const [goal, setGoal] = useState(currentGoal);

  const handleSave = () => {
    // Convert the input string to a number before saving.
    const newGoalValue = parseFloat(goal);

    // Basic validation to ensure it's a valid number.
    if (!isNaN(newGoalValue) && newGoalValue >= 0) {
      onSaveGoal(newGoalValue); // Pass the new goal up to App.js.
      onBack(); // Navigate back to the dashboard.
    } else {
      alert("Please enter a valid number for your goal.");
    }
  };

  return (
    <div className="page-wrapper" style={{ justifyContent: 'flex-start', paddingTop: '80px', textAlign: 'center' }}>
      
      {/* Page Title */}
      <h1 style={{ fontFamily: "'Lora', serif", fontSize: '1.8em', marginBottom: '40px' }}>
        Update Your Financial Goal
      </h1>

      {/* Input Form */}
      <div className="summary-widget">
        <p className="widget-label">Monthly Energy Cost Goal ($)</p>
        
        <input 
          type="number"
          className="auth-input" // Re-using the input style from the login form
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., 100"
        />
        
        <button 
          className="cta-button" 
          style={{ marginTop: '20px' }}
          onClick={handleSave}
        >
          Save Goal
        </button>
      </div>

      {/* Back Button */}
      <button 
        className="logout-button" 
        style={{ marginTop: 'auto', marginBottom: '20px', alignSelf: 'center' }} 
        onClick={onBack}
      >
        Back to Dashboard
      </button>

    </div>
  );
};

export default UpdateGoalsPage;