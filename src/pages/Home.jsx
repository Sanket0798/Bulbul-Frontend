import { useRef } from "react";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FeaturedDishesSection from "@/components/sections/FeaturedDishesSection";
import PromotionSection from "@/components/sections/PromotionSection";
import ParallaxBanner from "@/components/common/ParallaxBanner";

export default function Home() {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const featuredRef = useRef(null);

  return (
    <div className="bg-bg">
      <HeroSection />

      {/* About section with 2nd banner as parallax background */}
      <ParallaxBanner src="/images/bg/2nd banner image.svg" overlay overlayClass="bg-white/60 lg:bg-white/40">
        <AboutSection ref={aboutRef} />
      </ParallaxBanner>

      {/* Services section with 3rd banner as parallax background */}
      <ParallaxBanner src="/images/bg/3rd banner image.svg">
        <ServicesSection ref={servicesRef} />
      </ParallaxBanner>

      {/* Featured dishes section with 4th banner as parallax background */}
      <ParallaxBanner src="/images/bg/4th banner.svg">
        <FeaturedDishesSection ref={featuredRef} />
      </ParallaxBanner>

      {/* Promotion section with 5th banner as parallax background */}
      {/* <ParallaxBanner src="/images/bg/5th banner.svg"> */}
        <PromotionSection />
      {/* </ParallaxBanner> */}
    </div>
  );
}
