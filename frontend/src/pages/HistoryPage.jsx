import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoryPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All Platforms");
  const [toneFilter, setToneFilter] = useState("All Tones");
  const [activeTab, setActiveTab] = useState("ad");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/campaign`);
        setCampaigns(res.data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      }
    };
    fetchCampaigns();
  }, []);

  useEffect(() => {
    let result = campaigns;

    // History is now only for ads
    result = result.filter(c => (c.type || "ad") === "ad");

    if (searchTerm) {
      result = result.filter(c => 
        (c.productName || "Untitled").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (platformFilter !== "All Platforms") {
      result = result.filter(c => c.platform === platformFilter);
    }

    if (toneFilter !== "All Tones") {
      result = result.filter(c => c.tone === toneFilter);
    }

    setFilteredCampaigns(result);
  }, [searchTerm, platformFilter, toneFilter, campaigns]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) return;
    
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/campaign/${id}`);
      setCampaigns(prev => prev.filter(c => c._id !== id));
      alert("Campaign deleted successfully!");
    } catch (err) {
      console.error("Error deleting campaign:", err);
      alert("Failed to delete campaign. Please try again.");
    }
  };

  const getGradient = (index) => {
    const gradients = [
      "from-blue-400 to-purple-500",
      "from-green-400 to-blue-500",
      "from-pink-400 to-red-500",
      "from-yellow-400 to-orange-500",
      "from-indigo-400 to-purple-500",
      "from-teal-400 to-green-500"
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
    <div className="flex h-screen overflow-hidden gradient-bg-blue-3 text-white">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Campaign History</h1>
            <p className="text-gray-400">Browse and manage your past ad campaigns</p>
          </div>



          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <i className="fas fa-search absolute left-4 top-3.5 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              
              <div className="relative">
                <select 
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <option className="bg-[#0f172a]">All Platforms</option>
                  <option className="bg-[#0f172a]">Instagram</option>
                  <option className="bg-[#0f172a]">Facebook</option>
                  <option className="bg-[#0f172a]">LinkedIn</option>
                  <option className="bg-[#0f172a]">Twitter</option>
                </select>
                <i className="fas fa-chevron-down absolute right-4 top-4 text-gray-400 pointer-events-none"></i>
              </div>
              <div className="relative">
                <select 
                  value={toneFilter}
                  onChange={(e) => setToneFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <option className="bg-[#0f172a]">All Tones</option>
                  <option className="bg-[#0f172a]">Professional</option>
                  <option className="bg-[#0f172a]">Witty</option>
                  <option className="bg-[#0f172a]">Urgent</option>
                </select>
                <i className="fas fa-chevron-down absolute right-4 top-4 text-gray-400 pointer-events-none"></i>
              </div>
            </div>
          </div>


          {filteredCampaigns.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign, index) => (
                  <div 
                    key={campaign._id} 
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden group transition-all duration-300 hover:transform hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-blue-500/10"
                  >
                    <div className={`relative h-48 flex items-center justify-center overflow-hidden bg-gradient-to-br ${getGradient(index)}`}>
                      <img 
                        src={campaign.imageUrl} 
                        alt={campaign.productName || "Campaign"} 
                        className="transition-all duration-500 w-full h-full object-cover opacity-80 group-hover:opacity-100" 
                      />
                      
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                      <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-blue-600/60 backdrop-blur-sm flex items-center justify-center p-2">
                        <span className="relative z-10 drop-shadow-md text-white font-bold text-center break-words leading-tight text-xs uppercase tracking-tighter">
                            {campaign.companyName || campaign.productName || "AdVantage"}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg leading-tight truncate flex-1 text-white">
                          {campaign.productName || "Ad Campaign"}
                        </h3>
                        <div className="flex gap-2 items-center">
                          <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded border border-blue-500/30">Ad Campaign</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-6">
                        <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs rounded-full flex items-center gap-1.5">
                          <i className={`fab fa-${campaign.platform?.toLowerCase() || 'instagram'} text-[10px]`}></i>
                          {campaign.platform || "Social"}
                        </span>
                        <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-full">
                          {campaign.tone || "Standard"}
                        </span>
                        <span className="text-[10px] font-medium ml-auto text-gray-500">{getTimeAgo(campaign.createdAt)}</span>
                      </div>

                      <div className="flex gap-3">
                        <Link 
                          to="/editor" 
                          state={{ ...campaign, imageUrl: campaign.imageUrl }} 
                          className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-center transition-all shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/20 text-white"
                        >
                          Edit Ad
                        </Link>
                        <button className="px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
                          <i className="fas fa-external-link-alt text-xs"></i>
                        </button>
                        <button 
                          onClick={() => handleDelete(campaign._id)}
                          className="px-3 py-2.5 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 rounded-xl text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <i className="fas fa-trash-alt text-xs"></i>
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-20 text-center shadow-xl">
              <div className="w-20 h-20 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-ad text-3xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">No Campaigns Found</h2>
              <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                {searchTerm 
                  ? "No campaigns match your search criteria. Try a different term."
                  : "You haven't generated any ad campaigns yet. Start creating now!"}
              </p>
              <Link
                to="/create"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg transition-transform hover:scale-105 inline-block"
              >
                Create New Ad
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
