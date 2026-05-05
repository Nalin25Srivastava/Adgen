export default function Features() {
  const features = [
    {
      icon: "fas fa-image",
      title: "AI Image Generation",
      description: "Create stunning, unique visuals with cutting-edge AI. No stock photos needed.",
      gradient: "from-blue-50 to-white",
      iconGradient: "gradient-bg"
    },
    {
      icon: "fas fa-pen-fancy",
      title: "Smart Copywriting",
      description: "Generate compelling ad copy and hashtags that convert, powered by advanced AI.",
      gradient: "from-green-50 to-white",
      iconGradient: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      icon: "fas fa-palette",
      title: "Brand Overlay",
      description: "Add your logo, CTAs, and branding with an intuitive drag-and-drop editor.",
      gradient: "from-purple-50 to-white",
      iconGradient: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      icon: "fas fa-bolt",
      title: "Lightning Fast",
      description: "Generate complete ad campaigns in under 30 seconds. Scale your marketing effortlessly.",
      gradient: "from-yellow-50 to-white",
      iconGradient: "bg-gradient-to-br from-yellow-500 to-yellow-600"
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Multi-Platform",
      description: "Optimize for Instagram, Facebook, LinkedIn, Twitter, and more with one click.",
      gradient: "from-red-50 to-white",
      iconGradient: "bg-gradient-to-br from-red-500 to-red-600"
    },
    {
      icon: "fas fa-chart-line",
      title: "Analytics Dashboard",
      description: "Track your ad performance and campaign history with detailed insights.",
      gradient: "from-indigo-50 to-white",
      iconGradient: "bg-gradient-to-br from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section id="features" className=" py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Modern Marketers</h2>
          <p className="text-xl text-gray-600">Everything you need to create professional ads in minutes</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`card-hover bg-gradient-to-br backdrop-blur-sm ${feature.gradient} p-8 rounded-2xl border border-opacity-20`}
            >
              <div className={`w-14 h-14 ${feature.iconGradient} rounded-xl flex items-center justify-center mb-6`}>
                <i className={`${feature.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
