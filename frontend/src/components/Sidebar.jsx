import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: "fa-home", label: "Dashboard" },
    { path: "/create", icon: "fa-plus-circle", label: "Create Campaign" },
    { path: "/history", icon: "fa-history", label: "History" },
    { path: "/settings", icon: "fa-cog", label: "Settings" },
    { path: "/admin", icon: "fa-shield-alt", label: "Admin Panel" },
  ];

  return (
    <aside className="w-64 hidden md:flex flex-col h-screen sticky top-0 border-r border-white/10 bg-white/5 backdrop-blur-lg">
      <div className="p-6 flex-1">
        <Link to="/" className="flex items-center mb-8 group">
          <img src="/avg2.png" alt="Logo" className="h-8 w-12 object-contain" />
          <span className="ml-3 text-lg font-bold text-white group-hover:text-blue-400 transition-colors">AdVantage Gen</span>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 ${isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <i className={`fas ${item.icon} w-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}></i>
                <span className="ml-3">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10 mt-auto flex flex-col gap-2">
        <Link
          to="/logout"
          className="flex items-center px-4 py-3 rounded-xl font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 group"
        >
          <i className="fas fa-sign-out-alt w-5 group-hover:translate-x-1 transition-transform"></i>
          <span className="ml-3">Logout</span>
        </Link>

        <div className="flex items-center space-x-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default">
          <Link to="/settings" className="relative group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-[2px]">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name || "U"}&background=random`}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-white/20"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="fas fa-cog text-white text-xs"></i>
            </div>
          </Link>

          <div className="flex-1 min-w-0">
            <Link to="/profile" className="block hover:underline">
              <p className="text-sm font-semibold text-white truncate">{user?.name || "User"}</p>
            </Link>
            <p className="text-xs text-gray-400 truncate">Unlimited Access</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
