import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");
    } catch (err) {
      console.error("Login Error:", err);
      throw err.response?.data?.message || "Login failed. Please check your connection.";
    }
  };

  const googleLogin = async (credential) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google`, { credential });
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");
    } catch (err) {
      console.error("Google Login Error:", err);
      throw err.response?.data?.message || "Google login failed. Check your network or Google account.";
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, { name, email, password });
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");
    } catch (err) {
      console.error("Signup Error:", err);
      throw err.response?.data?.message || "Signup failed. Email may already be in use.";
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    googleLogin,
    signup,
    logout
  }), [user, token, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
