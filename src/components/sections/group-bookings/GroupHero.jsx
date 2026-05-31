import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function GroupHero() {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(tagRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.3 })
        .fromTo(headingRef.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 }, "-=0.3")
        .fromTo(descRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden flex items-end min-h-screen">

      {/* Background image */}
      <img
        src="/images/shared/people/friends-rooftop-dining.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Content */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-[60px] pb-16 sm:pb-20 lg:pb-[80px]">
        <div className="max-w-[640px]">

          <span ref={tagRef} className="block font-freight text-base leading-[22px] uppercase font-black tracking-widest text-accent-gold">
            Our Menu
          </span>

          <h1 ref={headingRef} className="font-freight text-cream font-black text-[36px] sm:text-[48px] lg:text-[63px] leading-[44px] sm:leading-[56px] lg:leading-[70px] mt-4">
            For when the table{" "}
            <span className="block">
              gets a <span className="italic font-medium text-accent-gold">little bigger</span>
            </span>
          </h1>

          <p ref={descRef} className="font-freight font-semibold text-[14px] sm:text-[15px] lg:text-base leading-[22px] sm:leading-[25px] text-cream tracking-[1.42px] mt-5 max-w-[580px]">
            Whether it's a celebration, a team dinner, or simply a night to gather everyone together, we'll make sure the table is set, the food keeps coming, and everything flows as it should.
          </p>
        </div>
      </div>
    </section>
  );
}
