import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "@/components/common/SectionTag";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_CARDS = [
  { img: "/images/index/services1.webp", title: "Explore Menu", subtitle: "Elegant dishes preview" },
  { img: "/images/index/services2.webp", title: "Reservations", subtitle: "Reserve table instantly" },
  { img: "/images/index/Room1.webp", title: "Online Ordering", subtitle: "Order your favorites" },
];

export default function AboutExperience() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current.children, {
        opacity: 0, y: 60, scale: 0.95, stagger: 0.15, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 bg-charcoal">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
          <div className="flex flex-col gap-4 max-w-[520px]">
            <SectionTag label="Signature Experience" light />
            <h2 className="font-freight text-h2 text-cream font-normal">
              More Than Just <span className="italic text-accent-gold">Dining</span>
            </h2>
          </div>
          <p className="font-josefin text-body-xs text-cream/55 max-w-[580px]">
            The menu moves across regions, bringing together dishes, references, and
            recipes drawn from homes, street-side cooking, and everyday meals. It is
            built around small plates, so you can try more, share across the table,
            and come back to the things you like.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXPERIENCE_CARDS.map(({ img, title, subtitle }) => (
            <div key={title} className="group relative overflow-hidden h-[420px]">
              <img src={img} alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 overlay-card-bottom-dark" />
              <div className="absolute bottom-0 left-0 px-6 py-8 flex flex-col gap-1">
                <span className="font-freight text-h4 text-cream">{title}</span>
                <span className="font-freight italic text-body text-cream/65">{subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="font-josefin text-body-xs text-cream/45 mt-12 max-w-[660px]">
          The bar takes a similar route, with cocktails that pick up on familiar
          flavours, pantry staples, and techniques you would recognise, reworked to
          sit easily alongside the food.
        </p>
      </div>
    </section>
  );
}
