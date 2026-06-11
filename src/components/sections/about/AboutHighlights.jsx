import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  {
    img: "/images/shared/food/indian-home-spread.png",
    title: "Farm Fresh Produce",
    desc: "Fresh ingredients carefully sourced for rich and authentic flavor.",
  },
  {
    img: "/images/shared/team/chef-making-pizza.png",
    title: "Chef-Crafted Recipes",
    desc: "Signature dishes inspired by tradition and culinary artistry.",
  },
  {
    img: "/images/shared/people/friends-pizza-bright.png",
    title: "Curated Dining Ambience",
    desc: "Elegant interiors and warm hospitality designed for memorable moments.",
  },
];

export default function AboutHighlights() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.children,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-10 lg:py-[61px]">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div
          ref={cardsRef}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-6 sm:gap-4"
        >
          {HIGHLIGHTS.map(({ img, title, desc }) => (
            <div key={title} className="relative group w-full sm:w-[48%] lg:w-[391px]">
              {/* Image */}
              <div className="w-full h-[400px] sm:h-[480px] lg:h-[568px] overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-[106px] bg-white/20 backdrop-blur-lg border-t border-white/40" />

              {/* Text content */}
              <div className="absolute inset-x-0 bottom-0 h-[106px] flex flex-col items-start justify-center px-5">
                <h3 className="font-freight font-black text-white text-2xl leading-[34px] mb-1">
                  {title}
                </h3>
                <p className="font-freight-text italic text-sm leading-[19px] text-white">
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
