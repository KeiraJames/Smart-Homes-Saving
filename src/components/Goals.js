import React, { useState } from "react";

const Goals = ({ initialGoals = [] }) => {
  const [goal, setGoal] = useState("");
  const [savedGoals, setSavedGoals] = useState(initialGoals);

  const addGoal = () => {
    if (goal.trim() !== "") {
      setSavedGoals([...savedGoals, goal]);
      setGoal("");
    }
  };

  return (
    <div className="goals">
      <h3>Financial Goals</h3>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter new goal"
      />
      <button onClick={addGoal}>Add Goal</button>
      <ul>
        {savedGoals.map((g, i) => (
          <li key={i}>{g}</li>
        ))}
      </ul>
    </div>
  );
};

export default Goals;
