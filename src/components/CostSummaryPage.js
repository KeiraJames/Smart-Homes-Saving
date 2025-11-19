import React from 'react';


const estimateKwhFromReadings = (readings) => {
  const baselineTemp = 68; // Fahrenheit
  const acKwhPerHour = 3.5;
  const readingsPerHour = 360;

  let totalKwh = 0;
  readings.forEach(reading => {
    let tempF = reading.temperature;

    
    if (tempF < 50) {
      tempF = (tempF * 9/5) + 32;
    }
    // ---------------

    if (tempF > baselineTemp) {
      const coolingEffort = Math.min((tempF - baselineTemp) / 10, 1.0);
      const kwhForThisReading = (acKwhPerHour * coolingEffort) / readingsPerHour;
      totalKwh += kwhForThisReading;
    }
  });
  return totalKwh;
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
  return (tier1Cost + tier2Cost + supplyCost).toFixed(2)*1000;
};


const CostSummaryPage = ({ onBack, userSavingsGoal, readings }) => {

  
  const estimatedKwh = estimateKwhFromReadings(readings);
  const estimatedCost = calculateCost(estimatedKwh);

  return (
    <div className="page-wrapper" style={{ justifyContent: 'flex-start', paddingTop: '80px', textAlign: 'center' }}>
      
      <h1 style={{ fontFamily: "'Lora', serif", fontSize: '2em', marginBottom: '40px' }}>
        Cost & Savings Summary
      </h1>

      <div className="summary-widget">
        <p className="widget-label">Monthly Savings Goal</p>
        <p className="widget-value-large">${userSavingsGoal.toFixed(2)}</p>
      </div>
      
      <div className="summary-widget">
        <p className="widget-label">Estimated Cost So Far</p>
        <p className="widget-value-large" style={{ color: '#ff7300' }}>
            ${estimatedCost}
        </p>
        <p className="widget-subtitle">
            Based on {readings.length} readings ({estimatedKwh.toFixed(1)} kWh)
        </p>
      </div>

      <button className="logout-button" style={{ marginTop: 'auto', marginBottom: '20px', alignSelf: 'center' }} onClick={onBack}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default CostSummaryPage;