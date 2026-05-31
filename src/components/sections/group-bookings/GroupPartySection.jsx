import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "@/components/common/SectionTag";
import ArrowIcon from "@/components/common/ArrowIcon";

gsap.registerPlugin(ScrollTrigger);

export default function GroupPartySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-animate]").forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 bg-rust/5">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          <div className="flex flex-col gap-6 flex-1 max-w-[560px]" data-animate>
            <SectionTag label="Much to enjoy, little to do" />
            <h2 className="font-freight text-h2 font-normal">
              <span className="text-rust">Party Heartily, </span>
              <span className="italic text-accent-gold">Fuss-free</span>
            </h2>
            <p className="font-josefin text-body-sm text-rust/85">
              Finest snacks, grills, ruby murrays, fragrant biryanis, naans, rotis and
              sweet puddings. Choose from Non-Veg., Veg. or Vegan menus upon arrival,
              whichever combination you please — no need to order ahead. All appetites
              will be pleased and leave most sated.
            </p>
            <Link to="/rooms" className="btn-outline-primary-inner inline-flex items-center gap-3 self-start">
              View Menu <ArrowIcon className="stroke-rust" />
            </Link>
          </div>

          <div className="relative shrink-0 w-full lg:w-[620px] h-[480px]" data-animate>
            <div className="absolute top-0 left-0 w-[48%] h-[55%] overflow-hidden rounded-sm">
              <img src="/images/gallery/gallery5.webp" alt="Group dining"
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-[60%] h-[65%] overflow-hidden rounded-sm shadow-2xl">
              <img src="/images/gallery/gallery6.webp" alt="Group feast"
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-[10%] right-[5%] w-[55%] h-[55%] rounded-sm border-2 border-accent-gold/25 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
