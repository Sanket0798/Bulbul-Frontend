import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutStory from "@/components/sections/about/AboutStory";
import AboutHighlights from "@/components/sections/about/AboutHighlights";
import AboutExperience from "@/components/sections/about/AboutExperience";
import AboutChef from "@/components/sections/about/AboutChef";
import AboutReserve from "@/components/sections/about/AboutReserve";

export default function About() {
  return (
    <div className="min-h-screen bg-bg-inner">
      <Navbar transparent />
      <AboutHero />
      <AboutStory />
      <AboutHighlights />
      <AboutExperience />
      <AboutChef />
      <AboutReserve />
      <Footer />
    </div>
  );
}
