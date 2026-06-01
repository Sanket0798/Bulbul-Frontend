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
    <section ref={sectionRef} className="w-full pt-[81px] pb-[61px]">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Left — Text content */}
          <div ref={textRef} className="flex flex-col flex-1 lg:max-w-[440px] justify-center">
            <span className="font-freight uppercase font-black text-[13px] sm:text-[14px] leading-[18px] tracking-widest text-terracotta block mb-3">
              Crowd-Pleasing Plates to Share
            </span>

            <h2 className="font-freight text-[36px] sm:text-[48px] lg:text-[56px] leading-[42px] sm:leading-[54px] lg:leading-[62px] font-black text-rust-dark mb-5">
              Group Feast{" "}
              <span className="italic font-normal text-gold">Menus</span>
            </h2>

            <p className="font-freight font-semibold text-[15px] sm:text-[17px] lg:text-[18px] leading-[22px] sm:leading-[25px] text-terracotta mb-8">
              Finest snacks, grills, ruby murrays, fragrant biryanis, naans, rotis and sweet puddings. Delicious and copious dishes that laden tables with café favourites to share at breakfast, lunch and dinner. Choose from Non-Veg., Veg. or Vegan menus upon arrival, whichever combination you please (no need to order ahead). All appetites will be pleased and leave most sated. Thirsty lips – chai and tipples are happily at hand.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/rooms"
                className="inline-flex items-center gap-1 font-semibold leading-[25px] px-6 py-[9px] bg-primary text-cream font-freight text-[16px] sm:text-[17px] transition-all duration-300 hover:bg-rust-dark rounded"
              >
                View Menu <img src={arrowRight} alt="" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 font-semibold leading-[25px] px-6 py-[9px] border border-rust text-rust font-freight text-[16px] sm:text-[17px] transition-all duration-300 hover:bg-rust hover:text-cream rounded"
              >
                Make an enquiry <img src={arrowRust} alt="" />
              </Link>
            </div>
          </div>

          {/* Right — Image grid */}
          <div ref={imagesRef} className="flex-1 grid grid-cols-2 gap-3 sm:gap-4">
            {/* Large top image spanning both columns */}
            <div className="col-span-2 h-[220px] sm:h-[280px] lg:h-[340px] overflow-hidden rounded-sm">
              <img
                src="/images/shared/food/indian-home-spread.png"
                alt="Indian feast spread"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom left */}
            <div className="h-[160px] sm:h-[200px] lg:h-[240px] overflow-hidden rounded-sm">
              <img
                src="/images/shared/food/lamb-kadai.png"
                alt="Lamb kadai"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom right */}
            <div className="h-[160px] sm:h-[200px] lg:h-[240px] overflow-hidden rounded-sm">
              <img
                src="/images/shared/food/sesame-ribs-potatoes.png"
                alt="Sesame ribs"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
