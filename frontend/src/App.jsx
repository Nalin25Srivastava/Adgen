import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import CreatePage from "./pages/CreatePage";
import EditorPage from "./pages/EditorPage";
import HistoryPage from "./pages/HistoryPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const { isAuthenticated, loading, logout } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id"}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar isAuthenticated={isAuthenticated} />
                <LandingPage />
              </>
            }
          />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/create"
            element={isAuthenticated ? <CreatePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/editor"
            element={isAuthenticated ? <EditorPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/history"
            element={isAuthenticated ? <HistoryPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />}
          />

          {/* Logout Route */}
          <Route
            path="/logout"
            element={<Logout logout={logout} />}
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

function Logout({ logout }) {
  useEffect(() => {
    logout();
    window.location.href = "/login";
  }, [logout]);
  return null;
}

export default App;
