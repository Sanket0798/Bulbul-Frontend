import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "@/components/common/SectionTag";

gsap.registerPlugin(ScrollTrigger);

const OPEN_POSITIONS = [
  { title: "Head Chef", dept: "Kitchen", type: "Full-time", location: "London" },
  { title: "Sous Chef", dept: "Kitchen", type: "Full-time", location: "London" },
  { title: "Front of House Manager", dept: "Operations", type: "Full-time", location: "London" },
  { title: "Bartender", dept: "Bar", type: "Part-time", location: "London" },
  { title: "Waiter / Waitress", dept: "Service", type: "Part-time", location: "London" },
  { title: "Marketing Coordinator", dept: "Marketing", type: "Full-time", location: "Remote" },
];

export { OPEN_POSITIONS };

export default function CareersPositions() {
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(listRef.current.children, {
        opacity: 0, x: -30, stagger: 0.08, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: listRef.current, start: "top 80%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-24 bg-charcoal">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
          <div>
            <SectionTag label="Open Positions" light />
            <h2 className="font-freight text-h2 text-cream font-normal mt-4">
              Current <span className="italic text-accent-gold">Opportunities</span>
            </h2>
          </div>
          <p className="font-josefin text-body-xs text-cream/50 max-w-[500px]">
            We're always looking for passionate, talented people to join our team.
            If you don't see a role that fits, send us your CV anyway.
          </p>
        </div>

        <div ref={listRef} className="flex flex-col">
          {OPEN_POSITIONS.map(({ title, dept, type, location }) => (
            <div key={title}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 cursor-pointer border-b border-cream/8 transition-colors duration-300">
              <div className="flex flex-col gap-1">
                <h4 className="font-freight text-h4 text-cream group-hover:text-accent-gold transition-colors duration-300">
                  {title}
                </h4>
                <div className="flex items-center gap-3">
                  <span className="font-josefin text-caption uppercase tracking-widest text-cream/40">{dept}</span>
                  <span className="text-cream/20">·</span>
                  <span className="font-josefin text-caption uppercase tracking-widest text-cream/40">{location}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-josefin text-caption px-3 py-1 border
                  ${type === "Full-time" ? "border-accent-gold text-accent-gold" : "border-cream/20 text-cream/40"}`}>
                  {type}
                </span>
                <a href="#apply"
                  className="font-josefin text-caption uppercase tracking-widest text-cream/40 no-underline group-hover:text-accent-gold transition-colors duration-300">
                  Apply →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
