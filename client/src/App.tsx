import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Landing from './pages/Landing';
import Login from './pages/SignIn/Signin';
import Signup from './pages/SignUp/Signup';
import Dashboard from './pages/Dashboard';
import GroupDetails from './pages/GroupDetails';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';

import SidebarNav from './components/SidebarNav';
import Topbar from './components/Topbar/Topbar';

import { ROUTE } from './types/routes';
import { RootState } from './store'; // adjust path based on your setup

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Router>
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path={ROUTE.LANDING} element={<Landing />} />
                <Route path={ROUTE.SIGNIN} element={<Login />} />
                <Route path={ROUTE.SIGNUP} element={<Signup />} />
                <Route path="*" element={<Navigate to={ROUTE.LANDING} replace />} />
              </>
            ) : (
              <Route
                path="*"
                element={
                  <div className="flex h-screen">
                    <SidebarNav />
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <Topbar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
                      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path={ROUTE.DASHBOARD} element={<Dashboard />} />
                          <Route path={ROUTE.GROUP_DETAILS} element={<GroupDetails />} />
                          <Route path={ROUTE.TRANSACTIONS} element={<Transactions />} />
                          <Route path={ROUTE.PROFILE} element={<Profile />} />
                          <Route path="*" element={<Navigate to={ROUTE.DASHBOARD} replace />} />
                        </Routes>
                      </main>
                    </div>
                  </div>
                }
              />
            )}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
