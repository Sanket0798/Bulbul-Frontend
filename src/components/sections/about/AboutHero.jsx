import { Link } from "react-router-dom";
import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden flex items-end min-h-screen bg-charcoal">
      <img src="/images/bg/aboutbg.webp" alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div className="absolute inset-0 overlay-hero-left" />
      <div className="absolute inset-0 overlay-hero-bottom" />

      <div className="relative z-10 w-full max-w-container mx-auto px-5 sm:px-8 lg:px-0 pb-24 pt-[120px]">
        <div className="max-w-[640px]">
          <SectionTag label="About Our Restaurant" light />
          <h1 className="font-freight text-h1 text-cream font-normal mt-5 mb-6">
            Where Flavor Meets{" "}
            <span className="italic text-accent-gold">Our Emotions</span>
          </h1>
          <p className="font-josefin text-body-sm text-cream/75 mb-8 max-w-[480px]">
            Bulbul is founded by Chef Rohan D'Souza and restaurateur Twinkle Keswani.
            Between them, they have spent years opening and running restaurants across
            India, picking up ideas, habits, and a fairly strong point of view on how
            people like to eat.
          </p>
          <Link to="/contact" className="btn-outline-white inline-flex items-center gap-3">
            Know More <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
