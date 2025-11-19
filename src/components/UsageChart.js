import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UsageChart = ({ onBack }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/chart-data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setChartData(result.data);
        } else {
          setError(result.message);
        }
      } catch (e) {
        setError("Could not connect to the server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, []); // Empty array means this runs once when the component mounts.

  if (isLoading) {
    return <div className="page-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}><p>Loading Chart Data...</p></div>;
  }
  
  if (error) {
    return <div className="page-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}><p>Error: {error}</p></div>;
  }

  return (
    <div className="page-wrapper chart-page">
        <header className="chart-header">
            <button onClick={onBack} className="back-button" style={{position: 'static'}}>&lt; Back</button>
            <h2>Real-time Usage</h2>
        </header>
        <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 20, left: -10, bottom: 5, }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                    <XAxis dataKey="time" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip contentStyle={{ backgroundColor: '#333', border: '1px solid #555' }} labelStyle={{ color: '#fff' }} />
                    <Legend />
                    <Line type="monotone" name="Temperature (°F)" dataKey="temperature" stroke="#ff7300" />
                    <Line type="monotone" name="Humidity (%)" dataKey="humidity" stroke="#387908" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};

export default UsageChart;