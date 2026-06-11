import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import arrowRust from "@/assets/icons/svg/right-arrow-rust.svg";

const SLIDES = [
  {
    bg: "/images/shared/interior/restaurant-dark-chandeliers.png",
    heading: "More Than Just a Meal",
    description: "Discover a menu crafted to bring together rich ingredients, authentic recipes, and beautifully prepared dishes designed to turn every meal into a memorable experience.",
  },
  {
    bg: "/images/shared/interior/busy-restaurant-aerial-wide.png",
    heading: "A Place to Gather",
    description: "Whether it's a quiet dinner for two or a celebration with friends, Bulbul offers the warmth of home with the elegance of fine dining.",
  },
  {
    bg: "/images/shared/interior/restaurant-wooden-lanterns.png",
    heading: "Crafted with Passion",
    description: "Every dish tells a story — of regions, of homes, of flavours passed down through generations and reimagined for today.",
  },
];

export default function PromotionSection() {
  const [current, setCurrent] = useState(0);
  const contentRef = useRef(null);
  const bgRef = useRef(null);
  const autoPlayRef = useRef(null);

  const animateSlide = useCallback(() => {
    const tl = gsap.timeline();
    tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.inOut" });
    tl.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  useEffect(() => {
    animateSlide();
  }, [current, animateSlide]);

  // Auto-play every 5 seconds
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrent((c) => (c === SLIDES.length - 1 ? 0 : c + 1));
    }, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, []);

  const goTo = (direction) => {
    // Reset autoplay timer on manual navigation
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrent((c) => (c === SLIDES.length - 1 ? 0 : c + 1));
    }, 5000);

    if (direction === "prev") {
      setCurrent((c) => (c === 0 ? SLIDES.length - 1 : c - 1));
    } else {
      setCurrent((c) => (c === SLIDES.length - 1 ? 0 : c + 1));
    }
  };

  const slide = SLIDES[current];

  return (
    <section className="relative w-full h-[560px] lg:h-[722px] overflow-hidden">

      {/* Background image */}
      <img
        ref={bgRef}
        src={slide.bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-charcoal/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center max-w-full mx-5 sm:mx-8 lg:mx-[60px] px-0">
        <div ref={contentRef} className="max-w-[671px]">
          {/* Logo */}
          <img src="/images/brand/logo/bulbul-text-white.png" alt="Bulbul Restaurant"
            className="w-[200px] sm:w-[280px] lg:w-[380px] object-contain mb-[15px]" />

          {/* Heading */}
          <h2 className="font-freight text-[36px] sm:text-[52px] lg:text-[73px] leading-[44px] sm:leading-[62px] lg:leading-[85px] font-semibold text-cream mb-4 sm:mb-6">
            {slide.heading}
          </h2>

          {/* Description */}
          <p className="font-freight-text font-light text-base sm:text-xl lg:text-2xl leading-6 sm:leading-7 lg:leading-8 text-white">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => goTo("prev")}
        className="absolute left-5 bottom-12 sm:bottom-12 lg:bottom-16 z-20 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-cream transition-colors duration-300"
        aria-label="Previous slide"
      >
        <img src={arrowRust} alt="" className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
      </button>

      <button
        onClick={() => goTo("next")}
        className="absolute right-5 bottom-12 sm:bottom-12 lg:bottom-16 z-20 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-cream transition-colors duration-300"
        aria-label="Next slide"
      >
        <img src={arrowRust} alt="" className="w-5 h-5" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { clearInterval(autoPlayRef.current); setCurrent(i); }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? "bg-cream w-6" : "bg-cream/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
