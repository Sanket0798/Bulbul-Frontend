import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CareersHero from "@/components/sections/careers/CareersHero";
import CareersWhyWork from "@/components/sections/careers/CareersWhyWork";
import CareersPositions from "@/components/sections/careers/CareersPositions";
import CareersTeamGallery from "@/components/sections/careers/CareersTeamGallery";
import CareersApplicationForm from "@/components/sections/careers/CareersApplicationForm";

export default function Careers() {
  return (
    <div className="min-h-screen bg-bg-inner">
      <Navbar transparent />
      <CareersHero />
      <CareersWhyWork />
      <CareersPositions />
      <CareersTeamGallery />
      <CareersApplicationForm />
      <Footer />
    </div>
  );
}
