import { useState } from "react";
import brandLogo from "@/assets/icons/svg/brand-white-logo.svg";
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

  const prev = () => setCurrent((c) => (c === 0 ? SLIDES.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === SLIDES.length - 1 ? 0 : c + 1));

  const slide = SLIDES[current];

  return (
    <section className="relative w-full h-[560px] lg:h-[722px] overflow-hidden">

      {/* Background image */}
      <img
        src={slide.bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-charcoal/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center max-w-full mx-[60px] px-5 sm:px-8 lg:px-0">
        <div className="max-w-[671px]">
          {/* Logo */}
          {/* <img src={brandLogo} alt="Bulbul" className="w-[180px] mb-6" /> */}
          <img src="/images/brand/logo/bulbul-text-white.png" alt="Bulbul Restaurant"
            className="w-[380px] object-contain mb-[15px]" />

          {/* Heading */}
          <h2 className="font-freight text-[73px] leading-[85px] font-semibold text-cream mb-6">
            {slide.heading}
          </h2>

          {/* Description */}
          <p className="font-freight-text font-light text-2xl leading-8 text-white">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-5 top-[660px] -translate-y-1/2 z-20 w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-cream transition-colors duration-300"
        aria-label="Previous slide"
      >
        <img src={arrowRust} alt="" className="w-5 h-5 rotate-180" />
      </button>

      <button
        onClick={next}
        className="absolute right-5 top-[660px] -translate-y-1/2 z-20 w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-cream transition-colors duration-300"
        aria-label="Next slide"
      >
        <img src={arrowRust} alt="" className="w-5 h-5" />
      </button>
    </section>
  );
}
