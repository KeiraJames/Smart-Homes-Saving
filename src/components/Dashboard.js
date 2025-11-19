import React, { useState, useEffect } from 'react';


const estimateKwhFromReadings = (readings) => {
  const baselineTemp = 68;
  const acKwhPerHour = 3.5;
  const readingsPerHour = 360;

  let totalKwh = 0;
  readings.forEach(reading => {
    let tempF = reading.temperature;
    if (tempF < 50) { // C-to-F conversion
      tempF = (tempF * 9/5) + 32;
    }
    if (tempF > baselineTemp) {
      const coolingEffort = Math.min((tempF - baselineTemp) / 10, 1.0);
      const kwhForThisReading = (acKwhPerHour * coolingEffort) / readingsPerHour;
      totalKwh += kwhForThisReading;
    }
  });
 
  return totalKwh * 950;
};

const calculateCost = (totalKwh) => {
  const tier1Rate = 15.112 / 100;
  const tier2Rate = 17.373 / 100;
  const supplyRate = 8.1 / 100;
  const tier1Threshold = 250;
  let tier1Kwh = Math.min(totalKwh, tier1Threshold);
  let tier2Kwh = Math.max(0, totalKwh - tier1Threshold);
  const tier1Cost = tier1Kwh * tier1Rate;
  const tier2Cost = tier2Kwh * tier2Rate;
  const supplyCost = totalKwh * supplyRate;
  return tier1Cost + tier2Cost + supplyCost;
};


const Dashboard = ({ user, readings, savingsGoal, onLogout, onNavigate, onRefresh }) => {
  const [alert, setAlert] = useState({ message: 'Analyzing data...', status: 'neutral' });
  const userName = user ? user.name : 'User';

  useEffect(() => {
    if (readings.length === 0) {
      setAlert({ message: 'Loading initial data...', status: 'neutral' });
      return;
    }

    // Now this will calculate the same large cost as the other page.
    const estimatedKwh = estimateKwhFromReadings(readings);
    const estimatedCost = calculateCost(estimatedKwh)*1;

    // This comparison will now work correctly.
    if (estimatedCost > savingsGoal) {
      setAlert({ message: 'You are using too much energy. Turn off AC.', status: 'bad' });
    } else {
      setAlert({ message: 'All is good! Your energy usage is on track.', status: 'good' });
    }
  }, [readings, savingsGoal]);

  const AlertDisplay = () => (
    <div className={`widget alert-widget ${alert.status}`}>{alert.message}</div>
  );

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <button onClick={onRefresh} className="refresh-button">Refresh</button>
        <button onClick={onLogout} className="logout-button">Logout</button>
      </header>

      <main className="dashboard-content">
        <div className="welcome-message">
          <h1>Hi {userName}</h1>
          <p>Welcome to your smart home</p>
        </div>
        
        <AlertDisplay />

        <div className="widget weather-widget">
          <div className="weather-item">
            <span className="weather-icon-emoji">☀️</span>
            <span>{readings.length > 0 ? `${readings[readings.length - 1].temperature.toFixed(1)}°F` : '--°F'}</span>
          </div>
          <div className="separator"></div>
          <div className="weather-item">
            <span>{readings.length > 0 ? `${readings[readings.length - 1].humidity.toFixed(1)}%` : '--%'}</span>
            <small>Humidity</small>
          </div>
        </div>

        <div className="rooms-section">
          <h2>Select an Option</h2>
          <div className="rooms-carousel">
            <div className="room-card" onClick={() => onNavigate('Usage Chart')}>
              <div className="card-content"><h3>Usage Chart</h3></div>
            </div>
            <div className="room-card" onClick={() => onNavigate('Update Goals')}>
               <div className="card-content"><h3>Update Goals</h3></div>
            </div>
            <div className="room-card" onClick={() => onNavigate('EcoVolt Chatbot')}>
               <div className="card-content"><h3>Chatbot</h3></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="dashboard-footer">
        <div className="footer-indicator"></div>
      </footer>
    </div>
  );
};

export default Dashboard;