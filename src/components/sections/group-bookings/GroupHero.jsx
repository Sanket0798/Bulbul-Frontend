import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function GroupHero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(headingRef.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1, delay: 0.3 })
        .fromTo(descRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen overflow-hidden flex items-end">

      {/* Background image */}
      <img
        src="/images/shared/interior/busy-restaurant-aerial-wide.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Content */}
      <div className="relative z-10 w-full pb-20 sm:pb-28 lg:pb-[160px] px-5 sm:px-8 lg:px-[59px]">
        <div className="max-w-[640px]">

          <h1 ref={headingRef} className="font-freight text-[#FEFBF8] font-black text-[32px] sm:text-[42px] lg:text-[54px] leading-[1]">
            For when the table{" "}
            <span className="block">
              gets a <span className="italic font-medium text-gold">little bigger</span>
            </span>
          </h1>

          <p ref={descRef} className="font-freight font-normal text-sm leading-[20px] mt-5 max-w-[490px]" style={{ color: 'rgb(239, 211, 182)' }}>
            Whether it's a celebration, a team dinner, or simply a night to gather everyone together, we'll make sure the table is set, the food keeps coming, and everything flows as it should.
          </p>
        </div>
      </div>
    </section>
  );
}
