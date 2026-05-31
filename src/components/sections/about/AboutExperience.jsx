import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEAM_AVATARS = [
  "/images/shared/team/chef-portrait-beard-apron.png",
  "/images/shared/team/young-chef-grill-tray.png",
  "/images/shared/team/buffet-service-chef.png",
  "/images/shared/team/kitchen-team-plating.png",
];

export default function AboutExperience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        leftColRef.current,
        { autoAlpha: 0, x: -50 },
        {
          autoAlpha: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: leftColRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        rightColRef.current,
        { autoAlpha: 0, x: 50 },
        {
          autoAlpha: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: rightColRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-[60px] lg:py-[100px] bg-bg">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">

        {/* Header row */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-20 mb-10 lg:mb-14">
          {/* Left — tag + heading */}
          <div className="max-w-[500px]">
            <span className="font-freight uppercase font-black text-[14px] sm:text-[16px] leading-[18px] tracking-widest text-terracotta block mb-3">
              Signature Experience
            </span>
            <h2 className="font-freight text-[36px] sm:text-[48px] lg:text-[56px] leading-[42px] sm:leading-[54px] lg:leading-[62px] font-black text-rust-dark">
              More Than Just{" "}
              <span className="italic font-normal text-gold block sm:inline">Dining</span>
            </h2>
          </div>

          {/* Right — description */}
          <p className="font-freight font-semibold text-[16px] sm:text-[18px] lg:text-[19px] leading-[22px] sm:leading-[25px] text-terracotta max-w-[540px]">
            The menu moves across regions, bringing together dishes, references, and recipes drawn from homes, street-side cooking, and everyday meals. It is presented in a way that feels lighter and more suited to how people like to eat today. It is built around small plates, so you can try more, share across the table, and come back to the things you like.
          </p>
        </div>

        {/* Two-column image + text layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

          {/* Left column — image + quote + avatars */}
          <div ref={leftColRef} className="flex flex-col flex-1">
            <div className="w-full h-[280px] sm:h-[340px] lg:h-[400px] overflow-hidden rounded-sm">
              <img
                src="/images/shared/food/appetizer-balls.png"
                alt="Signature appetizers"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quote text */}
            <p className="font-freight italic text-[20px] sm:text-[24px] lg:text-[28px] leading-[28px] sm:leading-[32px] lg:leading-[38px] text-terracotta mt-6 lg:mt-8 max-w-[480px]">
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
            <div className="w-full h-[350px] sm:h-[450px] lg:h-[560px] overflow-hidden rounded-sm">
              <img
                src="/images/shared/people/friends-cocktails-dark-bar.png"
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
