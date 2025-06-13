import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import GroupDetails from './pages/GroupDetails';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';
import SidebarNav from './components/SidebarNav';
import Topbar from './components/Topbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [currentUser] = useState({ name: 'Shrey', email: 'shrey@example.com' });

  const toggleAuth = () => setIsAuthenticated(!isAuthenticated);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Router>
            <Routes>
              <Route path="/login" element={<Login onLogin={toggleAuth} />} />
              <Route path="/signup" element={<Signup onSignup={toggleAuth} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Router>
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
        </Router>
      </div>
    </div>
  );
}

export default App;