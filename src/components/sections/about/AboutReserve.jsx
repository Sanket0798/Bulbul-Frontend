import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";

const OFFERS = [
  "Buy 1 Get 1",
  "Candlelight Special",
  "Wine & Dine",
  "Midnight Cravings",
  "Chef's Special Combo",
];

export default function AboutReserve() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const sideTextRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => {
        // Background parallax drift
        gsap.fromTo(mediaRef.current,
          { yPercent: -8 },
          {
            yPercent: 8, ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );

        gsap.fromTo(sideTextRef.current,
          { autoAlpha: 0, x: -30 },
          { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
        );

        // Offers — clip-wipe up with stagger
        gsap.fromTo(listRef.current.children,
          { autoAlpha: 0, yPercent: 60, clipPath: "inset(0 0 100% 0)" },
          {
            autoAlpha: 1, yPercent: 0, clipPath: "inset(0 0 0% 0)",
            stagger: 0.1, duration: 0.8, ease: "power4.out",
            scrollTrigger: { trigger: listRef.current, start: "top 85%" },
          }
        );
      });

      mm.add(REDUCED_MOTION, () => {
        gsap.set([sideTextRef.current, listRef.current.children, mediaRef.current], {
          autoAlpha: 1, clearProps: "transform,clipPath",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-auto min-h-[400px] lg:h-[654px] overflow-hidden">

      {/* Full-width background image — oversized for parallax */}
      <div ref={mediaRef} className="absolute inset-[-8%] will-change-transform">
        <img
          src="/images/shared/interior/busy-restaurant-aerial.png"
          alt="Restaurant interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-charcoal/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex">

        <div className="bg-black flex flex-row bg-rust/50">
                  {/* Left — vertical "Reserve Table Now" text with border */}
        <div
          ref={sideTextRef}
          className="hidden sm:flex items-center justify-center shrink-0 w-[100px] lg:w-[143px] border-r-[3px] border-cream"
        >
          <Link
            to="/contact"
            className="font-freight text-[36px] sm:text-[42px] lg:text-[48px] leading-[1.1] font-black text-cream tracking-wide no-underline"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Reserve Table Now
          </Link>
        </div>

        {/* Center — offers list */}
        <div className="flex items-center px-5 sm:px-6 py-10 lg:py-0">
          <div ref={listRef} className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
            {OFFERS.map((offer) => (
              <h3
                key={offer}
                className="font-freight text-[24px] sm:text-[34px] lg:text-[43px] leading-[1.3] font-semibold text-cream"
              >
                {offer}
              </h3>
            ))}
          </div>
        </div>
        </div>

      </div>
    </section>
  );
}
