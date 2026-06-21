import { forwardRef, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";
import aboutVector from "@/assets/icons/svg/About-vector.svg";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_CARDS = [
  { img: "/images/cuisines/food.svg", title: "Explore Menu", subtitle: "Elegant dishes preview", to: "/rooms" },
  { img: "/images/cuisines/drinks.svg", title: "Reservations", subtitle: "Reserve table instantly", to: "/contact" },
  { img: "/images/cuisines/wine.svg", title: "Online Ordering", subtitle: "Order your favorites", to: "/rooms" },
];

const ServicesSection = forwardRef(function ServicesSection(_, ref) {
  const headerLeftRef = useRef(null);
  const headerRightRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header left — slide in from left
      gsap.fromTo(headerLeftRef.current,
        { autoAlpha: 0, x: -60 },
        { autoAlpha: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headerLeftRef.current, start: "top 85%" } }
      );

      // Header right — slide in from right
      gsap.fromTo(headerRightRef.current,
        { autoAlpha: 0, x: 60 },
        { autoAlpha: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headerRightRef.current, start: "top 85%" } }
      );

      // Service cards — stagger up
      gsap.fromTo(cardsRef.current.children,
        { autoAlpha: 0, y: 60, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" } }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full pt-[50px] sm:pt-[79px] pb-[60px] sm:pb-[92px] bg-gradient-to-b from-transparent to-[#787C1D]/10">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-15">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-10 mb-16">
          <div ref={headerLeftRef} className="flex flex-col max-w-[510px]">
            <h2 className="font-freight text-[36px] sm:text-[48px] lg:text-[62px] leading-[44px] sm:leading-[58px] lg:leading-[73px] mb-6">
              <span className="text-rust-dark font-semibold">Micro Regional Indian Cuisine &amp;</span>
              <span className="italic font-normal text-gold"> Indian Ingredient Forward Cocktails</span>
            </h2>
            <Link to="/menu"
              className="inline-flex items-center gap-1 font-semibold leading-[25px] self-start px-8 py-[9px] bg-primary text-cream font-freight text-lg transition-all duration-300 hover:bg-rust-dark rounded">
              Menu <img src={arrowRight} alt="" />
            </Link>
          </div>

          <div ref={headerRightRef} className="flex flex-col max-w-[587px]">
            <p className="font-freight font-medium text-[16px] sm:text-[19px] leading-[22px] sm:leading-[25px] text-olive mb-8">
              The menu moves across regions, bringing together dishes, references, and recipes drawn from homes, street-side cooking, and everyday meals. It is presented in a way that feels lighter and more suited to how people like to eat today. It is built around small plates, so you can try more, share across the table, and come back to the things you like.
            </p>
            {/* <div className="flex flex-wrap gap-4 sm:gap-6 lg:flex-row lg:gap-11">
              {["Culinary Excellence", "Rich Cultural Flavors", "Inspired Global Cuisine"].map((tag) => (
                <div key={tag} className="flex items-center gap-2">
                  <img src={aboutVector} alt="" />
                  <span className="font-freight text-base leading-[25px] font-semibold text-gold">{tag}</span>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        {/* Service cards */}
        <div ref={cardsRef} className="max-w-[1311px] mx-auto flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap gap-6 sm:gap-4 lg:gap-0 sm:justify-center lg:justify-between">
          {SERVICE_CARDS.map(({ img, title, subtitle, to }) => (
            <Link key={title} to={to}
              className="group relative overflow-hidden block no-underline w-full sm:w-[48%] lg:w-[391px] h-[300px] sm:h-[380px] lg:h-[436px]">
              <img src={img} alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 overlay-card-bottom transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 px-[21px] py-[31px] flex flex-col gap-1">
                <span className="font-freight font-black text-[29px] leading-[39px] text-cream">{title}</span>
                <span className="font-freight-text italic text-body text-cream leading-[21px]">{subtitle}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ServicesSection;
