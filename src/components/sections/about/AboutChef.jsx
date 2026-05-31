import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "@/components/common/SectionTag";

gsap.registerPlugin(ScrollTrigger);

const TEAM_AVATARS = ["john", "kate", "evan", "daisy"];

export default function AboutChef() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        opacity: 0, x: -60, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(textRef.current.children, {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 bg-rust/5">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

          {/* Chef image */}
          <div ref={imageRef} className="relative shrink-0 w-full lg:w-[650px] h-[560px]">
            <div className="w-full h-full overflow-hidden rounded-sm">
              <img src="/images/bg/moment.webp" alt="Head Chef Paul Jonas"
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-6 left-6 px-5 py-4 rounded-sm bg-charcoal/90 border border-accent-gold/20">
              <p className="font-freight text-body-lg text-cream">Paul Jonas</p>
              <p className="font-josefin text-caption uppercase tracking-widest text-accent-gold mt-1">
                Head Chef
              </p>
            </div>
          </div>

          {/* Chef text */}
          <div ref={textRef} className="flex flex-col gap-6 flex-1">
            <SectionTag label="Chef Experience" />
            <h2 className="font-freight text-h2 font-normal">
              <span className="text-rust">Passion Behind </span>
              <span className="italic text-accent-gold">Every Plate</span>
            </h2>
            <p className="font-josefin text-body-sm text-rust/85">
              Our culinary team combines creativity, craftsmanship, and authentic
              ingredients to deliver dishes that celebrate flavor, culture, and the
              joy of sharing great food.
            </p>

            <hr className="border-rust/20 my-2" />

            <blockquote className="font-freight italic text-h4 text-charcoal">
              "Great food is not just tasted — it is remembered."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-accent-gold" />
              <span className="font-josefin text-caption uppercase tracking-widest text-accent-gold">
                Paul Jonas, Head Chef
              </span>
            </div>

            {/* Team avatars */}
            <div className="flex items-center mt-4">
              {TEAM_AVATARS.map((name, n) => (
                <div key={name}
                  className={`w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-bg-inner ${n > 0 ? "-ml-3" : ""}`}>
                  <img src={`/images/contact/${name}.webp`} alt={name}
                    className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="-ml-3 w-[52px] h-[52px] rounded-full flex items-center justify-center border-2 border-accent-gold bg-accent-gold/10">
                <span className="font-josefin text-caption text-accent-gold">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
