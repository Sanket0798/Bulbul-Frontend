import { useEffect, useRef } from "react";
import { gsap, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";

const MENU_CARDS = [
  {
    title: "Food",
    image: "/images/cuisines/food.svg",
    pdf: "/pdf/dummy-pdf.pdf",
  },
  {
    title: "Drinks",
    image: "/images/cuisines/drinks.svg",
    pdf: "/pdf/dummy-pdf.pdf",
  },
  {
    title: "Wine",
    image: "/images/cuisines/wine.svg",
    pdf: "/pdf/dummy-pdf.pdf",
  },
];

export default function Menu() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Heading — clip-path wipe + blur
        tl.fromTo(headingRef.current,
          { clipPath: "inset(0 0 100% 0)", opacity: 0, filter: "blur(6px)" },
          { clipPath: "inset(0 0 0% 0)", opacity: 1, filter: "blur(0px)", duration: 1.2 },
          0.3
        )
        // Description fade in
        .fromTo(descRef.current,
          { opacity: 0, y: 20, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
          0.7
        );

        // Cards — staggered clip-path reveal from bottom
        gsap.fromTo(cardsRef.current.children,
          { clipPath: "inset(100% 0 0 0)", opacity: 0 },
          {
            clipPath: "inset(0% 0 0 0)", opacity: 1,
            stagger: 0.2, duration: 1.1, ease: "power4.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            },
          }
        );
      });

      mm.add(REDUCED_MOTION, () => {
        gsap.set(
          [headingRef.current, descRef.current, ...cardsRef.current.children],
          { autoAlpha: 1, clearProps: "transform,filter,clipPath" }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative min-h-screen">
      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/images/bg/3rd banner image.svg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-[60px] pt-[140px] sm:pt-[160px] pb-16 sm:pb-24">

        {/* Header */}
        <div className="text-left mb-12 sm:mb-16 lg:mb-20">
          <h1
            ref={headingRef}
            className="font-freight text-cream font-black text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.1] mb-4"
          >
            Our <span className="italic font-medium text-accent-gold">Menu</span>
          </h1>
          <p
            ref={descRef}
            className="font-freight font-medium text-[16px] sm:text-[18px] leading-[1.6] text-cream/80 max-w-[560px]"
          >
            Micro regional Indian cuisine and Indian ingredient forward cocktails — built around small plates so you can try more, share across the table, and come back to the things you like.
          </p>
        </div>

        {/* Menu cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {MENU_CARDS.map(({ title, image, pdf }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-lg h-[380px] sm:h-[440px] lg:h-[500px] cursor-pointer"
            >
              {/* Card background image */}
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

              {/* Card content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 sm:pb-12 px-5">
                <h3 className="font-freight text-[28px] sm:text-[34px] lg:text-[40px] font-semibold text-cream mb-4 transition-transform duration-500 group-hover:-translate-y-2">
                  {title}
                </h3>
                <a
                  href={pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-[10px] bg-primary text-cream font-freight font-semibold text-[16px] sm:text-[18px] rounded transition-all duration-300 hover:bg-rust-dark opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  View Menu
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
