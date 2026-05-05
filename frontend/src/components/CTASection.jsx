import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-20 gradient-bg-blur text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Ad Creation?</h2>
        <p className="text-xl mb-8 text-blue-100 italic">"Unlock the potential of your brand with AI-powered creatives."</p>
        <Link
          to="/register"
          className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-flex items-center"
        >
          Start Creating Now
          <i className="fas fa-arrow-right ml-2"></i>
        </Link>
        <p className="mt-4 text-sm text-blue-100">Free to use • No hidden fees • Unlimited generations</p>
      </div>
    </section>
  );
}
