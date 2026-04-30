/*
 * Home — ProLedger Landing Page
 * Design: Swiss Minimalism × Premium Financial Services
 * Sections: Navbar → Hero → TrustBar → Services → About → Testimonials → Appointment → FAQ → Footer
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AppointmentSection from "@/components/AppointmentSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrustBar />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <AppointmentSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
