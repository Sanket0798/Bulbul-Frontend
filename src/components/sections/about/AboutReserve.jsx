import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OFFERS = [
  "Buy 1 Get 1",
  "Candlelight Special",
  "Wine & Dine",
  "Midnight Cravings",
  "Chef's Special Combo",
];

export default function AboutReserve() {
  const sectionRef = useRef(null);
  const sideTextRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sideTextRef.current,
        { autoAlpha: 0, x: -30 },
        {
          autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        listRef.current.children,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: listRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] overflow-hidden">

      {/* Full-width background image */}
      <img
        src="/images/shared/interior/restaurant-wooden-lanterns.png"
        alt="Restaurant interior"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-charcoal/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex">

        {/* Left — vertical "Reserve Table Now" text with border */}
        <div
          ref={sideTextRef}
          className="hidden sm:flex items-center justify-center shrink-0 w-[60px] lg:w-[80px] border-r border-cream/30"
        >
          <Link
            to="/contact"
            className="font-freight text-[18px] sm:text-[20px] lg:text-[24px] font-semibold text-cream tracking-wide no-underline"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Reserve Table Now
          </Link>
        </div>

        {/* Center — offers list */}
        <div className="flex items-center px-6 sm:px-10 lg:px-16">
          <div ref={listRef} className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
            {OFFERS.map((offer) => (
              <h3
                key={offer}
                className="font-freight text-[24px] sm:text-[32px] lg:text-[40px] leading-[32px] sm:leading-[42px] lg:leading-[52px] font-semibold text-cream"
              >
                {offer}
              </h3>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
