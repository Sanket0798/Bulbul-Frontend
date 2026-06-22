import { useEffect, useRef } from "react";
import { gsap, SplitText, afterFonts, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";
import ArrowIcon from "@/components/common/ArrowIcon";

export default function CareersHero() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => afterFonts(sectionRef, () => {
        // The headline is a quote — reveal it word by word for a spoken cadence.
        const heading = SplitText.create(headingRef.current, {
          type: "lines,words", mask: "lines",
        });
        const desc = SplitText.create(descRef.current, {
          type: "lines", mask: "lines",
        });

        gsap.from(mediaRef.current, { scale: 1.2, duration: 2.6, ease: "power2.out" });

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(heading.words, {
            yPercent: 110, opacity: 0, duration: 0.8, stagger: 0.04,
          }, 0.4)
          .from(desc.lines, {
            yPercent: 110, opacity: 0, duration: 0.7, stagger: 0.1,
          }, 0.9)
          .from(ctaRef.current, {
            autoAlpha: 0, scale: 0.8, y: 20, duration: 0.7, ease: "back.out(1.6)",
          }, 1.1);

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
        gsap.set([headingRef.current, descRef.current, ctaRef.current, mediaRef.current], {
          autoAlpha: 1, clearProps: "transform",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden flex items-end min-h-screen bg-charcoal">
      <div ref={mediaRef} className="absolute inset-[-8%] will-change-transform">
        <img src="/images/shared/people/friends-pizza-bright.png" alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-45" />
      </div>
      <div className="absolute inset-0 overlay-hero-left" />
      <div className="absolute inset-0 overlay-hero-bottom" />

      <div className="relative z-10 w-full max-w-container mx-auto px-5 sm:px-8 lg:px-0 pb-24 pt-[120px]">
        <div className="max-w-[600px]">
          <h1 ref={headingRef} className="font-freight text-h1 text-cream font-normal italic mb-6">
            "The best experiences are created by people who love what they do."
          </h1>
          <p ref={descRef} className="font-josefin text-body-sm text-cream/75 mb-10 max-w-[520px]">
            If you're calm in a storm and fun after it - Send in your application below.
          </p>
          <div className="flex flex-wrap gap-4">
            <a ref={ctaRef} href="#apply"
              className="inline-flex items-center gap-1 font-semibold leading-[25px] self-start px-8 py-[9px] bg-primary text-cream font-freight text-lg transition-all duration-300 hover:bg-rust-dark rounded">
              Apply Now <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
