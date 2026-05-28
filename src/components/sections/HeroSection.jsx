import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import brandLogo from "@/assets/icons/svg/brand-white-logo.svg";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const quoteRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(logoRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, delay: 0.3 })
        .fromTo(tagRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(headingRef.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 }, "-=0.3")
        .fromTo(quoteRef.current, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.8 }, "-=0.5")
        .fromTo(ctaRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden flex items-end min-h-screen">

      {/* Background image */}
      <img src="/images/pages/home/hero-banner.png" alt=""
        className="absolute inset-0 w-full h-full object-cover" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />



      {/* Content */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-[60px] pb-20 lg:pb-[67px]">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-20">

          {/* Left column — heading */}
          <div className="max-w-[630px]">
            <img ref={logoRef} src={brandLogo} alt="" className="w-24" />

            <span ref={tagRef} className="block font-freight text-base leading-[22px] uppercase font-black mt-1 tracking-widest text-accent-gold">
              Handcrafted Goodness
            </span>

            <h1 ref={headingRef} className="font-freight text-h1 text-cream font-black text-[63px] mt-1">
              Flavors That Stay with You{" "}
              <span className="italic font-medium text-accent-gold">Forever</span>
            </h1>
          </div>

          {/* Right column — quote + CTA */}
          <div className="max-w-[574px] flex flex-col gap-4">
            <p ref={quoteRef} className="font-freight font-semibold text-base leading-[25px] text-cream tracking-[1.42px]">
              "We've grown up with a version of Indian food shaped by homes and everyday cooking, the kind that rarely makes it onto restaurant menus. At Bulbul, that is what comes to the table, gathered along the way and shared with you."
            </p>
            <Link ref={ctaRef} to="/rooms"
              className="inline-flex items-center gap-1 font-semibold leading-[25px] self-start px-8 py-[9px] bg-primary text-cream font-freight text-[18px] transition-all duration-300 hover:bg-rust-dark rounded">
              View our Menu <img src={arrowRight} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
