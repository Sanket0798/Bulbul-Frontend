import { useRef, useEffect } from "react";
import { gsap, splitLines, afterFonts, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";

const FOUNDERS = [
  {
    name: "Rohan D'Souza",
    role: "Head Chef",
    image: "/images/shared/people/Image-1.jpg",
    quote: "Every dish we serve carries a memory — of a kitchen, a street corner, or a family table.",
  },
  {
    name: "Twinkle Keswani",
    role: "Restaurateur",
    image: "/images/shared/people/Image-2.jpg",
    quote: "Great food and genuine warmth can turn a meal into something you carry with you long after.",
  },
];

const FRONT_OF_HOUSE = [
  {
    name: "Priya Sharma",
    role: "Hospitality",
    image: "/images/shared/people/Image-4.jpg",
    quote: "A warm greeting, a perfectly timed course — that's what we get right.",
  },
];

const BACK_OF_HOUSE = [
  {
    name: "Vikram Mehta",
    role: "Events Manager",
    image: "/images/shared/people/Image-3.jpg",
    quote: "We make sure every detail is handled so you can simply enjoy the moment.",
  },
];

function MugshotCard({ member, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => {
        // Staggered reveal with clip-path wipe + parallax float
        gsap.fromTo(
          cardRef.current,
          { clipPath: "inset(100% 0 0 0)", opacity: 0 },
          {
            clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 1.2, ease: "power4.out",
            delay: index * 0.15,
            scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
          }
        );

        // Subtle float on the image
        const img = cardRef.current.querySelector(".mugshot-img");
        if (img) {
          gsap.to(img, {
            yPercent: -4, ease: "none",
            scrollTrigger: { trigger: cardRef.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });

      mm.add(REDUCED_MOTION, () => {
        gsap.set(cardRef.current, { autoAlpha: 1, clearProps: "clipPath" });
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className="group flex flex-col">
      {/* Image container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm">
        <img
          src={member.image}
          alt={member.name}
          className="mugshot-img w-full h-[110%] object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover overlay with quote */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
          <p className="font-freight text-[14px] sm:text-[15px] leading-[1.5] text-cream/90 italic">
            "{member.quote}"
          </p>
        </div>
      </div>

      {/* Info below */}
      <div className="pt-4">
        <h4 className="font-freight text-[20px] sm:text-[22px] font-semibold text-rust-dark leading-tight">
          {member.name}
        </h4>
        <span className="font-freight text-[13px] sm:text-[20px] text-terracotta/70 font-medium tracking-wide">
          {member.role}
        </span>
      </div>
    </div>
  );
}

function TeamGroup({ title, members, startIndex }) {
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(NO_PREFERENCE, () => {
        gsap.fromTo(
          titleRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
          }
        );
      });
      mm.add(REDUCED_MOTION, () => gsap.set(titleRef.current, { autoAlpha: 1, clearProps: "transform" }));
    }, titleRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h3
        ref={titleRef}
        className="font-freight text-[22px] sm:text-[26px] font-semibold text-rust-dark border-l-[3px] border-accent-gold pl-4"
      >
        {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
        {members.map((member, i) => (
          <MugshotCard key={member.name} member={member} index={startIndex + i} />
        ))}
      </div>
    </div>
  );
}

export default function AboutTeam() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => afterFonts(sectionRef, () => {
        // Heading: line-masked reveal
        const heading = splitLines(headingRef.current);
        gsap.from(heading.lines, {
          yPercent: 120, duration: 1.1, stagger: 0.12, ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        });

        // Intro paragraph: gentle blur-in
        gsap.fromTo(
          introRef.current,
          { opacity: 0, y: 30, filter: "blur(6px)" },
          {
            opacity: 1, y: 0, filter: "blur(0px)", duration: 1, delay: 0.3, ease: "power3.out",
            scrollTrigger: { trigger: introRef.current, start: "top 85%" },
          }
        );

        return () => heading.revert();
      }));

      mm.add(REDUCED_MOTION, () => {
        gsap.set([headingRef.current, introRef.current], { autoAlpha: 1, clearProps: "transform,filter" });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-[80px] lg:py-[80px] bg-bg-inner">
      <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-[60px]">

        {/* Section heading */}
        <div className="mb-4 lg:mb-6 overflow-hidden">
          <span className="block font-freight text-[14px] sm:text-[20px] uppercase font-black tracking-widest text-rust mb-2 md:mb-0">
            The A team!
          </span>
          <h2
            ref={headingRef}
            className="font-freight text-[36px] sm:text-[48px] lg:text-[62px] leading-[1.1]"
          >
            <span className="text-rust font-black">Passion Behind Every </span>
            <span className="italic font-normal text-gold">Plate</span>
          </h2>
        </div>

        <p
          ref={introRef}
          className="font-freight font-semibold text-[16px] sm:text-[20px] leading-[1.6] text-terracotta max-w-[720px] mb-10 lg:mb-12"
        >
          Our culinary and service teams combine good food with great service and hospitality that make for an unforgettable dining experience.
        </p>

        {/* Team groups */}
        <div className="flex flex-col gap-14 lg:gap-20">
          {/* <TeamGroup title="Founders" members={FOUNDERS} startIndex={0} /> */}
          <TeamGroup title="Front of the House" members={FRONT_OF_HOUSE} startIndex={2} />
          <TeamGroup title="Back of the House" members={BACK_OF_HOUSE} startIndex={3} />
        </div>
      </div>
    </section>
  );
}
