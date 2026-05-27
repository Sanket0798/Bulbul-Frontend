import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import MenuSection from "@/components/sections/MenuSection";
import FeaturedDishesSection from "@/components/sections/FeaturedDishesSection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const aboutRef    = useRef(null);
  const servicesRef = useRef(null);
  const menuRef     = useRef(null);
  const featuredRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [aboutRef, servicesRef, menuRef, featuredRef].forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current.querySelectorAll("[data-animate]"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 80%" } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <Navbar transparent />
      <HeroSection />
      <AboutSection ref={aboutRef} />
      <ServicesSection ref={servicesRef} />
      <MenuSection ref={menuRef} />
      <FeaturedDishesSection ref={featuredRef} />
      <Footer />
    </div>
  );
}
