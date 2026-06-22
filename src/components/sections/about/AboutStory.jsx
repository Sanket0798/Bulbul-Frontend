import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, splitLines, afterFonts, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";
import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

import utensilsIcon from "@/assets/icons/svg/utensils.svg";
import maskIcon from "@/assets/icons/svg/mask.svg";
import progressIcon from "@/assets/icons/svg/progress.svg";

const STATS = [
  { icon: utensilsIcon, bold: "15+ Signature", italic: "Dishes" },
  { icon: maskIcon, bold: "50K+ Happy", italic: "Guests" },
  { icon: progressIcon, bold: "10+ Years", italic: "Experience" },
];

export default function AboutStory() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => afterFonts(sectionRef, () => {
        // Image — clip reveal + parallax on the inner photo
        gsap.fromTo(imageRef.current,
          { clipPath: "inset(0 0 0 100%)", autoAlpha: 0 },
          {
            clipPath: "inset(0 0 0 0%)", autoAlpha: 1, duration: 1.2, ease: "power4.inOut",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          }
        );
        gsap.fromTo(imageRef.current.querySelector("img"),
          { scale: 1.2 },
          {
            scale: 1, ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );

        // Heading — line-masked reveal
        const heading = splitLines(headingRef.current);
        gsap.from(heading.lines, {
          yPercent: 120, duration: 1, stagger: 0.12, ease: "power4.out",
          scrollTrigger: { trigger: textRef.current, start: "top 80%" },
        });

        // Remaining copy/stats/CTA — staggered slide-in (heading excluded)
        const rest = gsap.utils.toArray(textRef.current.children).filter((c) => c !== headingRef.current);
        gsap.from(rest, {
          opacity: 0, x: 50, stagger: 0.12, duration: 0.8, ease: "power3.out", delay: 0.15,
          scrollTrigger: { trigger: textRef.current, start: "top 80%" },
        });

        return () => heading.revert();
      }));

      mm.add(REDUCED_MOTION, () => {
        gsap.set([imageRef.current, textRef.current.children], { autoAlpha: 1, clearProps: "transform,clipPath" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full pt-14 sm:pt-16 lg:pt-[102px] pb-10 lg:pb-[61px] overflow-hidden">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-end gap-10 sm:gap-16 lg:gap-20">

          {/* Large image */}
          <div ref={imageRef} className="relative shrink-0 w-full lg:w-[611px] overflow-hidden rounded-sm">
            <img src="/images/shared/team/two-men-kitchen-thumbsup.png" alt="Bulbul interior"
              className="w-full h-full object-cover" />
          </div>

          {/* Text + stats */}
          <div ref={textRef} className="flex flex-col">
            <h2 className="font-freight uppercase font-black text-lg leading-[18px] mb-4">
              <span className="text-olive">Our Story</span>
            </h2>
            <h2 ref={headingRef} className="font-freight text-[36px] sm:text-[48px] lg:text-[63px] leading-[1.1] mb-5">
              <span className="text-rust-dark font-black">Crafted with Flavor, Served</span>
              <span className="italic font-normal text-gold"> with Heart</span>
            </h2>
            <p className="font-freight text-[16px] sm:text-[17px] lg:text-[19px] leading-[22px] sm:leading-[24px] lg:leading-[25px] text-terracotta font-semibold mb-6">
              Bulbul started with a simple thought. Indian food is far broader, more
              regional, and more nuanced than the handful of dishes it is often reduced
              to. Cooking styles change every few hundred kilometres, sometimes every
              few streets. It is shaped as much by homes and everyday cooking as it is
              by tradition.
            </p>

            {/* Stats */}
            <div className="flex flex-col gap-0 mb-8">
              {STATS.map(({ icon, bold, italic }) => (
                <div key={bold}
                  className="flex items-center gap-4 sm:gap-5 lg:gap-[29px] border-b border-rust/15 pb-4 mb-4 last:border-0 last:mb-0">
                  <div className="shrink-0 w-[56px] h-[56px] sm:w-[66px] sm:h-[66px] lg:w-[76px] lg:h-[76px] flex items-center justify-center rounded-full bg-[#C89B5E]/15">
                    <img src={icon} alt={bold} />
                  </div>
                  <span className="font-freight text-[20px] sm:text-[24px] lg:text-[29px] leading-[28px] sm:leading-[32px] lg:leading-[38px] text-terracotta">
                    <span className="font-semibold">{bold} </span>
                    <span className="italic font-normal">{italic}</span>
                  </span>
                </div>
              ))}
            </div>

            <Link to="/rooms"
              className="inline-flex items-center gap-1 font-semibold leading-[25px] self-start px-6 sm:px-8 lg:px-[44px] py-[10px] bg-primary text-cream font-freight text-lg transition-all duration-300 hover:bg-rust-dark rounded">
              Explore <img src={arrowRight} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
