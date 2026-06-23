import { useEffect, useRef } from "react";
import { gsap, splitLines, afterFonts, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";

const TEAM_AVATARS = [
  "/images/shared/team/chef-portrait-beard-apron.png",
  "/images/shared/team/young-chef-grill-tray.png",
  "/images/shared/team/buffet-service-chef.png",
  "/images/shared/team/kitchen-team-plating.png",
];

export default function AboutExperience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headingRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => afterFonts(sectionRef, () => {
        // Heading — line-masked reveal; rest of header staggers in
        const heading = splitLines(headingRef.current);
        gsap.from(heading.lines, {
          yPercent: 120, duration: 1, stagger: 0.1, ease: "power4.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        });
        gsap.fromTo(
          [headerRef.current.querySelector("span"), headerRef.current.querySelector("p")],
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", delay: 0.15,
            scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
          }
        );

        // Columns slide in from opposite sides
        gsap.fromTo(leftColRef.current,
          { autoAlpha: 0, x: -50 },
          { autoAlpha: 1, x: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: leftColRef.current, start: "top 80%" } }
        );
        gsap.fromTo(rightColRef.current,
          { autoAlpha: 0, x: 50 },
          { autoAlpha: 1, x: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: rightColRef.current, start: "top 80%" } }
        );

        // Parallax scale on both feature photos
        gsap.utils.toArray([leftColRef.current.querySelector("img"), rightColRef.current.querySelector("img")])
          .forEach((img) => {
            gsap.fromTo(img, { scale: 1.15 }, {
              scale: 1, ease: "none",
              scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
            });
          });

        return () => heading.revert();
      }));

      mm.add(REDUCED_MOTION, () => {
        gsap.set([headerRef.current.children, leftColRef.current, rightColRef.current], {
          autoAlpha: 1, clearProps: "transform",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-10 lg:py-[61px]">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">

        {/* Header row */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-20 mb-10 lg:mb-14">
          {/* Left — tag + heading */}
          <div className="max-w-[500px]">
            <span className="font-freight uppercase font-black text-lg leading-[18px] text-terracotta mb-4">
              Founders
            </span>
            <h2 ref={headingRef} className="font-freight text-[36px] sm:text-[48px] lg:text-[63px] leading-[1.1] font-black text-rust">
              The People Behind{" "}
              <span className="italic font-normal text-gold block sm:inline">Bulbul</span>
            </h2>
          </div>

          {/* Right — description */}
          <p className="font-freight font-semibold text-[16px] sm:text-[17px] lg:text-[19px] leading-[22px] sm:leading-[24px] lg:leading-[25px] text-terracotta max-w-[689px]">
            Bulbul is founded by Chef Rohan D'Souza and restaurateur Twinkle Keswani. Between them, they have spent years opening and running restaurants across India, picking up ideas, habits, and a fairly strong point of view on how people like to eat. This is where it all comes together.
          </p>
        </div>

        {/* Two-column image layout — founders */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-[19px]">

          {/* Left column — founder 1 */}
          <div ref={leftColRef} className="flex flex-col flex-1 group">
            <div className="relative w-full h-[350px] sm:h-[500px] lg:h-[744px] overflow-hidden rounded-sm">
              <img
                src="/images/shared/people/founder-1.avif"
                alt="Rohan D'Souza — Head Chef"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay with quote */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5 sm:p-8">
                <p className="font-freight text-[15px] sm:text-[17px] leading-[1.5] text-cream/90 italic">
                  "Every dish we serve carries a memory — of a kitchen, a street corner, or a family table. We're here to bring those stories to life."
                </p>
              </div>
            </div>
            <div className="pt-4">
              <h4 className="font-freight text-[20px] sm:text-[30px] font-semibold text-rust-dark leading-tight">
                Rohan D'Souza
              </h4>
              <span className="font-freight text-[14px] sm:text-[20px] text-terracotta/70 font-medium tracking-wide">
                Head Chef
              </span>
            </div>
          </div>

          {/* Right column — founder 2 */}
          <div ref={rightColRef} className="flex flex-col flex-1 group">
            <div className="relative w-full h-[350px] sm:h-[500px] lg:h-[744px] overflow-hidden rounded-sm">
              <img
                src="/images/shared/people/founder-2.avif"
                alt="Twinkle Keswani — Restaurateur"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay with quote */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5 sm:p-8">
                <p className="font-freight text-[15px] sm:text-[17px] leading-[1.5] text-cream/90 italic">
                  "Great food and genuine warmth can turn a meal into something you carry with you long after."
                </p>
              </div>
            </div>
            <div className="pt-4">
              <h4 className="font-freight text-[20px] sm:text-[30px] font-semibold text-rust-dark leading-tight">
                Twinkle Keswani
              </h4>
              <span className="font-freight text-[14px] sm:text-[20px] text-terracotta/70 font-medium tracking-wide">
                Restaurateur
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
