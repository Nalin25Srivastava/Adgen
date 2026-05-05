export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      avatar: "from-blue-400 to-purple-500",
      rating: 5,
      text: "AdVantage Gen reduced our ad creation time by 80%. The AI-generated images are incredibly professional, and the copy is spot-on every time."
    },
    {
      name: "Michael Chen",
      role: "CEO, StartupHub",
      avatar: "from-green-400 to-blue-500",
      rating: 5,
      text: "As a small business owner, this tool is a game-changer. I can create professional ads without hiring an agency. Absolutely worth every penny!"
    },
    {
      name: "Emma Williams",
      role: "Social Media Manager, FashionCo",
      avatar: "from-pink-400 to-red-500",
      rating: 5,
      text: "The multi-platform optimization is brilliant! I can create campaigns for Instagram, Facebook, and LinkedIn simultaneously. Saves hours of work."
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Marketing Teams Worldwide</h2>
          <p className="text-xl text-gray-600">See what our customers have to say</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-black/5 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.avatar} rounded-full mr-4`}></div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
