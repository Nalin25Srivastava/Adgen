import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ isAuthenticated = false }) {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";
  const navClass = isHome ? "gradient-bg-nav-home" : "gradient-bg-nav-else";

  return (
    <nav id="top" className={`${navClass} shadow-sm w-full top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center cursor-pointer">
            <div className="flex items-center space-x-2 group">
              <img src="/avg2.png" alt="Logo" className="h-8 w-20 object-contain" />
              <span className="text-2xl font-bold tracking-wide gradient-text ">AdVantage Gen</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                <a href="#ai-tools" className="text-gray-100 hover:text-white font-medium transition-colors">
                  AI Tools
                </a>
                <a href="#features" className="text-gray-100 hover:text-white font-medium transition-colors">
                  Features
                </a>
                <div className="flex items-center space-x-4 ml-4">
                  <Link to="/login" className="text-gray-100 hover:text-white font-medium transition-colors">
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
                  >
                    Join Now
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-6">
                <>
                  <a href="#ai-tools" className="text-gray-100 hover:text-white font-medium transition-colors">
                    AI Tools
                  </a>
                  <a href="#features" className="text-gray-100 hover:text-white font-medium transition-colors">
                    Features
                  </a>
                </>

                <Link to="/dashboard" className="btn-primary text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
                  <i className="fas fa-home mr-2"></i>Dashboard
                </Link>

                <div className="relative group">
                  <button className="flex items-center space-x-3 text-gray-100 hover:text-white focus:outline-none">
                    <span className="font-medium">{user?.name || "User"}</span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-[2px]">
                      <img
                        src={`https://ui-avatars.com/api/?name=${user?.name || "U"}&background=random`}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover border-2 border-white/20"
                      />
                    </div>
                  </button>

                  <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50">
                    <div className="w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <i className="fas fa-user mr-3 w-5 text-indigo-500"></i>Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <i className="fas fa-cog mr-3 w-5 text-gray-500"></i>Settings
                      </Link>
                      <Link
                        to="/history"
                        className="flex items-center px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <i className="fas fa-history mr-3 w-5 text-green-500"></i>History
                      </Link>

                      <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>

                      <Link
                        to="/logout"
                        className="flex items-center px-4 py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                      >
                        <i className="fas fa-sign-out-alt mr-3 w-5"></i>Logout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              className="text-gray-100 hover:text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {!isAuthenticated ? (
              <>
                <a href="#features" className="block text-gray-100 hover:text-white font-medium">
                  Features
                </a>
                <div className="border-t border-gray-700 my-2"></div>
                <Link to="/login" className="block text-gray-100 hover:text-white font-medium">
                  Log In
                </Link>
                <Link to="/register" className="block text-primary-blue font-medium">
                  Join Now
                </Link>
              </>
            ) : (
              <>
                <div className="px-2 py-2 flex items-center space-x-3 mb-4 bg-gray-800 rounded-lg">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.name || "U"}&background=random`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-white font-medium">{user?.name || "User"}</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                </div>
                <Link to="/dashboard" className="block text-gray-100 hover:text-white font-medium py-2">
                  <i className="fas fa-columns w-6"></i> Dashboard
                </Link>
                <Link to="/profile" className="block text-gray-100 hover:text-white font-medium py-2">
                  <i className="fas fa-user w-6"></i> Profile
                </Link>
                <Link to="/settings" className="block text-gray-100 hover:text-white font-medium py-2">
                  <i className="fas fa-cog w-6"></i> Settings
                </Link>
                <Link to="/history" className="block text-gray-100 hover:text-white font-medium py-2">
                  <i className="fas fa-history w-6"></i> History
                </Link>
                <div className="border-t border-gray-700 my-2"></div>
                <Link to="/logout" className="block text-red-500 font-medium py-2">
                  <i className="fas fa-sign-out-alt w-6"></i> Logout
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
