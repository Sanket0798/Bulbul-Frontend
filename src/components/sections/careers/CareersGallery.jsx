import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  "/images/shared/food/scotch-eggs-close.png",
  "/images/shared/people/friends-pizza-bright.png",
  "/images/shared/team/young-chef-grill-tray.png",
  "/images/shared/people/friends-rooftop-dining.png",
];

export default function CareersGallery() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const galleryRef = useRef(null);

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
        galleryRef.current.children,
        { autoAlpha: 0, y: 40, scale: 0.95 },
        {
          autoAlpha: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: galleryRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-[60px] lg:py-[100px] bg-bg">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-16 mb-10 lg:mb-14">
          <div>
            <span className="font-freight uppercase font-black text-[13px] sm:text-[14px] leading-[18px] tracking-widest text-terracotta block mb-3">
              Team Experience
            </span>
            <h2 className="font-freight text-[36px] sm:text-[48px] lg:text-[56px] leading-[42px] sm:leading-[54px] lg:leading-[62px] font-black text-rust-dark">
              Moments Behind the{" "}
              <span className="italic font-normal text-gold">Scenes</span>
            </h2>
          </div>

          <p className="font-freight italic font-semibold text-[18px] sm:text-[22px] lg:text-[26px] leading-[26px] sm:leading-[30px] lg:leading-[34px] text-rust-dark/70 max-w-[500px] lg:text-right">
            "The best experiences are created by people who love what they do."
          </p>
        </div>

        {/* Gallery grid — 4 columns */}
        <div
          ref={galleryRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-sm h-[220px] sm:h-[280px] lg:h-[360px]"
            >
              <img
                src={src}
                alt={`Team moment ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
