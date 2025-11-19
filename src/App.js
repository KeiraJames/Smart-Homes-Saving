import React, { useState, useEffect } from 'react';

// Import all necessary components
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import OnboardingMonitor from './components/OnboardingMonitor';
import OnboardingPlacement from './components/OnboardingPlacement';
import Dashboard from './components/Dashboard';
import CostSummaryPage from './components/CostSummaryPage';
import UpdateGoalsPage from './components/UpdateGoalsPage';
import ChatbotPage from './components/ChatbotPage';

import './App.css'; 

// --- Hardcoded JSON Data for Simulation ---
const hardcodedSensorData = {
  "readings": {
    // SCENARIO 1: A warm day. (First 10 readings)
    // Cost will be noticeable but well under the $100 goal.
    "key01": { "humidity": 50, "temperature": 75 }, "key02": { "humidity": 51, "temperature": 76 }, "key03": { "humidity": 52, "temperature": 77 }, "key04": { "humidity": 51, "temperature": 78 }, "key05": { "humidity": 52, "temperature": 79 }, "key06": { "humidity": 53, "temperature": 80 }, "key07": { "humidity": 52, "temperature": 79 }, "key08": { "humidity": 51, "temperature": 78 }, "key09": { "humidity": 52, "temperature": 77 }, "key10": { "humidity": 51, "temperature": 76 },
    
    // SCENARIO 2: A hot day. (Next 10 readings)
    // Cost will climb significantly and get very close to the $100 goal.
    "key11": { "humidity": 55, "temperature": 85 }, "key12": { "humidity": 56, "temperature": 86 }, "key13": { "humidity": 57, "temperature": 87 }, "key14": { "humidity": 56, "temperature": 88 }, "key15": { "humidity": 57, "temperature": 89 }, "key16": { "humidity": 58, "temperature": 90 }, "key17": { "humidity": 57, "temperature": 89 }, "key18": { "humidity": 56, "temperature": 88 }, "key19": { "humidity": 57, "temperature": 87 }, "key20": { "humidity": 56, "temperature": 86 },

    // SCENARIO 3: DISASTER! Heat wave begins. (Next 10 readings)
    // The cumulative cost will surpass the $100 goal during this set of readings.
    "key21": { "humidity": 65, "temperature": 95 }, "key22": { "humidity": 66, "temperature": 96 }, "key23": { "humidity": 67, "temperature": 97 }, "key24": { "humidity": 66, "temperature": 98 }, "key25": { "humidity": 67, "temperature": 99 }, "key26": { "humidity": 68, "temperature": 100}, "key27": { "humidity": 67, "temperature": 99 }, "key28": { "humidity": 66, "temperature": 98 }, "key29": { "humidity": 67, "temperature": 97 }, "key30": { "humidity": 66, "temperature": 96 },
    
    // SCENARIO 4: CONTINUED DISASTER (Next 10 readings)
    // Cost will now be far over the $100 goal.
    "key31": { "humidity": 70, "temperature": 101}, "key32": { "humidity": 71, "temperature": 102}, "key33": { "humidity": 72, "temperature": 103}, "key34": { "humidity": 71, "temperature": 104}, "key35": { "humidity": 72, "temperature": 105}, "key36": { "humidity": 73, "temperature": 106}, "key37": { "humidity": 72, "temperature": 105}, "key38": { "humidity": 71, "temperature": 104}, "key39": { "humidity": 72, "temperature": 103}, "key40": { "humidity": 71, "temperature": 102},

    // SCENARIOS 5 & 6: Just adding more data for completeness
    "key41": { "humidity": 75, "temperature": 105}, "key42": { "humidity": 75, "temperature": 105}, "key43": { "humidity": 75, "temperature": 105}, "key44": { "humidity": 75, "temperature": 105}, "key45": { "humidity": 75, "temperature": 105}, "key46": { "humidity": 75, "temperature": 105}, "key47": { "humidity": 75, "temperature": 105}, "key48": { "humidity": 75, "temperature": 105}, "key49": { "humidity": 75, "temperature": 105}, "key50": { "humidity": 75, "temperature": 105},
    "key51": { "humidity": 75, "temperature": 105}, "key52": { "humidity": 75, "temperature": 105}, "key53": { "humidity": 75, "temperature": 105}, "key54": { "humidity": 75, "temperature": 105}, "key55": { "humidity": 75, "temperature": 105}, "key56": { "humidity": 75, "temperature": 105}, "key57": { "humidity": 75, "temperature": 105}, "key58": { "humidity": 75, "temperature": 105}, "key59": { "humidity": 75, "temperature": 105}, "key60": { "humidity": 75, "temperature": 105}
  }
};

function App() {
  // Main state variables
  const [user, setUser] = useState(null); 
  const [view, setView] = useState('landing');
  const [activePage, setActivePage] = useState('dashboard');
  const [savingsGoal, setSavingsGoal] = useState(100.00);

  // NEW: State to temporarily hold new user info during onboarding
  const [tempUser, setTempUser] = useState(null);

  // State for data simulation
  const [allReadings] = useState(Object.values(hardcodedSensorData.readings)); 
  const [scenarioIndex, setScenarioIndex] = useState(1); 
  const readingCount = scenarioIndex * 10;
  const currentReadings = allReadings.slice(0, readingCount);

  // --- Event Handlers ---

  const handleRefresh = () => {
    if (scenarioIndex < 8) {
      setScenarioIndex(prevIndex => prevIndex + 1);
    } else {
      alert("You have reached the end of the sample data! Resetting.");
      setScenarioIndex(1);
    }
  };
  
  const handleLoginSuccess = () => { 
    // For direct login, we use a default user object
    setUser({ name: 'User' }); 
    setActivePage('dashboard'); 
  };
  
  const handleSignUpSuccess = (signUpData) => {
    // CORRECTED LOGIC: Don't log the user in yet. Just save their info temporarily.
    if (signUpData && signUpData.name) {
      setTempUser({ name: signUpData.name });
    }
    // Now, only change the view. The app remains in a "logged out" state.
    setView('onboarding-monitor');
  };
  
  const handleOnboardingNext = (data) => { 
    if (data && data.idealGoal) { 
      setSavingsGoal(data.idealGoal); 
    } 
    setView('onboarding-placement'); 
  };
  
  const handleOnboardingComplete = () => {
    // CORRECTED LOGIC: NOW we log the user in, using the temporary info.
    setUser(tempUser); 
    setActivePage('dashboard');
  };
  
  const handleLogout = () => { 
    setUser(null); 
    setTempUser(null); // Clear temporary user info as well
    setView('landing'); 
  };

  // --- Render Logic ---

  const renderLoggedInContent = () => {
    switch(activePage) {
      case 'Usage Chart':
        return <CostSummaryPage readings={currentReadings} userSavingsGoal={savingsGoal} onBack={() => setActivePage('dashboard')} />;
      case 'Update Goals':
        return <UpdateGoalsPage currentGoal={savingsGoal} onBack={() => setActivePage('dashboard')} onSaveGoal={setSavingsGoal} />;
      case 'EcoVolt Chatbot':
        return <ChatbotPage onBack={() => setActivePage('dashboard')} />;
      case 'dashboard':
      default:
        return <Dashboard user={user} readings={currentReadings} savingsGoal={savingsGoal} onLogout={handleLogout} onNavigate={setActivePage} onRefresh={handleRefresh} />;
    }
  }

  const renderLoggedOutContent = () => {
    switch (view) {
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} onSwitchToSignUp={() => setView('signup')} onBack={() => setView('landing')} />;
      case 'signup':
        return <SignUp onSignUpSuccess={handleSignUpSuccess} onSwitchToLogin={() => setView('login')} onBack={() => setView('landing')} />;
      case 'onboarding-monitor':
        return <OnboardingMonitor onNext={handleOnboardingNext} onBack={() => setView('signup')} />;
      case 'onboarding-placement':
        return <OnboardingPlacement onComplete={handleOnboardingComplete} />;
      case 'landing':
      default:
        return <LandingPage onNavigate={() => setView('login')} />;
    }
  };

  return (
    <div className="app-container" data-logged-in={!!user}>
      <div className="phone-container">
        {user ? renderLoggedInContent() : renderLoggedOutContent()}
      </div>
    </div>
  );
}

export default App;