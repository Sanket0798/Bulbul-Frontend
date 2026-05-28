import { forwardRef, useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MENU_ITEMS = [
  { num: "01", name: "Crispy", highlight: "Wings", image: "/images/cuisines/crispy-wings.jpg" },
  { num: "02", name: "Butter", highlight: "Chicken", image: "/images/cuisines/butter-chicken.jpg" },
  { num: "03", name: "Grilled", highlight: "Steak", image: "/images/cuisines/Img3.jpg" },
  { num: "04", name: "Classic", highlight: "Slider", image: "/images/cuisines/Img4.jpg" },
  { num: "05", name: "Dragon", highlight: "Roll", image: "/images/cuisines/dragon-roll.jpg" },
];

const MenuSection = forwardRef(function MenuSection(_, ref) {
  const headerRef = useRef(null);
  const listRef = useRef(null);
  const leftImgRef = useRef(null);
  const rightImgRef = useRef(null);
  const circleRef = useRef(null);
  const leftImgInnerRef = useRef(null);
  const rightImgInnerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const animateImageSwap = useCallback((index) => {
    const item = MENU_ITEMS[index];
    const nextItem = MENU_ITEMS[(index + 1) % MENU_ITEMS.length];

    // Left image swap animation
    const tlLeft = gsap.timeline();
    tlLeft
      .to(leftImgInnerRef.current, {
        scale: 1.15,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
      .call(() => {
        if (leftImgInnerRef.current) {
          leftImgInnerRef.current.src = item.image;
        }
      })
      .to(leftImgInnerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      });

    // Right image swap animation
    const tlRight = gsap.timeline();
    tlRight
      .to(rightImgInnerRef.current, {
        scale: 0.85,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
      .call(() => {
        if (rightImgInnerRef.current) {
          rightImgInnerRef.current.src = nextItem.image;
        }
      })
      .to(rightImgInnerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
        delay: 0.05,
      });
  }, []);

  const handleItemClick = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    animateImageSwap(index);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade in
      gsap.fromTo(headerRef.current.children,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" } }
      );

      // Menu items stagger
      gsap.fromTo(listRef.current.children,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "back.out(1.4)",
          scrollTrigger: { trigger: listRef.current, start: "top 80%" } }
      );

      // Left image — slide in + rotate
      gsap.fromTo(leftImgRef.current,
        { autoAlpha: 0, x: -80, rotation: -15 },
        { autoAlpha: 1, x: 0, rotation: 8, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: leftImgRef.current, start: "top 85%" } }
      );

      // Right image — slide in + rotate
      gsap.fromTo(rightImgRef.current,
        { autoAlpha: 0, x: 80, rotation: 15 },
        { autoAlpha: 1, x: 0, rotation: -8, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: rightImgRef.current, start: "top 85%" } }
      );

      // Circle button — scale pop
      gsap.fromTo(circleRef.current,
        { autoAlpha: 0, scale: 0 },
        { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(2)",
          scrollTrigger: { trigger: circleRef.current, start: "top 85%" } }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full pt-[40px] pb-[100px]">
      <div className="max-w-[1207px] mx-auto px-5 sm:px-8 lg:px-0">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-10">
          <h3 className="font-freight font-black text-[22px] sm:text-[28px] leading-[30px] sm:leading-[37px] uppercase text-terracotta mb-2">
            Our Bestseller
          </h3>
          <h2 className="font-freight text-[32px] sm:text-[42px] lg:text-[54px] leading-[40px] sm:leading-[50px] lg:leading-[63px] font-semibold text-rust-dark mb-4">
            A Menu Crafted to Delight{" "}
            <span className="italic font-normal text-gold">Every Craving</span>
          </h2>
          <p className="font-freight-text font-medium text-[16px] sm:text-[19px] leading-[22px] sm:leading-[25px] text-terracotta max-w-[920px] mx-auto">
            From signature classics to chef-inspired specialties, every dish on our menu is prepared with fresh ingredients, rich flavors, and a passion for unforgettable dining experiences.
          </p>
        </div>

        {/* Content — images + menu list */}
        <div className="relative flex items-center justify-center">

          {/* Left image — tilted */}
          <div ref={leftImgRef} className="hidden lg:block absolute left-5 top-[195px] -translate-y-1/2 w-[353px] h-[353px] rotate-[8deg] overflow-hidden shadow-xl z-10">
            <img
              ref={leftImgInnerRef}
              src={MENU_ITEMS[0].image}
              alt="Featured dish"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center — menu list */}
          <div ref={listRef} className="flex flex-col items-center gap-1 py-4 z-20">
            {MENU_ITEMS.map(({ num, name, highlight }, index) => (
              <div
                key={num}
                onClick={() => handleItemClick(index)}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <h3 className={`font-freight text-[36px] sm:text-[48px] lg:text-[60px] leading-[50px] sm:leading-[65px] lg:leading-[85px] font-medium transition-colors duration-300 ${
                  activeIndex === index ? "text-gold" : "text-rust-dark group-hover:text-gold"
                }`}>
                  {name}{" "}
                  <span className={`italic transition-colors duration-300 ${
                    activeIndex === index ? "text-rust-dark" : "text-gold group-hover:text-rust-dark"
                  }`}>
                    {highlight}
                  </span>
                </h3>
                <span className="font-freight-text font-medium text-[14px] sm:text-[16px] lg:text-[19px] leading-[25px]">[{num}]</span>
              </div>
            ))}
          </div>

          {/* Right image — tilted */}
          <div ref={rightImgRef} className="hidden lg:block absolute right-7 top-[235px] -translate-y-1/2 w-[353px] h-[353px] -rotate-[8deg] overflow-hidden shadow-xl z-10">
            <img
              ref={rightImgInnerRef}
              src={MENU_ITEMS[1].image}
              alt="Featured dish"
              className="w-full h-full object-cover"
            />
          </div>

          {/* See Full Menu circle button */}
          <Link ref={circleRef} to="/rooms"
            className="hidden lg:flex absolute right-[60px] -top-[10px] w-[100px] h-[100px] rounded-full bg-rust items-center justify-center text-center z-30 hover:bg-rust-dark transition-colors duration-300">
            <span className="font-freight-text text-sm leading-[16px] text-cream font-semibold">
              See Full<br />Menu
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
});

export default MenuSection;
