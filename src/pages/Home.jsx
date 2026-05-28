import { useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import MenuSection from "@/components/sections/MenuSection";
import FeaturedDishesSection from "@/components/sections/FeaturedDishesSection";
import PromotionSection from "@/components/sections/PromotionSection";

export default function Home() {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const menuRef = useRef(null);
  const featuredRef = useRef(null);

  return (
    <div className="min-h-screen bg-bg">
      <Navbar transparent />
      <HeroSection />
      <AboutSection ref={aboutRef} />
      <ServicesSection ref={servicesRef} />
      <FeaturedDishesSection ref={featuredRef} />
      <MenuSection ref={menuRef} />
      <PromotionSection />
      <Footer />
    </div>
  );
}
