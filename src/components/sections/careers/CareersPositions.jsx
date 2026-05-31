import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";
import arrowRust from "@/assets/icons/svg/right-arrow-rust.svg";

gsap.registerPlugin(ScrollTrigger);

const POSITIONS = [
  {
    img: "/images/shared/team/business-people-three.png",
    title: "Floor Manager",
    type: "Full-time",
    location: "Barcelona",
  },
  {
    img: "/images/shared/team/chef-portrait-beard-apron.png",
    title: "Head Chef",
    type: "Full-time",
    location: "Mumbai",
  },
  {
    img: "/images/shared/team/young-chef-grill-tray.png",
    title: "Sous Chef",
    type: "Full-time",
    location: "Delhi",
  },
  {
    img: "/images/shared/team/buffet-service-chef.png",
    title: "Bartender",
    type: "Part-time",
    location: "Goa",
  },
];

export default function CareersPositions() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);
  const [current, setCurrent] = useState(0);

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const animateSlide = useCallback(() => {
    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { autoAlpha: 0.6, scale: 0.98 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  const goTo = (direction) => {
    if (direction === "prev") {
      setCurrent((c) => (c === 0 ? POSITIONS.length - 1 : c - 1));
    } else {
      setCurrent((c) => (c === POSITIONS.length - 1 ? 0 : c + 1));
    }
    animateSlide();
  };

  const position = POSITIONS[current];

  return (
    <section ref={sectionRef} className="w-full py-[60px] lg:py-[100px] bg-bg">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">

        {/* Header row */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-20 mb-10 lg:mb-14">
          <div className="max-w-[400px]">
            <span className="font-freight uppercase font-black text-[13px] sm:text-[14px] leading-[18px] tracking-widest text-terracotta block mb-3">
              Open Positions
            </span>
            <h2 className="font-freight text-[36px] sm:text-[48px] lg:text-[56px] leading-[42px] sm:leading-[54px] lg:leading-[62px] font-black text-rust-dark">
              Current{" "}
              <span className="italic font-normal text-gold block">Opportunities</span>
            </h2>
          </div>

          <p className="font-freight font-semibold text-[15px] sm:text-[17px] lg:text-[18px] leading-[22px] sm:leading-[25px] text-terracotta max-w-[540px]">
            The menu moves across regions, bringing together dishes, references, and recipes drawn from homes, street-side cooking, and everyday meals. It is presented in a way that feels lighter and more suited to how people like to eat today. It is built around small plates, so you can try more, share across the table, and come back to the things you like.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="relative w-full h-[300px] sm:h-[380px] lg:h-[480px] overflow-hidden rounded-sm"
          >
            {/* Image */}
            <img
              src={position.img}
              alt={position.title}
              className="w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Position info */}
            <div className="absolute bottom-0 left-0 px-5 sm:px-8 pb-6 sm:pb-8">
              <h3 className="font-freight text-[28px] sm:text-[36px] lg:text-[42px] leading-[34px] sm:leading-[42px] lg:leading-[48px] font-black text-cream mb-2">
                {position.title}
              </h3>
              <p className="font-freight-text text-[14px] sm:text-[16px] leading-[20px] text-cream/90 font-medium mb-4">
                {position.type} <span className="text-accent-gold mx-1">•</span> {position.location}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 font-semibold leading-[22px] px-5 py-[7px] bg-primary text-cream font-freight text-[14px] sm:text-[15px] transition-all duration-300 hover:bg-rust-dark rounded"
              >
                Apply <img src={arrowRight} alt="" className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => goTo("prev")}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-cream transition-colors duration-300 shadow-md"
            aria-label="Previous position"
          >
            <img src={arrowRust} alt="" className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
          </button>

          <button
            onClick={() => goTo("next")}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-cream transition-colors duration-300 shadow-md"
            aria-label="Next position"
          >
            <img src={arrowRust} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
