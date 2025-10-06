import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useAppSelector } from "./store";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ProtectedRoute from "./components/common/ProtectedRoute";
import NotificationToast from "./components/common/NotificationToast";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import GroupDetails from "./pages/GroupDetails";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import SidebarNav from "./components/SidebarNav";
import Topbar from "./components/Topbar";
import Signin from "./pages/Signin";
import ROUTES from "./common/enums/route";

function App() {
  const { isAuthenticated, user } = useAuth();
  const { darkMode } = useAppSelector((state) => state.ui);

  const needsOnboarding = user && !user.upiId;

  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Router>
            {!isAuthenticated ? (
              <Routes>
                <Route path={ROUTES.HOME} element={<Landing />} />
                <Route path={ROUTES.LOGIN} element={<Signin />} />
                <Route path={ROUTES.SIGNUP} element={<Signup />} />
                <Route
                  path={ROUTES.UNKNOWN}
                  element={<Navigate to="/" replace />}
                />
              </Routes>
            ) : needsOnboarding ? (
              <Onboarding userName={user?.name || ""} />
            ) : (
              <div className="flex h-screen">
                <ProtectedRoute>
                  <SidebarNav />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Topbar />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                      <Routes>
                        <Route path={ROUTES.HOME} element={<Dashboard />} />
                        <Route
                          path={ROUTES.DASHBOARD}
                          element={<Dashboard />}
                        />
                        <Route
                          path={ROUTES.GROUP_DETAILS}
                          element={<GroupDetails />}
                        />
                        <Route
                          path={ROUTES.TRANSACTION}
                          element={<Transactions />}
                        />
                        <Route path={ROUTES.PROFILE} element={<Profile />} />
                        <Route
                          path={ROUTES.UNKNOWN}
                          element={<Navigate to={ROUTES.DASHBAORD} replace />}
                        />
                      </Routes>
                    </main>
                  </div>
                </ProtectedRoute>
              </div>
            )}
            <NotificationToast />
          </Router>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
