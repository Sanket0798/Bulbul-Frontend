import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps a section with a parallax background image.
 * The background scrolls at a slower rate than the content,
 * creating a depth effect similar to casamon.it.
 */
export default function ParallaxBanner({ src, alt = "", children, overlay = false }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Parallax background image */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-[130%] object-cover will-change-transform pointer-events-none"
        style={{ top: "-15%" }}
      />
      {overlay && (
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      )}
      {/* Section content renders on top */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
