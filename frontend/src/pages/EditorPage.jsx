import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function EditorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {
    platform: "Instagram",
    tone: "Professional",
    ratio: "square",
    ctaText: "Shop Now",
    productName: "EcoCup",
    companyName: "EcoBrand",
    targetAudience: "Coffee Lovers",
    opacity: 80,
    model: "Basic",
    prompt: "Experience sustainable luxury..."
  };

  return (
    <div className="flex min-h-screen gradient-bg-blue-3">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Edit Your Ad</h1>
              <p className="text-gray-400">Fine-tune and customize your generated ad</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-sm  p-3">
                <div className={`border-2 border-dashed border-white/40 rounded-lg relative bg-white/40 min-h-[400px] overflow-hidden group/ad flex items-center justify-center`}>
                  {data.imageUrl ? (
                    <img 
                      src={data.imageUrl} 
                      alt="Generated Content" 
                      className={`max-w-full max-h-full absolute inset-0 w-full h-full object-cover group-hover/ad:scale-110 transition-transform duration-700`}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/60 to-purple-600/60 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                        Your Ad Preview
                      </div>
                    </div>
                  )}
                  
                  {/* Logo Overlay */}
                  <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 flex items-center justify-center z-10 overflow-hidden" style={{ opacity: (data.opacity || 100) / 100 }}>
                    {data.logoUrl ? (
                      <img src={data.logoUrl} alt="Brand Logo" className="w-full h-full object-contain p-2" />
                    ) : (
                      <i className="fas fa-image text-white/40 text-xl"></i>
                    )}
                  </div>

                  {/* Text Overlay */}
                  <div className="absolute bottom-16 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 flex justify-between items-end">
                    <div>
                      <h2 className="text-white text-3xl font-bold mb-2 drop-shadow-lg">{data.productName || "Product Name"}</h2>
                      <p className="text-white/90 text-sm line-clamp-2 drop-shadow-md">
                        {data.enhancedPrompt || "Unlock the potential of your brand with AI-powered creatives."}
                      </p>
                    </div>
                    {data.companyName && (
                      <div className="bg-blue-600/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                        <span className="text-white font-bold text-sm tracking-widest uppercase">{data.companyName}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute bottom-6 right-6 bg-white px-6 py-3 rounded-full shadow-xl font-bold text-gray-900 z-10 cursor-pointer hover:bg-blue-50 transition-colors">
                    {data.ctaText} →
                  </div>
                </div>

                <div className="mt-4 flex space-x-3">
                  <button onClick={() => navigate("/create")} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl font-semibold flex items-center justify-center transition-all hover:scale-105 backdrop-blur-sm group">
                    <i className="fas fa-sync-alt mr-2 text-blue-400 group-hover:rotate-180 transition-transform duration-500"></i>
                    Remix
                  </button>
                  <button 
                    onClick={() => {
                      if (data.imageUrl) {
                        const link = document.createElement('a');
                        link.href = data.imageUrl;
                        link.download = `AdVantage-${data.productName || 'Campaign'}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      } else {
                        alert("No image available to export.");
                      }
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                  >
                    <i className="fas fa-download mr-2"></i>
                    Export
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-xl">
                <h3 className="font-bold text-white mb-2 flex items-center">
                  <i className="fas fa-quote-right mr-2 text-blue-400"></i>
                  Generated Copy
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl relative group">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="far fa-copy text-blue-400 cursor-pointer hover:text-white"></i>
                    </div>
                    <p className="text-xs font-medium text-blue-300 uppercase tracking-wider mb-2">Primary Text</p>
                    <p className="text-sm text-blue-100 leading-relaxed font-light">
                      {data.enhancedPrompt || `Discover ${data.productName} - the ultimate solution for ${data.targetAudience}. Experience quality and style. ${data.ctaText}! ✨`}
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl relative group">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="far fa-copy text-emerald-400 cursor-pointer hover:text-white"></i>
                    </div>
                    <p className="text-xs font-medium text-emerald-300 uppercase tracking-wider mb-2">Hashtags</p>
                    <p className="text-sm text-emerald-100 font-mono">
                      #{data.productName?.replace(/\s+/g, '') || "Brand"} #SustainableLiving #CoffeeLover
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-xl">
                <h3 className="font-bold text-white mb-2 flex items-center">
                  <i className="fas fa-info-circle mr-2 text-purple-400"></i>
                  Campaign Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-gray-400">Platform</span>
                    <span className="font-medium text-white flex items-center gap-2">
                      {data.platform}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-gray-400">Tone</span>
                    <span className="font-medium text-white">{data.tone}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-gray-400">Aspect Ratio</span>
                    <span className="font-medium text-white">{data.ratio}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-gray-400">Model</span>
                    <span className="font-medium text-white truncat max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap" title={data.model}>{data.model?.split('/').pop() || data.model}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-xl mt-8">
            <h3 className="font-bold text-white mb-2 flex items-center">
              <i className="fas fa-sliders-h mr-2 text-yellow-400"></i>
              Brand Details
            </h3>

            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/5">
              <span className="block text-gray-400 text-xs uppercase tracking-wider mb-2">Ad Prompt</span>
              <p className="text-white text-sm leading-relaxed italic">"{data.prompt}"</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors text-center group">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-500/30 transition-colors">
                  <i className="fas fa-tag text-blue-400"></i>
                </div>
                <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1">Product Name</span>
                <span className="block font-bold text-white text-lg">{data.productName}</span>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors text-center group">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-500/30 transition-colors">
                  <i className="fas fa-users text-purple-400"></i>
                </div>
                <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1">Target Audience</span>
                <span className="block font-bold text-white text-lg">{data.targetAudience}</span>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors text-center group">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-500/30 transition-colors">
                  <i className="fas fa-mouse-pointer text-emerald-400"></i>
                </div>
                <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1">CTA</span>
                <span className="block font-bold text-white text-lg">{data.ctaText}</span>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors text-center group">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-500/30 transition-colors">
                  <i className="fas fa-adjust text-orange-400"></i>
                </div>
                <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1">Logo Opacity</span>
                <span className="block font-bold text-white text-lg">{data.opacity}%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
