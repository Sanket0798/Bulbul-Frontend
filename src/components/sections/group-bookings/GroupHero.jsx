import { useEffect, useRef } from "react";
import { gsap, SplitText, afterFonts, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";

export default function GroupHero() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => afterFonts(sectionRef, () => {
        const heading = SplitText.create(headingRef.current, {
          type: "lines,chars", mask: "lines",
        });
        const desc = SplitText.create(descRef.current, {
          type: "lines,words", mask: "lines",
        });

        gsap.from(mediaRef.current, { scale: 1.2, duration: 2.4, ease: "power2.out" });

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(heading.chars, {
            yPercent: 120, rotateX: -90, opacity: 0,
            duration: 0.9, stagger: 0.015, ease: "back.out(1.4)",
          }, 0.4)
          .from(desc.words, {
            yPercent: 110, opacity: 0, duration: 0.6, stagger: 0.015,
          }, 0.9);

        gsap.fromTo(mediaRef.current,
          { yPercent: -6 },
          {
            yPercent: 8, ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
          }
        );

        return () => { heading.revert(); desc.revert(); };
      }));

      mm.add(REDUCED_MOTION, () => {
        gsap.set([headingRef.current, descRef.current, mediaRef.current], { autoAlpha: 1, clearProps: "transform" });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen overflow-hidden flex items-end">

      {/* Background image — oversized for parallax */}
      <div ref={mediaRef} className="absolute inset-[-8%] will-change-transform">
        <img
          src="/images/shared/interior/busy-restaurant-aerial-wide.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

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
