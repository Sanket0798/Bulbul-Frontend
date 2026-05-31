import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    img: "/images/shared/team/two-men-kitchen-thumbsup.png",
    title: "Growth & Learning",
    desc: "Learn from experienced chefs and hospitality leaders.",
  },
  {
    img: "/images/shared/team/kitchen-team-plating.png",
    title: "Creative Environment",
    desc: "A culture driven by ideas, flavor, and innovation.",
  },
  {
    img: "/images/shared/team/business-people-three.png",
    title: "Supportive Team",
    desc: "Supportive Team",
  },
  {
    img: "/images/shared/team/buffet-service-chef.png",
    title: "Meaningful Hospitality",
    desc: "Create experiences guests remember forever.",
  },
];

export default function CareersWhyWork() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        cardsRef.current.children,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-[60px] lg:py-[100px] bg-bg">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">

        {/* Header */}
        <h2
          ref={headerRef}
          className="font-freight uppercase font-black text-[18px] sm:text-[22px] lg:text-[26px] leading-[24px] sm:leading-[30px] tracking-wide text-olive mb-8 lg:mb-12"
        >
          Why Work With Us
        </h2>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        >
          {REASONS.map(({ img, title, desc }) => (
            <div key={title} className="group relative overflow-hidden rounded-sm">
              {/* Image */}
              <div className="w-full h-[260px] sm:h-[300px] lg:h-[320px] overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-rust-dark/80 to-transparent" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-5">
                <h3 className="font-freight text-[20px] sm:text-[22px] leading-[26px] sm:leading-[28px] font-black text-cream mb-1">
                  {title}
                </h3>
                <p className="font-freight-text text-[13px] sm:text-[14px] leading-[18px] text-cream/80 italic font-medium">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
