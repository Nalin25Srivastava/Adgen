import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import AiTools from "../components/AiTools.jsx";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <HeroSection />
      <Features />
      <AiTools />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
