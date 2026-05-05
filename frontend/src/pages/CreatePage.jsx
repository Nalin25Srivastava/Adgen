import { useState, useRef, useEffect } from "react";
import {
  Ban, Sun, Contrast, Lightbulb, Moon, Sunrise, Lamp, SunMedium, MoonStar, CircleDot, Sunset,
  Palette, Layout, Image as ImageIcon, Check, MousePointer2, Box, Sparkles, Wand2,
  Instagram, Facebook, Linkedin, Twitter, Music2, Layers, Zap, Hexagon, Droplets, Snowflake, Flame, Mountain,
  RectangleHorizontal, RectangleVertical, Monitor, Smartphone, Tv, Square,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const lightingOptions = [
  { label: "None", value: "none", Icon: Ban },
  { label: "Backlight", value: "backlight", Icon: Sun },
  { label: "Dramatic", value: "dramatic", Icon: Contrast },
  { label: "Volumetric", value: "volumetric", Icon: Lightbulb },
  { label: "Dimly Lit", value: "dimly-lit", Icon: Moon },
  { label: "Crepuscular", value: "crepuscular", Icon: Sunrise },
  { label: "Studio", value: "studio", Icon: Lamp },
  { label: "Sunlight", value: "sunlight", Icon: SunMedium },
  { label: "Low Light", value: "low-light", Icon: MoonStar },
  { label: "Rim Lighting", value: "rim", Icon: CircleDot },
  { label: "Golden Hour", value: "golden-hour", Icon: Sunset },
];

const styleOptions = [
  { label: "No Style", value: "none", Icon: Ban },
  { label: "Minimalist", value: "minimalist", Icon: Sparkles },
  { label: "Realistic", value: "realistic", Icon: ImageIcon },
  { label: "Cyberpunk", value: "cyberpunk", Icon: Box },
  { label: "Abstract", value: "abstract", Icon: MousePointer2 },
  { label: "Gouache", value: "gouache", Icon: Palette },
  { label: "Pixel Art", value: "pixel-art", Icon: Layout },
];

const colorOptions = [
  { label: "No Tone", value: "none", Icon: Ban },
  { label: "Vibrant", value: "vibrant", Icon: Zap },
  { label: "Pastel", value: "pastel", Icon: Hexagon },
  { label: "Monochrome", value: "monochrome", Icon: Layers },
  { label: "Neon", value: "neon", Icon: Lightbulb },
  { label: "Earth Tones", value: "earth-tones", Icon: Mountain },
  { label: "Cool", value: "cool", Icon: Snowflake },
  { label: "Warm", value: "warm", Icon: Flame },
];

const modelOptions = [
  { label: "FLUX.1 Schnell", value: "black-forest-labs/FLUX.1-schnell", Icon: Zap },
  { label: "SDXL Base 1.0", value: "stabilityai/stable-diffusion-xl-base-1.0", Icon: ImageIcon },
  { label: "FLUX.1 Dev", value: "black-forest-labs/FLUX.1-dev", Icon: Sparkles },
  { label: "Qwen Lightning", value: "lightx2v/Qwen-Image-Lightning", Icon: Zap },
  { label: "Playground v2.5", value: "playgroundai/playground-v2.5-1024px-aesthetic", Icon: Layout },
  { label: "Z-Image Turbo", value: "Tongyi-MAI/Z-Image-Turbo", Icon: Wand2 },
  { label: "SD 3 Medium", value: "stabilityai/stable-diffusion-3-medium", Icon: ImageIcon },
];

const platformOptions = [
  { label: "All Platform", value: "All", Icon: Layout },
  { label: "Instagram", value: "Instagram", Icon: Instagram },
  { label: "X (Twitter)", value: "X (Twitter)", Icon: Twitter },
  { label: "Facebook", value: "Facebook", Icon: Facebook },
  { label: "LinkedIn", value: "LinkedIn", Icon: Linkedin },
  { label: "TikTok", value: "TikTok", Icon: Music2 },
];

const aspectRatios = [
  { label: "1:1", value: "square", Icon: Square },
  { label: "16:9", value: "horizontal", Icon: RectangleHorizontal },
  { label: "9:16", value: "vertical", Icon: RectangleVertical },
  { label: "4:3", value: "standard", Icon: Tv },
  { label: "3:4", value: "portrait", Icon: Smartphone },
  { label: "2:3", value: "classic-portrait", Icon: RectangleVertical },
  { label: "3:2", value: "classic-landscape", Icon: RectangleHorizontal },
  { label: "21:9", value: "ultrawide", Icon: Monitor },
];

const Dropdown = ({ trigger, options, selectedValue, onSelect, triggerOnHover = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef(null);

  const selectedOption = options.find(o => o.value === selectedValue);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 8, left: rect.left });
    }
  }

  const toggle = () => {
    if (!triggerOnHover) {
      if (!isOpen) updatePosition();
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      updatePosition();
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerOnHover) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event.target;
      if (
        isOpen &&
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (isOpen) updatePosition();
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleResize, true);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleResize, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <div
      className="relative inline-block"
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={toggle} className="cursor-pointer">
        {trigger(selectedOption, isOpen)}
      </div>
      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          className="fixed z-[9999] bg-[#1a1f3c]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 min-w-[180px] animate-in fade-in zoom-in-95 duration-200"
          style={{ top: coords.top, left: coords.left }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-sm text-left flex items-center gap-3 transition-colors
                    ${selectedValue === option.value ? 'bg-blue-600/20 text-blue-400' : 'text-gray-300 hover:bg-white/5 hover:text-white'}
                  `}
              >
                {option.Icon && <option.Icon className="w-4 h-4 opacity-70" />}
                {!option.Icon && <span className="w-4" />}
                <span>{option.label}</span>
                {selectedValue === option.value && <Check className="w-3 h-3 ml-auto" />}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

const modes = ["Ad Generator AI", "Campaign Editor"];

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("Any platform");
  const [ratio, setRatio] = useState("square");
  const [ctaText, setCtaText] = useState("Shop Now");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logo, setLogo] = useState(null);
  const [opacity, setOpacity] = useState(100);
 
  const [lighting, setLighting] = useState("none");
  const [style, setStyle] = useState("none");
  const [tone, setTone] = useState("none"); // Consolidated from color/tone
  const [model, setModel] = useState("none");
  const [productName, setProductName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
 
  const location = useLocation();
  const [activeMode, setActiveMode] = useState(location.state?.mode || "Ad Generator AI");
 
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const triggerLogoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
  };

  const handleEnhancePrompt = async () => {
    if (!prompt) return;
    setIsEnhancing(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/image/enhance`, {
        prompt,
        productName,
        companyName,
        targetAudience,
        platform,
        tone
      });
      if (response.data.enhancedPrompt) {
        setPrompt(response.data.enhancedPrompt);
      }
    } catch (err) {
      console.error("Error enhancing prompt:", err);
      alert("Failed to enhance prompt. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);

    // Simulated progress bar while waiting for AI
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + (90 - prev) * 0.1 : prev));
    }, 500);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/image/generate`, {
        prompt,
        productName,
        companyName,
        targetAudience,
        platform,
        tone,
        lighting,
        style,
        aspect_ratio: ratio,
        model,
        type: activeMode === "Logo Maker AI" ? "logo" : "ad"
      });

      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        setLoading(false);
        const redirectState = {
          prompt,
          tone,
          platform,
          ratio,
          ctaText,
          productName,
          companyName,
          targetAudience,
          opacity,
          model,
          imageUrl: response.data.imageUrl,
          enhancedPrompt: response.data.enhancedPrompt,
          logoUrl: logo ? URL.createObjectURL(logo) : null,
          type: "ad"
        };

        if (activeMode === "Ad Generator AI") {
          navigate("/editor", { state: redirectState });
        }
      }, 500);
    } catch (err) {
      console.error("Error generating ad:", err);
      clearInterval(interval);
      setLoading(false);
      alert("Ad generation failed. This might be due to API quota limits or an invalid key. Please check your .env settings and try again.");
    }
  };

  const renderBadgeButton = (label, isActive, icon = null) => (
    <div className={`px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm
                    rounded-full border transition-all duration-200
                    flex items-center gap-2 select-none
                    ${isActive
        ? 'bg-blue-600/20 border-blue-500/50 text-blue-300'
        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200'}
                  `}>
      {icon}
      <span>{label}</span>
    </div>
  );

  return (
    <div className={`flex h-screen overflow-hidden gradient-bg-blue-3 text-white transition-colors duration-700 relative`}>

      <Sidebar />

      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="p-4 sm:p-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex justify-center mb-8">
              <div className="backdrop-blur-md p-1 rounded-xl flex space-x-1 border border-white/10 bg-white/5 shadow-xl overflow-x-auto max-w-full">
                {modes.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleModeChange(mode)}
                    className={`px-4 sm:px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 whitespace-nowrap ${activeMode === mode
                      ? mode === "Logo Maker AI" 
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold mb-2">
                {activeMode === "Ad Generator AI" && "Create New Campaign"}
                {activeMode === "Campaign Editor" && "Edit Existing Campaigns"}
              </h1>
              <p className="text-blue-200 mb-8">
                {activeMode === "Ad Generator AI" && "Let AI create your perfect social media ad"}
                {activeMode === "Campaign Editor" && "Fine-tune and customize your generated assets"}
              </p>
            </div>

            {activeMode === "Campaign Editor" ? (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center shadow-xl">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400">
                  <i className="fas fa-edit text-3xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Go to Campaign Editor</h2>
                <p className="text-gray-300 mb-8 max-w-lg mx-auto">Access the full-featured editor to customize your ads, adjust layers, and apply filters.</p>
                <button
                  onClick={() => navigate("/editor")}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-transform hover:scale-105"
                >
                  Launch Editor
                </button>
              </div>
            
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="w-full mx-auto">
                  <div className="bg-white/5 pb-16 backdrop-blur-md border border-white/10 rounded-2xl p-4  shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>

                    <div className="flex justify-between mb-4 items-center">
                      <h2 className="text-xl font-bold text-white flex items-center">
                        <i className="fas fa-pen-nib mr-3 text-blue-400"></i>
                        Describe Your Ad
                      </h2>

                      <button
                        type="button"
                        onClick={triggerLogoUpload}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs hover:bg-indigo-500/20 transition-all cursor-pointer"
                      >
                        {logo ? <Check size={12} /> : <i className="fas fa-plus"></i>}
                        <span>{logo ? "Logo Added" : "Add Logo"}</span>
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </div>

                    <div className="relative  bg-black/20 border border-white/10 rounded-xl resize-none">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={6}
                        className="w-full px-4 pt-4 bg-transparent rounded-xl resize-none text-white placeholder-gray-500 font-light focus:outline-none focus:border-transparent active:outline-none"
                        placeholder="Example: Eco-friendly reusable coffee cup made from bamboo, perfect for morning commuters. Highlight sustainability and modern design."
                        required
                      />

                      <button
                        type="button"
                        onClick={handleEnhancePrompt}
                        disabled={isEnhancing || !prompt}
                        className={`absolute bottom-4 right-4 p-2 rounded-lg transition-colors group/btn z-10 ${
                          isEnhancing ? 'bg-blue-600/50 cursor-wait' : 'bg-blue-600/20 hover:bg-blue-600/40 text-blue-400'
                        }`}
                        title="Enhance Prompt with AI"
                      >
                        <Wand2 size={16} className={isEnhancing ? "animate-spin" : "group-hover/btn:animate-pulse"} />
                      </button>
                    </div>

                    <div className="pt-24 absolute bottom-3 left-4 right-16 flex flex-wrap gap-1.5 items-center z-10 pointer-events-none">
                      <div className="pointer-events-auto flex flex-wrap gap-1.5">
                        <Dropdown
                          options={aspectRatios}
                          selectedValue={ratio}
                          onSelect={setRatio}
                          trigger={(selected, isOpen) => renderBadgeButton(
                            selected ? selected.label : "Aspect Ratio",
                            isOpen || (selected ? true : false),
                            selected?.Icon && <selected.Icon size={14} />
                          )}
                        />

                        <div className="w-px h-5 bg-white/10 mx-0.5 self-center"></div>

                        <Dropdown
                          options={styleOptions}
                          selectedValue={style}
                          onSelect={setStyle}
                          trigger={(selected, isOpen) => renderBadgeButton(
                            selected && selected.value !== 'none' ? selected.label : "No Style",
                            isOpen || (selected ? selected.value !== 'none' : false),
                            selected?.Icon && <selected.Icon size={14} />
                          )}
                        />

                        <Dropdown
                          options={lightingOptions}
                          selectedValue={lighting}
                          onSelect={setLighting}
                          trigger={(selected, isOpen) => renderBadgeButton(
                            selected && selected.value !== 'none' ? selected.label : "No Lighting",
                            isOpen || (selected ? selected.value !== 'none' : false),
                            selected?.Icon && <selected.Icon size={14} />
                          )}
                        />

                        <Dropdown
                          options={colorOptions}
                          selectedValue={tone}
                          onSelect={setTone}
                          trigger={(selected, isOpen) => renderBadgeButton(
                            selected && selected.value !== 'none' ? selected.label : "No Tone",
                            isOpen || (selected ? selected.value !== 'none' : false),
                            selected?.Icon && <selected.Icon size={14} />
                          )}
                        />

                        <Dropdown
                          options={platformOptions}
                          selectedValue={platform}
                          onSelect={setPlatform}
                          trigger={(selected, isOpen) => renderBadgeButton(
                            selected && selected.value !== 'none' ? selected.label : "All Platform",
                            isOpen || (selected ? selected.value !== 'All' : false),
                            selected?.Icon && <selected.Icon size={14} />
                          )}
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-1 right-4 p-2 text-blue-400 rounded-lg transition-colors group/btn z-10">
                      <Dropdown
                        options={modelOptions}
                        selectedValue={model}
                        onSelect={setModel}
                        trigger={(selected, isOpen) => renderBadgeButton(
                          selected && selected.value !== 'none' ? selected.label : "Model: Select AI",
                          isOpen || (selected ? selected.value !== 'none' : false),
                          selected?.Icon && <selected.Icon size={14} />
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden group">
                  <div className="grid md:grid-cols-1 gap-8">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent opacity-50"></div>

                      <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                        <i className="fas fa-sliders-h mr-3 text-yellow-400"></i>
                        Brand Details
                      </h2>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Product Name</label>
                            <input
                              type="text"
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                              className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 placeholder-gray-600 text-sm transition-all"
                              placeholder="e.g. iPhone 16"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Company Name</label>
                            <input
                              type="text"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 placeholder-gray-600 text-sm transition-all"
                              placeholder="e.g. Apple"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Target Audience</label>
                            <input
                              type="text"
                              value={targetAudience}
                              onChange={(e) => setTargetAudience(e.target.value)}
                              className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 placeholder-gray-600 text-sm transition-all"
                              placeholder="e.g. Young professionals, Coffee lovers"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Call-to-Action</label>
                            <input
                              type="text"
                              value={ctaText}
                              onChange={(e) => setCtaText(e.target.value)}
                              className="w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 placeholder-gray-600 text-sm transition-all"
                              placeholder="e.g. Shop Now"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                              <span>Logo Opacity</span>
                              <span className="text-yellow-400">{opacity}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={opacity}
                              onChange={(e) => setOpacity(parseInt(e.target.value))}
                              className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 pb-8">
                  <button type="button" onClick={() => navigate("/dashboard")} className="px-6 py-3 rounded-xl text-gray-400 font-medium hover:text-white hover:bg-white/5 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient hover:scale-105 text-white rounded-xl font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2">
                    <i className="fas fa-magic"></i>
                    <span>Generate Options</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {loading && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[10000] flex items-center justify-center">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-12 max-w-md w-full mx-4 shadow-2xl relative overflow-hidden">
              <div className="w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <i className="fas fa-magic text-blue-400 absolute inset-0 m-auto flex items-center justify-center text-xl animate-pulse"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Generating Assets</h3>
              <p className="text-gray-400 mb-8">AI is crafting your campaign variations...</p>
              <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-400 shadow-[0_0_15px_rgba(59,130,246,0.6)] h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="text-xs text-blue-400 mt-3 font-mono tracking-wider uppercase">{Math.round(progress)}% COMPLETE</p>
          </div>
        </div>
      )}
    </div>
  );
}
