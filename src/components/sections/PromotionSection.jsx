import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap, SplitText, REDUCED_MOTION } from "@/utils/animations";
import arrowRust from "@/assets/icons/svg/right-arrow-rust.svg";

const SLIDES = [
  {
    bg: "/images/bg/Last Screen Banner 1-Group Bookings.png",
    heading: "More the merrier.",
    widget: "Group bookings",
    to: "/group-bookings",
  },
  {
    bg: "/images/bg/Last Screen Banner 2-Talent Pool.png",
    heading: "It'll be fun <s>they said</s>",
    headingHtml: true,
    widget: "Join our team",
    to: "/careers",
  },
  {
    bg: "/images/bg/Last Screen Banner 3-Coverage.png",
    heading: "Mom look!",
    widget: "Press releases",
    to: "/blogs",
  },
];

export default function PromotionSection() {
  const [current, setCurrent] = useState(0);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const ctaRef = useRef(null);
  const bgRef = useRef(null);
  const autoPlayRef = useRef(null);
  const splitRef = useRef(null);

  const animateSlide = useCallback(() => {
    const reduce = window.matchMedia(REDUCED_MOTION).matches;
    // SplitText must measure against loaded fonts; on a cold load the first
    // slide falls back to a plain fade until fonts are ready.
    const fontsReady = !document.fonts || document.fonts.status === "loaded";

    // Clean up the previous slide's word split before re-splitting.
    splitRef.current?.revert();
    splitRef.current = null;

    const tl = gsap.timeline();

    // Background — scale reveal (plain cross-fade when reduced motion)
    tl.fromTo(bgRef.current,
      { opacity: 0, scale: reduce ? 1 : 1.1 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.inOut" }
    );

    if (reduce || !fontsReady) {
      tl.fromTo(contentRef.current.children,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.6"
      );
      return;
    }

    // Heading — word-by-word reveal from behind a line mask.
    const split = SplitText.create(headingRef.current, { type: "lines,words", mask: "lines" });
    splitRef.current = split;

    tl.from(split.words,
      { yPercent: 110, opacity: 0, stagger: 0.04, duration: 0.8, ease: "power4.out" },
      "-=0.6"
    );
    if (ctaRef.current) {
      tl.from(ctaRef.current,
        { autoAlpha: 0, y: 24, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.4"
      );
    }
  }, []);

  useEffect(() => {
    animateSlide();
  }, [current, animateSlide]);

  // Revert any lingering split on unmount.
  useEffect(() => () => splitRef.current?.revert(), []);

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
          {/* <img src="/images/brand/logo/bulbul-text-white.png" alt="Bulbul Restaurant"
            className="w-[200px] sm:w-[280px] lg:w-[380px] object-contain mb-[15px]" /> */}

          {/* Heading */}
          {slide.headingHtml ? (
            <h2
              ref={headingRef}
              className="font-freight text-[36px] sm:text-[52px] lg:text-[73px] leading-[44px] sm:leading-[62px] lg:leading-[85px] font-semibold text-cream mb-4 sm:mb-6"
              dangerouslySetInnerHTML={{ __html: slide.heading }}
            />
          ) : (
            <h2 ref={headingRef} className="font-freight text-[36px] sm:text-[52px] lg:text-[73px] leading-[44px] sm:leading-[62px] lg:leading-[85px] font-semibold text-cream mb-4 sm:mb-6">
              {slide.heading}
            </h2>
          )}

          {/* Widget button */}
          <Link to={slide.to}
            className="inline-flex items-center gap-1 font-semibold leading-[25px] self-start px-8 py-[9px] bg-primary text-cream font-freight text-lg transition-all duration-300 hover:bg-rust-dark rounded uppercase tracking-wider">
            {slide.widget}
          </Link>
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
