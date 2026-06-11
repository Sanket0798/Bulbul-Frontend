import { Link } from "react-router-dom";
import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";

export default function CareersHero() {
  return (
    <section className="relative w-full overflow-hidden flex items-end min-h-screen bg-charcoal">
      <img src="/images/shared/people/friends-pizza-bright.png" alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-45" />
      <div className="absolute inset-0 overlay-hero-left" />
      <div className="absolute inset-0 overlay-hero-bottom" />

      <div className="relative z-10 w-full max-w-container mx-auto px-5 sm:px-8 lg:px-0 pb-24 pt-[120px]">
        <div className="max-w-[600px]">
          <SectionTag label="Our Values" light />
          <h1 className="font-freight text-h1 text-cream font-normal mt-5 mb-6">
            Built by People <span className="italic text-accent-gold">Who Care</span>
          </h1>
          <p className="font-josefin text-body-sm text-cream/75 mb-10 max-w-[520px]">
            The food matters. The bar matters. The service matters. But more than
            anything, it's the people behind it — a team that takes pride in every
            detail and shows up for each other every single day.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/rooms" className="btn-outline-white inline-flex items-center gap-3">
              View Menu <ArrowIcon />
            </Link>
            <a href="#apply" className="btn-outline-white inline-flex items-center gap-3">
              Make an Enquiry <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
