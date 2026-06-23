import AboutHero from "@/components/sections/about/AboutHero";
import AboutTeam from "@/components/sections/about/AboutTeam";
import AboutStory from "@/components/sections/about/AboutStory";
import AboutExperience from "@/components/sections/about/AboutExperience";
import AboutReserve from "@/components/sections/about/AboutReserve";

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutTeam />
      {/* <AboutStory /> */}
      <AboutExperience />
      <AboutReserve />
    </>
  );
}
