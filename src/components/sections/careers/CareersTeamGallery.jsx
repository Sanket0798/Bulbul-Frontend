import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";

const TEAM_GALLERY = [
  "/images/gallery/gallery1.webp",
  "/images/gallery/gallery2.webp",
  "/images/gallery/gallery3.webp",
  "/images/gallery/gallery4.webp",
];

export default function CareersTeamGallery() {
  return (
    <section className="w-full py-24 bg-charcoal/95">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-20">

          <div className="flex-1 grid grid-cols-2 gap-4">
            {TEAM_GALLERY.map((src, i) => (
              <div key={i}
                className={`group relative overflow-hidden rounded-sm ${i % 2 === 0 ? "h-[280px]" : "h-[220px]"}`}>
                <img src={src} alt={`Team ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-rust/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          <div className="shrink-0 lg:w-[480px] flex flex-col gap-8">
            <SectionTag label="Team Experience" light />
            <h2 className="font-freight text-h2 text-cream font-normal">
              Moments Behind <span className="italic text-accent-gold">the Scenes</span>
            </h2>
            <div className="flex flex-col gap-4 p-6 border border-accent-gold/15 bg-accent-gold/3">
              <blockquote className="font-freight italic text-h4 text-cream">
                "The best experiences are created by people who love what they do."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-accent-gold" />
                <span className="font-josefin text-caption uppercase tracking-widest text-accent-gold">
                  Bulbul Team
                </span>
              </div>
            </div>
            <a href="#apply" className="btn-outline-white inline-flex items-center gap-3 self-start">
              Apply Now <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
