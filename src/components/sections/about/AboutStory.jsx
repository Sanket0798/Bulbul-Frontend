import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "15+", label: "Signature Dishes" },
  { value: "50K+", label: "Happy Guests" },
  { value: "10+", label: "Years Experience" },
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
    <section ref={sectionRef} className="w-full py-24 overflow-hidden bg-rust/5">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* Large image */}
          <div ref={imageRef} className="relative shrink-0 w-full lg:w-[610px] h-[560px] overflow-hidden rounded-sm">
            <img src="/images/bg/aboutbg.webp" alt="Bulbul interior"
              className="w-full h-full object-cover" />
          </div>

          {/* Text + stats */}
          <div ref={textRef} className="flex flex-col gap-8 flex-1">
            <SectionTag label="Our Story" />
            <h2 className="font-freight text-h2 font-normal">
              <span className="text-rust">Crafted with Flavor, </span>
              <span className="italic text-accent-gold">Served with Heart</span>
            </h2>
            <p className="font-josefin text-body-sm text-rust/85">
              Bulbul started with a simple thought. Indian food is far broader, more
              regional, and more nuanced than the handful of dishes it is often reduced
              to. Cooking styles change every few hundred kilometres, sometimes every
              few streets. It is shaped as much by homes and everyday cooking as it is
              by tradition.
            </p>

            {/* Stats */}
            <div className="flex flex-col gap-0 mt-2">
              {STATS.map(({ value, label }) => (
                <div key={label}
                  className="flex items-center gap-5 border-b border-rust/15 pb-4 mb-4 last:border-0 last:mb-0">
                  <div className="shrink-0 w-[72px] h-[72px] flex items-center justify-center rounded-sm border border-rust/30 bg-rust/5">
                    <span className="font-freight text-h4 text-rust">{value}</span>
                  </div>
                  <span className="font-josefin text-label uppercase tracking-widest text-rust/70">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <Link to="/rooms" className="btn-outline-primary-inner inline-flex items-center gap-3 self-start">
              Explore <ArrowIcon className="stroke-rust" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
