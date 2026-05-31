import { Link } from "react-router-dom";
import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";

export default function GroupHero() {
  return (
    <section className="relative w-full overflow-hidden flex items-end min-h-screen bg-charcoal">
      <img src="/images/bg/choose.webp" alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div className="absolute inset-0 overlay-hero-left" />
      <div className="absolute inset-0 overlay-hero-bottom" />

      <div className="relative z-10 w-full max-w-container mx-auto px-5 sm:px-8 lg:px-0 pb-24 pt-[120px]">
        <div className="max-w-[600px]">
          <SectionTag label="Crowd-pleasing plates to share" light />
          <h1 className="font-freight text-h1 text-cream font-normal mt-5 mb-6">
            Group Feast <span className="italic text-accent-gold">Menus</span>
          </h1>
          <p className="font-josefin text-body-sm text-cream/75 mb-10 max-w-[520px]">
            Finest snacks, grills, ruby murrays, fragrant biryanis, naans, rotis and
            sweet puddings. Delicious and copious dishes that laden tables with café
            favourites to share at breakfast, lunch and dinner.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/rooms" className="btn-outline-white inline-flex items-center gap-3">
              View Menu <ArrowIcon />
            </Link>
            <a href="#enquiry" className="btn-outline-white inline-flex items-center gap-3">
              Make an Enquiry <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
