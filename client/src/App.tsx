import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import GroupDetails from './pages/GroupDetails';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';
import SidebarNav from './components/SidebarNav';
import Topbar from './components/Topbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [currentUser] = useState({ name: 'Shrey', email: 'shrey@example.com' });

  const handleSignup = () => {
    setIsAuthenticated(true);
    setShowOnboarding(true);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowOnboarding(false);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
    setShowOnboarding(false);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Router>
          {!isAuthenticated ? (
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          ) : showOnboarding ? (
            <Onboarding 
              onComplete={handleOnboardingComplete} 
              userName={currentUser.name}
            />
          ) : (
            <div className="flex h-screen">
              <SidebarNav onLogout={toggleAuth} />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar 
                  user={currentUser} 
                  darkMode={darkMode} 
                  onToggleDarkMode={toggleDarkMode}
                  onLogout={toggleAuth}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/groups/:groupId" element={<GroupDetails />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/profile" element={<Profile user={currentUser} onLogout={toggleAuth} />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          )}
        </Router>
      </div>
    </div>
  );
}

export default App;