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
    <section ref={sectionRef} className="w-full py-[60px] lg:py-[100px] bg-bg-inner">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {HIGHLIGHTS.map(({ img, title, desc }) => (
            <div key={title} className="group relative overflow-hidden rounded-sm">
              {/* Image */}
              <div className="w-full h-[400px] sm:h-[450px] lg:h-[520px] overflow-hidden">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-[140px] bg-gradient-to-t from-black/70 to-transparent" />

              {/* Text content */}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-6">
                <h3 className="font-freight text-[22px] sm:text-[24px] leading-[30px] font-black text-cream mb-1">
                  {title}
                </h3>
                <p className="font-freight-text text-[14px] sm:text-[15px] leading-[20px] text-cream/80 italic font-medium">
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
