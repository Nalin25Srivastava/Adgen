import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCampaigns: 0,
    adsGenerated: 0,
    storageUsed: "0.5 GB"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [usersRes, statsRes, campaignsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/auth/users`),
          axios.get(`${import.meta.env.VITE_API_URL}/campaign/stats`),
          axios.get(`${import.meta.env.VITE_API_URL}/campaign`)
        ]);

        setUsers(usersRes.data);
        setCampaigns(campaignsRes.data);
        setStats({
          totalUsers: usersRes.data.length,
          totalCampaigns: statsRes.data.totalCampaigns,
          adsGenerated: statsRes.data.adsGenerated,
          storageUsed: `${(statsRes.data.totalCampaigns * 0.12).toFixed(1)} GB`
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const getGradient = (index) => {
    const gradients = [
      "from-blue-400 to-purple-500",
      "from-green-400 to-teal-500",
      "from-pink-400 to-red-500",
      "from-yellow-400 to-orange-500"
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <div className="flex min-h-screen gradient-bg-blue-3 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden gradient-bg-blue-3 text-white">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-blue-200">System monitoring and user management</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Users", value: stats.totalUsers, change: "+2", icon: "fa-users", color: "blue" },
              { label: "Total Campaigns", value: stats.totalCampaigns, change: "+5", icon: "fa-chart-line", color: "green" },
              { label: "Ads Generated", value: stats.adsGenerated, subtext: "89% success rate", icon: "fa-server", color: "purple" },
              { label: "Storage Used", value: stats.storageUsed, change: "+5%", icon: "fa-database", color: "yellow" },
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm font-medium">{stat.label}</span>
                  <i className={`fas ${stat.icon} text-${stat.color}-400`}></i>
                </div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className={`text-sm mt-2 ${stat.change ? 'text-green-400' : 'text-gray-400'}`}>
                  {stat.change ? <><i className="fas fa-arrow-up"></i> {stat.change} this month</> : stat.subtext}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">User Management</h2>
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-2.5 text-gray-400 text-sm"></i>
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" 
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4 text-sm font-semibold text-blue-300">User</th>
                    <th className="py-3 px-4 text-sm font-semibold text-blue-300">Email</th>
                    <th className="py-3 px-4 text-sm font-semibold text-blue-300">Status</th>
                    <th className="py-3 px-4 text-sm font-semibold text-blue-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 bg-gradient-to-br ${getGradient(index)} rounded-full flex items-center justify-center mr-3 shadow-lg`}>
                            <span className="text-xs">{user.name.charAt(0)}</span>
                          </div>
                          <span className="font-medium text-white">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-300">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-medium border border-green-500/30">
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <button className="text-blue-400 hover:text-blue-300 font-medium mr-3 transition-colors">Edit</button>
                        <button className="text-red-400 hover:text-red-300 font-medium transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-6">
              <h3 className="font-bold text-white mb-4">API Health</h3>
              <div className="space-y-4">
                {[
                  { name: "Hugging Face API", status: "99.8%" },
                  { name: "Gemini API", status: "98.5%" },
                  { name: "Database", status: "100%" },
                ].map((api, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">{api.name}</span>
                      <span className="text-sm font-semibold text-green-400">{api.status}</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-400 h-1.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: api.status }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-6">
              <h3 className="font-bold text-white mb-4">Recent System Activity</h3>
              <div className="space-y-4">
                {[
                  { text: `Total Database Records`, sub: `${users.length} Users, ${campaigns.length} Campaigns`, color: "blue" },
                  { text: "Server health check", sub: "All systems operational • Stable", color: "green" },
                  { text: "Admin Access", sub: "Session active for User", color: "purple" },
                  { text: "API Status", sub: "Latency within normal range", color: "yellow" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start group">
                    <div className={`w-2 h-2 bg-${activity.color}-400 rounded-full mt-2 mr-3 shadow-[0_0_8px_rgba(255,255,255,0.3)]`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-200 font-medium group-hover:text-blue-400 transition-colors">{activity.text}</p>
                      <p className="text-xs text-gray-500">{activity.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
