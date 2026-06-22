import { forwardRef, useRef, useEffect } from "react";
import { gsap, SplitText, afterFonts, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";

const FEATURED_DISHES = [
  { img: "/images/rooms/1.svg", name: "The Main Room", desc: "Warm lighting and an open layout built for long tables and easy conversation." },
  { img: "/images/rooms/2.svg", name: "The Bar", desc: "A cave-inspired bar with glowing flower lights, cocktails drawn from the Indian pantry." },
  { img: "/images/rooms/3.svg", name: "Private Dining", desc: "An intimate space for celebrations, tastings, or a quiet dinner away from the crowd." },
  { img: "/images/rooms/4.svg", name: "The Terrace", desc: "A tucked-away outdoor spot for drinks and small plates when the weather allows." },
  { img: "/images/rooms/4th banner slider images.svg", name: "The Dining Room", desc: "Rich interiors with warm tones, plush seating, and a carpet that tells its own story." },
  { img: "/images/rooms/5.svg", name: "The Kitchen View", desc: "Watch the team at work — an open pass that brings the energy of service to the table." },
];

const FeaturedDishesSection = forwardRef(function FeaturedDishesSection(_, ref) {
  const headerRef = useRef(null);
  const headingRef = useRef(null);
  const trackRef = useRef(null);
  const loopRef = useRef(null);

  const filteredDishes = FEATURED_DISHES;

  // Duplicate dishes so a -50% shift of the track lands seamlessly back at the start.
  const loopDishes = [...filteredDishes, ...filteredDishes];

  // ── Header reveal (SplitText) + card scroll-in ─────────────────────────────
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => afterFonts(el, () => {
        const heading = SplitText.create(headingRef.current, {
          type: "lines", mask: "lines",
        });

        const tl = gsap.timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: { trigger: headerRef.current, start: "top 82%" },
        });
        tl.from(heading.lines, { yPercent: 120, duration: 1, stagger: 0.12 })
          .from(headerRef.current.querySelector("[data-animate-copy]"), {
            autoAlpha: 0, y: 30, filter: "blur(6px)", duration: 0.9,
          }, "-=0.7");

        // Cards rise + fade as the strip scrolls into view.
        gsap.from(trackRef.current.children, {
          autoAlpha: 0, yPercent: 18, scale: 0.94,
          duration: 1, stagger: 0.06, ease: "power3.out",
          scrollTrigger: { trigger: trackRef.current, start: "top 90%" },
        });

        return () => heading.revert();
      }));

      mm.add(REDUCED_MOTION, () => {
        gsap.set([headingRef.current, headerRef.current.children, trackRef.current.children], {
          autoAlpha: 1, clearProps: "transform,filter",
        });
      });
    }, el);

    return () => ctx.revert();
  }, [ref]);

  // ── Seamless GSAP marquee (replaces hand-rolled requestAnimationFrame) ──────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Respect reduced-motion: leave the strip static.
    if (window.matchMedia(REDUCED_MOTION).matches) return;

    const ctx = gsap.context(() => {
      // ~70px/sec, scaled to the width of one full set for a constant speed.
      const setWidth = track.scrollWidth / 2;
      const duration = setWidth / 70;

      loopRef.current = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration,
        repeat: -1,
      });
    }, track);

    return () => ctx.revert();
  }, [filteredDishes]);

  const pauseLoop = () => loopRef.current?.pause();
  const resumeLoop = () => loopRef.current?.resume();

  return (
    <section ref={ref} className="w-full py-[60px] lg:py-[110px] overflow-hidden">

      {/* Header — contained */}
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div ref={headerRef} className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10 lg:mb-[45px]">
          <div className="flex flex-col gap-2">
            <h2 ref={headingRef} className="font-freight text-[36px] sm:text-[48px] lg:text-[62px] leading-[44px] sm:leading-[58px] lg:leading-[73px]">
              <span className="text-rust-dark font-semibold">Beneath Tudor Street, a place to</span>
              <span className="italic font-normal text-gold"> gather.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3 max-w-[590px]" data-animate-copy>
            <p className="font-freight font-medium text-[16px] sm:text-[19px] leading-[22px] sm:leading-[25px] text-rust">
              For a working lunch, a celebratory dinner or a drink at the bar - with glowing flower lights and a cave-inspired bar that feels a world away from London.
            </p>
            {/* Category filter tab */}
            {/* <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-playfair text-[14px] font-medium tracking-normal uppercase px-6 py-2 rounded-full cursor-pointer transition-all duration-300
                    ${activeCategory === cat
                      ? "bg-rust text-cream border border-rust"
                      : "bg-transparent text-rust border border-rust/40 hover:border-rust"
                    }`}>
                  {cat}
                </button>
              ))}
            </div> */}
          </div>
        </div>
      </div>

      {/* Dish cards — full width, infinite scroll */}
      <div
        className="w-full"
        onMouseEnter={pauseLoop}
        onMouseLeave={resumeLoop}
      >
        <div
          ref={trackRef}
          className="flex gap-6 will-change-transform"
          style={{ width: "max-content" }}
        >
          {loopDishes.map(({ img, name, desc }, i) => (
            <div
              key={`${name}-${i}`}
              className="group flex flex-col w-[280px] sm:w-[340px] lg:w-[429px] shrink-0 cursor-pointer"
            >
              <div className="relative overflow-hidden w-[280px] sm:w-[340px] lg:w-[429px] h-[280px] sm:h-[340px] lg:h-[426px]">
                <img src={img} alt={name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeaturedDishesSection;
