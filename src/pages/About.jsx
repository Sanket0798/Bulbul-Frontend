import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutStory from "@/components/sections/about/AboutStory";
import AboutExperience from "@/components/sections/about/AboutExperience";
import AboutGallery from "@/components/sections/about/AboutGallery";
import AboutChef from "@/components/sections/about/AboutChef";

export default function About() {
  return (
    <div className="min-h-screen bg-bg-inner">
      <Navbar transparent />
      <AboutHero />
      <AboutStory />
      <AboutExperience />
      <AboutGallery />
      <AboutChef />
      <Footer />
    </div>
  );
}
