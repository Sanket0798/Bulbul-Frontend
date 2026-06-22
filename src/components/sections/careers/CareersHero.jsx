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
          <h1 className="font-freight text-h1 text-cream font-normal italic mb-6">
            "The best experiences are created by people who love what they do."
          </h1>
          <p className="font-josefin text-body-sm text-cream/75 mb-10 max-w-[520px]">
            If you're calm in a storm and fun after it - Send in your application below.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#apply"
              className="inline-flex items-center gap-1 font-semibold leading-[25px] self-start px-8 py-[9px] bg-primary text-cream font-freight text-lg transition-all duration-300 hover:bg-rust-dark rounded">
              Apply Now <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
