import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrowRight from "@/assets/icons/svg/right-arrow-rust.svg";

gsap.registerPlugin(ScrollTrigger);

export default function AboutChef() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { autoAlpha: 0, x: -60 },
        {
          autoAlpha: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        rightRef.current.children,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-[60px] lg:py-[100px] bg-bg">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

          {/* Left — Chef portrait + polaroid */}
          <div ref={leftRef} className="relative shrink-0 w-full sm:w-[380px] lg:w-[440px]">
            {/* Main chef image */}
            <div className="w-full h-[400px] sm:h-[480px] lg:h-[560px] overflow-hidden rounded-sm">
              <img
                src="/images/shared/team/chef-portrait-beard-apron.png"
                alt="Paul Jonas — Head Chef"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Polaroid-style dish card */}
            <div className="absolute -bottom-6 left-4 sm:left-6 w-[160px] sm:w-[180px] bg-white p-2 shadow-xl -rotate-3">
              <div className="w-full h-[110px] sm:h-[120px] overflow-hidden">
                <img
                  src="/images/shared/food/lamb-kadai.png"
                  alt="Chef's signature dish"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-2 pb-1 px-1">
                <p className="font-freight italic text-[13px] sm:text-[14px] leading-[18px] text-rust-dark font-semibold">
                  Made by Paul Jonas
                </p>
                <p className="font-freight-text text-[11px] sm:text-[12px] leading-[16px] text-terracotta">
                  Head Chef
                </p>
              </div>
            </div>
          </div>

          {/* Right — Text content + plating image */}
          <div ref={rightRef} className="flex flex-col flex-1 pt-0 lg:pt-4">
            {/* Tag */}
            <span className="font-freight uppercase font-black text-[14px] sm:text-[16px] leading-[18px] tracking-widest text-terracotta block mb-3">
              Chef Experience
            </span>

            {/* Heading */}
            <h2 className="font-freight text-[36px] sm:text-[48px] lg:text-[56px] leading-[42px] sm:leading-[54px] lg:leading-[62px] font-black text-rust-dark mb-5">
              Passion Behind{" "}
              <span className="block">
                Every <span className="italic font-normal text-gold">Plate</span>
              </span>
            </h2>

            {/* Description */}
            <p className="font-freight font-semibold text-[16px] sm:text-[18px] lg:text-[19px] leading-[22px] sm:leading-[25px] text-terracotta max-w-[500px] mb-8">
              Our culinary team combines creativity, craftsmanship, and authentic ingredients to deliver dishes that celebrate flavor, culture, and the joy of sharing great food.
            </p>

            {/* Chef name + quote row */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8 mb-8">
              <div>
                <p className="font-freight text-[20px] sm:text-[22px] leading-[28px] text-rust-dark font-semibold">
                  Paul Jonas
                </p>
                <p className="font-freight-text text-[14px] sm:text-[15px] leading-[20px] text-terracotta">
                  Head Chef
                </p>
              </div>
              <p className="font-freight italic text-[16px] sm:text-[18px] leading-[22px] sm:leading-[24px] text-rust-dark/70 max-w-[280px]">
                "Great food is not just tasted — it is remembered."
              </p>
            </div>

            {/* Bottom image with Know More overlay */}
            <div className="relative w-full sm:w-[380px] lg:w-[420px] h-[180px] sm:h-[200px] lg:h-[220px] overflow-hidden rounded-sm group">
              <img
                src="/images/shared/food/chef-plating-flowers.png"
                alt="Chef plating a dish"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30" />
              {/* Know More link */}
              <Link
                to="/contact"
                className="absolute inset-0 flex items-center justify-center gap-2"
              >
                <span className="font-freight text-[22px] sm:text-[24px] leading-[30px] font-semibold text-cream">
                  Know More
                </span>
                <img src={arrowRight} alt="" className="w-5 h-5 brightness-0 invert" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
