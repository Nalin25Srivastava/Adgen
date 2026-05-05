import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
  const [stats, setStats] = useState([
    { label: "Total Campaigns", value: "0", change: "", icon: "fa-bullhorn", color: "blue" },
    { label: "Ads Generated", value: "0", change: "", icon: "fa-image", color: "green" },
    { label: "Time Saved", value: "0h", subtext: "Estimated", icon: "fa-clock", color: "purple" },
    { label: "Usage Status", value: "Unlimited", subtext: "Free Forever", icon: "fa-infinity", color: "yellow" },
  ]);

  const [recentCampaigns, setRecentCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await axios.get(`${import.meta.env.VITE_API_URL}/campaign/stats`);
        const campaignsRes = await axios.get(`${import.meta.env.VITE_API_URL}/campaign`);

        setStats([
          { label: "Total Campaigns", value: statsRes.data.totalCampaigns.toString(), change: "+10%", icon: "fa-bullhorn", color: "blue" },
          { label: "Ads Generated", value: statsRes.data.adsGenerated.toString(), change: "+15%", icon: "fa-image", color: "green" },
          { label: "Time Saved", value: statsRes.data.timeSaved, subtext: "Estimated", icon: "fa-clock", color: "purple" },
          { label: "Usage Status", value: statsRes.data.usageStatus, subtext: "Free Forever", icon: "fa-infinity", color: "yellow" },
        ]);

        setRecentCampaigns(campaignsRes.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  const getGradient = (index) => {
    const gradients = [
      "from-blue-400 to-purple-500",
      "from-green-400 to-blue-500",
      "from-pink-400 to-red-500"
    ];
    return gradients[index % gradients.length];
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="gradient-bg-blue-2 h-screen overflow-hidden text-white">
    <div className="flex h-full">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto relative">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, User! 👋</h1>
            <p className="text-gray-400">Ready to build your brand and ads today?</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm font-medium">{stat.label}</span>
                  <i className={`fas ${stat.icon} text-${stat.color}-500/80`}></i>
                </div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-wider">{stat.subtext || stat.change}</p>
              </div>
            ))}
          </div>

          {/* Ad Campaigns Section */}
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                  <i className="fas fa-bullhorn"></i>
                </div>
                <h2 className="text-2xl font-bold text-white">Ad Campaigns</h2>
              </div>
              <Link to="/history" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">View All Ads</Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                to="/create" 
                state={{ mode: "Ad Generator AI" }}
                className="group relative h-64 bg-gradient-to-br from-blue-600/80 to-blue-700/80 rounded-2xl p-8 flex flex-col justify-end overflow-hidden shadow-xl shadow-blue-500/10 hover:scale-[1.02] transition-all"
              >
                <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>
                <i className="fas fa-plus-circle text-4xl mb-4 group-hover:rotate-90 transition-transform duration-500"></i>
                <h3 className="text-xl font-bold mb-1">New Ad Campaign</h3>
                <p className="text-blue-100/70 text-sm">Generate AI-powered social media ads instantly</p>
              </Link>

              {recentCampaigns.filter(c => (c.type || 'ad') === 'ad').slice(0, 2).map((campaign, index) => (
                <div 
                  key={campaign._id} 
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group hover:border-blue-500/30 transition-all shadow-xl"
                >
                  <div className={`h-40 flex items-center justify-center relative overflow-hidden bg-gradient-to-br ${getGradient(index)}`}>
                    <img 
                      src={campaign.imageUrl} 
                      alt={campaign.productName} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-blue-600/60 backdrop-blur-sm flex items-center justify-center p-2">
                      <span className="text-white drop-shadow-lg font-bold text-center break-words leading-tight text-[10px] uppercase tracking-tighter">
                        {campaign.companyName || campaign.productName}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-white truncate mb-1">{campaign.productName || "Untitled Ad"}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-500">{getTimeAgo(campaign.createdAt)}</span>
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[9px] font-bold rounded uppercase">{campaign.platform}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
    </div>
  );
}
