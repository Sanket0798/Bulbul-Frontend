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
              Signature Experience
            </span>
            <h2 ref={headingRef} className="font-freight text-[36px] sm:text-[48px] lg:text-[63px] leading-[1.1] font-black text-rust">
              More Than Just{" "}
              <span className="italic font-normal text-gold block sm:inline">Dining</span>
            </h2>
          </div>

          {/* Right — description */}
          <p className="font-freight font-semibold text-[16px] sm:text-[17px] lg:text-[19px] leading-[22px] sm:leading-[24px] lg:leading-[25px] text-terracotta max-w-[689px]">
            The menu moves across regions, bringing together dishes, references, and recipes drawn from homes, street-side cooking, and everyday meals. It is presented in a way that feels lighter and more suited to how people like to eat today. It is built around small plates, so you can try more, share across the table, and come back to the things you like.
          </p>
        </div>

        {/* Two-column image + text layout */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-[19px]">

          {/* Left column — image + quote + avatars */}
          <div ref={leftColRef} className="flex flex-col flex-1">
            <div className="w-full h-[250px] sm:h-[340px] lg:h-[428px] overflow-hidden rounded-sm">
              <img
                src="/images/shared/food/smoky-grilled-meat.png"
                alt="Signature appetizers"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quote text */}
            <p className="font-freight font-bold italic text-2xl sm:text-3xl lg:text-4xl leading-[34px] sm:leading-[40px] lg:leading-[48px] text-olive mt-5 lg:mt-[25px]">
              The bar takes a similar route, with cocktails that pick up on familiar flavours, pantry staples, and techniques you would recognise, reworked to sit easily alongside the food.
            </p>

            {/* Team avatars */}
            <div className="flex items-center mt-6">
              {TEAM_AVATARS.map((src, i) => (
                <div
                  key={i}
                  className={`w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] rounded-full overflow-hidden border-2 border-bg ${i > 0 ? "-ml-3" : ""}`}
                >
                  <img src={src} alt="Team member" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="-ml-3 w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center border-2 border-accent-gold bg-accent-gold/15">
                <span className="font-freight text-[16px] font-semibold text-accent-gold">+</span>
              </div>
            </div>
          </div>

          {/* Right column — larger image */}
          <div ref={rightColRef} className="flex-1">
            <div className="w-full h-[350px] sm:h-[500px] lg:h-[744px] overflow-hidden rounded-sm">
              <img
                src="/images/shared/food/sesame-ribs-potatoes.png"
                alt="Guests enjoying cocktails"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
