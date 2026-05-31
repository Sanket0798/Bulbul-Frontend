import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "@/components/common/SectionTag";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  "/images/gallery/gallery1.webp",
  "/images/gallery/gallery2.webp",
  "/images/gallery/gallery3.webp",
  "/images/gallery/gallery4.webp",
  "/images/gallery/gallery5.webp",
  "/images/gallery/gallery6.webp",
];

export default function AboutGallery() {
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current.children, {
        opacity: 0, scale: 0.9, stagger: 0.08, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-24 bg-charcoal/95">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
          <div className="flex flex-col gap-4">
            <SectionTag label="Team Experience" light />
            <h2 className="font-freight text-h2 text-cream font-normal">
              Moments Behind <span className="italic text-accent-gold">the Scenes</span>
            </h2>
          </div>
          <blockquote className="font-freight italic text-body-lg text-cream/50 max-w-[500px] text-right">
            "The best experiences are created by people who love what they do."
          </blockquote>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((src, i) => (
            <div key={i}
              className={`group relative overflow-hidden rounded-sm
                ${i === 0 || i === 3 ? "h-[480px]" : "h-[230px]"}`}>
              <img src={src} alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-rust/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
