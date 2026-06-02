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
    <section ref={sectionRef} className="w-full pt-[61px] pb-[35px]">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="relative flex flex-col lg:flex-row items-center lg:items-stretch">

          {/* Left — Large image */}
          <div
            ref={imageRef}
            className="w-[668px] overflow-hidden rounded-sm shrink-0"
          >
            <img
              src="/images/shared/people/friends-cocktails-dark-bar.png"
              alt="Friends enjoying food"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right — Bordered text card overlapping the image */}
          <div
            ref={cardRef}
            className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-[889px] h-[342px] mt-[-40px] lg:mt-0 z-10"
          >
            <div className="border-[6px] border-rust bg-bg px-[30px] py-[52px]">
              <span className="font-freight uppercase font-black text-[15px] leading-[18px] tracking-widest text-terracotta block mb-3">
                Much to Enjoy, Little to Do
              </span>

              <h2 className="font-freight text-[44px] leading-[49px] font-black text-rust mb-4">
                Party heartily,{" "}
                <span className="italic font-normal text-gold">fuss-free</span>
              </h2>

              <p className="font-freight font-semibold text-[17px] leading-[25px] text-terracotta mb-[18px]">
                Finest snacks, grills, ruby murrays, fragrant biryanis, naans, rotis and sweet puddings. Delicious and copious dishes that laden tables with café favourites to share at breakfast, lunch and dinner. Choose from Non-Veg., Veg. or Vegan menus upon arrival, whichever combination you please (no need to order ahead). All appetites will be pleased and leave most sated. Thirsty lips – chai and tipples are happily at hand.
              </p>

              <Link
                to="/rooms"
                className="inline-flex items-center gap-1 font-semibold leading-[22px] px-8 py-[10px] bg-primary text-cream font-freight text-[16px] transition-all duration-300 hover:bg-rust-dark rounded"
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
