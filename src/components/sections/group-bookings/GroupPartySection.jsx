import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

gsap.registerPlugin(ScrollTrigger);

export default function GroupPartySection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0, x: -50 },
        {
          autoAlpha: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-[60px] lg:py-[100px] bg-bg">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch">

          {/* Left — Large image */}
          <div
            ref={imageRef}
            className="w-full lg:w-[55%] h-[320px] sm:h-[420px] lg:h-[560px] overflow-hidden rounded-sm shrink-0"
          >
            <img
              src="/images/shared/food/loaded-fries.png"
              alt="Friends enjoying food"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right — Bordered text card overlapping the image */}
          <div
            ref={cardRef}
            className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[52%] mt-[-40px] lg:mt-0 z-10"
          >
            <div className="border-2 border-rust/60 bg-bg p-6 sm:p-8 lg:p-10">
              <span className="font-freight uppercase font-black text-[13px] sm:text-[14px] leading-[18px] tracking-widest text-terracotta block mb-3">
                Much to Enjoy, Little to Do
              </span>

              <h2 className="font-freight text-[32px] sm:text-[42px] lg:text-[50px] leading-[38px] sm:leading-[48px] lg:leading-[56px] font-black text-rust-dark mb-5">
                Party heartily,{" "}
                <span className="italic font-normal text-gold">fuss-free</span>
              </h2>

              <p className="font-freight font-semibold text-[15px] sm:text-[16px] lg:text-[17px] leading-[22px] sm:leading-[24px] text-terracotta mb-6">
                Finest snacks, grills, ruby murrays, fragrant biryanis, naans, rotis and sweet puddings. Delicious and copious dishes that laden tables with café favourites to share at breakfast, lunch and dinner. Choose from Non-Veg., Veg. or Vegan menus upon arrival, whichever combination you please (no need to order ahead). All appetites will be pleased and leave most sated. Thirsty lips – chai and tipples are happily at hand.
              </p>

              <Link
                to="/rooms"
                className="inline-flex items-center gap-1 font-semibold leading-[25px] px-6 py-[9px] bg-primary text-cream font-freight text-[16px] sm:text-[17px] transition-all duration-300 hover:bg-rust-dark rounded"
              >
                View Menu <img src={arrowRight} alt="" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
