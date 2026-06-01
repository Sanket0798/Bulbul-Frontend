import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

import utensilsIcon from "@/assets/icons/svg/utensils.svg";
import maskIcon from "@/assets/icons/svg/mask.svg";
import progressIcon from "@/assets/icons/svg/progress.svg";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { icon: utensilsIcon, bold: "15+ Signature", italic: "Dishes" },
  { icon: maskIcon, bold: "50K+ Happy", italic: "Guests" },
  { icon: progressIcon, bold: "10+ Years", italic: "Experience" },
];

export default function AboutStory() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        opacity: 0, x: -60, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(textRef.current.children, {
        opacity: 0, x: 50, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full pt-[102px] pb-[61px] overflow-hidden">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-end gap-16 lg:gap-20">

          {/* Large image */}
          <div ref={imageRef} className="relative shrink-0 w-full lg:w-[611px] overflow-hidden rounded-sm">
            <img src="/images/shared/team/two-men-kitchen-thumbsup.png" alt="Bulbul interior"
              className="w-full h-full object-cover" />
          </div>

          {/* Text + stats */}
          <div ref={textRef} className="flex flex-col">
            {/* <SectionTag label="Our Story" /> */}
            {/* <h2 className="font-freight text-h2 font-normal">
              <span className="text-rust">Crafted with Flavor, </span>
              <span className="italic text-accent-gold">Served with Heart</span>
            </h2>
 */}
            <h2 className="font-freight uppercase font-black text-lg leading-[18px] mb-4">
              <span className="text-olive">Our Story</span>
            </h2>
            <h2 className="font-freight text-[63px] leading-[70px] mb-5">
              <span className="text-rust-dark font-black">Crafted with Flavor, Served</span>
              <span className="italic font-normal text-gold"> with Heart</span>
            </h2>
            <p className="font-freight text-[19px] leading-[25px] text-terracotta font-semibold mb-6">
              Bulbul started with a simple thought. Indian food is far broader, more
              regional, and more nuanced than the handful of dishes it is often reduced
              to. Cooking styles change every few hundred kilometres, sometimes every
              few streets. It is shaped as much by homes and everyday cooking as it is
              by tradition.
            </p>

            {/* Stats */}
            <div className="flex flex-col gap-0 mb-8">
              {STATS.map(({ icon, bold, italic }) => (
                <div key={bold}
                  className="flex items-center gap-[29px] border-b border-rust/15 pb-4 mb-4 last:border-0 last:mb-0">
                  <div className="shrink-0 w-[76px] h-[76px] flex items-center justify-center rounded-full bg-[#C89B5E]/15">
                    <img src={icon} alt={bold} />
                  </div>
                  <span className="font-freight text-[29px] leading-[38px] text-terracotta">
                    <span className="font-semibold">{bold} </span>
                    <span className="italic font-normal">{italic}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* <Link to="/rooms" className="btn-outline-primary-inner inline-flex items-center gap-3 self-start">
              Explore <ArrowIcon className="stroke-rust" />
            </Link> */}
            <Link to="/rooms"
              className="inline-flex items-center gap-1 font-semibold leading-[25px] self-start px-[44px] py-[10px] bg-primary text-cream font-freight text-lg transition-all duration-300 hover:bg-rust-dark rounded">
              Explore <img src={arrowRight} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
