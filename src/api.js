// api.js
import axios from "axios";

const API_BASE = "http://localhost:5001"; // your backend URL

// Existing function
export const getLatestReading = async () => {
  try {
    // For now, let's return some dummy data to make the UI work
    // In a real app, this would fetch from your backend
    const res = await axios.get(`${API_BASE}/latest`); // Uncomment this line if you have this endpoint
    // return res.data;
    return { value: 15.3, unit: "kWh", timestamp: "2024-02-20T10:00:00Z" };
  } catch (err) {
    console.error("Error fetching latest reading:", err);
    // Return dummy data on error so UI isn't broken
    return { value: 15.3, unit: "kWh", timestamp: "2024-02-20T10:00:00Z" };
  }
};

// NEW: Placeholder for Water Usage
export const getWaterUsage = async () => {
  try {
    // const res = await axios.get(`${API_BASE}/water-usage`);
    // return res.data;
    return { value: 120, unit: "L", timestamp: "2024-02-20T10:00:00Z" };
  } catch (err) {
    console.error("Error fetching water usage:", err);
    return { value: 120, unit: "L", timestamp: "2024-02-20T10:00:00Z" };
  }
};


export const getAverageTemperature = async () => {
  try {
    // const res = await axios.get(`${API_BASE}/average-temp`);
    // return res.data;
    return { value: 21.5, unit: "°C", timestamp: "2024-02-20T10:00:00Z" };
  } catch (err) {
    console.error("Error fetching average temperature:", err);
    return { value: 21.5, unit: "°C", timestamp: "2024-02-20T10:00:00Z" };
  }
};