import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const showcaseAds = [
  { url: "/coffee_ad.png", title: "☕ Premium Coffee", subtitle: "Fresh & Organic" },
  { url: "/shoes ad.png", title: "👟 UltraBoost Pro", subtitle: "Run Like the Wind" },
  { url: "/Tech_StacX_1.png", title: "🚀 TechStacX", subtitle: "Next-Gen SaaS" },
  { url: "/coffee_ad3.png", title: "🥐 Daily Bread", subtitle: "Baked with Love" },
  { url: "/coffee_ad4.png", title: "🍫 Dark Roast", subtitle: "Pure Energy" }
];

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * showcaseAds.length);
    setCurrentIndex(randomIndex);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const selectedAd = showcaseAds[currentIndex];

  return (
    <section className="gradient-bg-blue text-white py-20 md:py-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Generate AI-Powered Ads in{" "}
              <span className="text-yellow-300">Seconds</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 italic">
              "Unlock the potential of your brand with AI-powered creatives."
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition text-center"
              >
                Get Started Now{" "}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
              <button className="glass-effect text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:bg-opacity-20 transition">
                <i className="fas fa-play mr-2"></i> Watch Demo
              </button>
            </div>
            <div className="mt-8 flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                <span>Free Forever</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                <span>No hidden fees</span>
              </div>
            </div>
          </div>
          <div className="animate-fade-in">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
              <div className="rounded-xl h-64 md:h-80 flex items-center justify-center relative overflow-hidden group">
                <img 
                   src={selectedAd.url} 
                   alt={selectedAd.title} 
                   className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:scale-110 transition-transform duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                />
                <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isLoading ? 'bg-opacity-60' : 'bg-opacity-20'}`}></div>
                {isLoading ? (
                  <div className="relative z-10 text-center">
                    <div className="spinner w-16 h-16 mx-auto mb-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white text-lg font-semibold animate-pulse">
                      AI is generating your ad...
                    </p>
                  </div>
                ) : (
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-xl transform translate-y-0 transition-transform group-hover:-translate-y-2">
                    <p className="text-gray-800 font-bold text-sm">
                      {selectedAd.title} - {selectedAd.subtitle}
                    </p>
                    <p className="text-blue-600 text-xs mt-1 font-semibold italic">Shop Now →</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
