import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "@/components/common/SectionTag";

gsap.registerPlugin(ScrollTrigger);

const WHY_WORK = [
  { title: "Creative Culture", desc: "We encourage bold ideas and celebrate the people who bring them to life every day." },
  { title: "Growth & Learning", desc: "From day one, you'll have access to training, mentorship, and real opportunities to grow." },
  { title: "Meaningful Work", desc: "Every role at Bulbul contributes to something bigger — a dining experience people remember." },
  { title: "Inclusive Team", desc: "We are a team that shows up for each other — diverse, welcoming, and proud of it." },
];

export default function CareersWhyWork() {
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current.children, {
        opacity: 0, y: 50, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-24 bg-rust/5">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="mb-14">
          <SectionTag label="Why Work With Us" />
          <h2 className="font-freight text-h2 font-normal mt-4">
            <span className="text-rust">Why Work With </span>
            <span className="italic text-accent-gold">Us</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_WORK.map(({ title, desc }) => (
            <div key={title}
              className="flex flex-col gap-5 p-7 border border-rust/20 bg-rust/4 transition-all duration-300 hover:border-accent-gold/40">
              <h4 className="font-freight text-h4 text-charcoal">{title}</h4>
              <p className="font-josefin text-body-xs text-charcoal/60">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
