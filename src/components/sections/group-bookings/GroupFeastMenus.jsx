import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";
import arrowRust from "@/assets/icons/svg/right-arrow-rust.svg";

gsap.registerPlugin(ScrollTrigger);

export default function GroupFeastMenus() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imagesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.children,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        imagesRef.current.children,
        { autoAlpha: 0, scale: 0.95 },
        {
          autoAlpha: 1, scale: 1, stagger: 0.15, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: imagesRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full pt-12 sm:pt-16 lg:pt-[81px] pb-10 lg:pb-[61px]">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-[99px]">

          {/* Left — Text content */}
          <div ref={textRef} className="flex flex-col w-full lg:max-w-[458px] justify-center">
            <span className="font-freight uppercase font-black text-[15px] leading-[16px] tracking-widest text-terracotta block mb-3">
              Crowd-Pleasing Plates to Share
            </span>

            <h2 className="font-freight text-[32px] sm:text-[38px] lg:text-[44px] leading-[1.1] font-black text-rust mb-[18px]">
              Group Feast{" "}
              <span className="italic font-normal text-gold">Menus</span>
            </h2>

            <p className="font-freight font-semibold text-base sm:text-lg leading-[22px] text-terracotta mb-7">
              Finest snacks, grills, ruby murrays, fragrant biryanis, naans, rotis and sweet puddings. Delicious and copious dishes that laden tables with café favourites to share at breakfast, lunch and dinner. Choose from Non-Veg., Veg. or Vegan menus upon arrival, whichever combination you please (no need to order ahead). All appetites will be pleased and leave most sated. Thirsty lips – chai and tipples are happily at hand.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/rooms"
                className="inline-flex items-center gap-1 font-semibold leading-[22px] px-6 sm:px-8 py-[10px] bg-primary text-cream font-freight text-[16px] transition-all duration-300 hover:bg-rust-dark rounded"
              >
                View Menu <img src={arrowRight} alt="" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 font-semibold leading-[22px] px-6 sm:px-8 py-[10px] border border-rust text-rust font-freight text-[16px] transition-all duration-300 hover:bg-rust hover:text-cream rounded"
              >
                Make an enquiry <img src={arrowRust} alt="" />
              </Link>
            </div>
          </div>

          {/* Right — Image grid */}
          <div ref={imagesRef} className="w-full lg:flex-1 flex flex-col gap-4">
            {/* Large top image spanning full width */}
            <div className="w-full overflow-hidden rounded-sm">
              <img
                src="/images/shared/team/full-team-group-garden.png"
                alt="Indian feast spread"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Bottom row */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Bottom left */}
              <div className="w-full sm:w-1/2 h-[200px] sm:h-[226px] overflow-hidden rounded-sm">
                <img
                  src="/images/shared/food/lamb-kadai.png"
                  alt="Lamb kadai"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom right */}
              <div className="w-full sm:w-1/2 h-[200px] sm:h-[226px] overflow-hidden rounded-sm">
                <img
                  src="/images/shared/food/indian-home-spread.png"
                  alt="Sesame ribs"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
