import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, splitLines, afterFonts, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

export default function ContactCTA() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => afterFonts(sectionRef, () => {
        // Background parallax drift
        gsap.fromTo(mediaRef.current,
          { yPercent: -8 },
          {
            yPercent: 8, ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );

        // Heading — line-masked reveal
        const heading = splitLines(headingRef.current);
        gsap.from(heading.lines, {
          yPercent: 120, duration: 1, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        });

        // Divider / copy / CTA stagger up (heading excluded)
        const rest = gsap.utils.toArray(contentRef.current.children).filter((c) => c !== headingRef.current);
        gsap.fromTo(rest,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out", delay: 0.2,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          }
        );

        return () => heading.revert();
      }));

      mm.add(REDUCED_MOTION, () => {
        gsap.set([contentRef.current.children, mediaRef.current], { autoAlpha: 1, clearProps: "transform" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 overflow-hidden"
    >
      {/* Background image — oversized for parallax */}
      <div ref={mediaRef} className="absolute inset-[-8%] will-change-transform">
        <img
          src="/images/shared/interior/busy-restaurant-aerial.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-charcoal/70" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-container mx-auto px-5 sm:px-8 lg:px-15 flex flex-col items-center text-center"
      >
        <h2 ref={headingRef} className="font-freight text-h2 text-cream font-black">
          Reserve Your Table Today
        </h2>

        <div className="flex items-center gap-3 my-4">
          <hr className="w-12 border-accent-gold opacity-100" />
          <span className="font-josefin text-caption uppercase tracking-[0.18em] text-accent-gold">
            Experience Fine Dining
          </span>
          <hr className="w-12 border-accent-gold opacity-100" />
        </div>

        <p className="font-freight text-lg text-cream/80 max-w-[600px] mt-2">
          Whether it's an intimate dinner for two or a celebration with friends
          and family, we have the perfect setting for your next meal.
        </p>

        <Link
          to="/group-bookings"
          className="inline-flex items-center justify-center gap-2 font-semibold leading-[25px] px-8 py-[10px] bg-primary text-cream font-freight text-[16px] sm:text-[17px] transition-all duration-300 hover:bg-rust-dark rounded cursor-pointer mt-8"
        >
          Make a Reservation <img src={arrowRight} alt="" />
        </Link>
      </div>
    </section>
  );
}
