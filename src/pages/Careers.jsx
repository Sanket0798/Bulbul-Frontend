import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CareersHero from "@/components/sections/careers/CareersHero";
import CareersIntro from "@/components/sections/careers/CareersIntro";
import CareersWhyWork from "@/components/sections/careers/CareersWhyWork";
import CareersPositions from "@/components/sections/careers/CareersPositions";
import CareersGallery from "@/components/sections/careers/CareersGallery";
import CareersApplicationForm from "@/components/sections/careers/CareersApplicationForm";

export default function Careers() {
  return (
    <div className="min-h-screen bg-bg-inner">
      <Navbar transparent />
      <CareersHero />
      <CareersIntro />
      <CareersWhyWork />
      <CareersPositions />
      <CareersGallery />
      <CareersApplicationForm />
      <Footer />
    </div>
  );
}
