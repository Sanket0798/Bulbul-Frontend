import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FOUNDERS = [
  {
    name: "Rohan D'Souza",
    role: "Head Chef",
    image: "/images/shared/people/Image-1.jpg",
    quote: "Every dish we serve carries a memory — of a kitchen, a street corner, or a family table. We're here to bring those stories to life.",
  },
  {
    name: "Twinkle Keswani",
    role: "Restaurateur",
    image: "/images/shared/people/Image-2.jpg",
    quote: "Bulbul is built on a belief that great food and genuine warmth can turn a meal into something you carry with you long after.",
  },
];

const FRONT_OF_HOUSE = [
  {
    name: "Priya Sharma",
    role: "Hospitality",
    image: "/images/shared/people/Image-4.jpg",
    quote: "It's the small things — a warm greeting, a perfectly timed course, a glass refilled before you notice. That's what we get right.",
  },
];

const BACK_OF_HOUSE = [
  {
    name: "Vikram Mehta",
    role: "Events Manager",
    image: "/images/shared/people/Image-3.jpg",
    quote: "Whether it's an intimate dinner or a full celebration, we make sure every detail is handled so you can simply enjoy the moment.",
  },
];

function TeamCard({ member, isActive, onHover }) {
  return (
    <button
      onMouseEnter={onHover}
      onClick={onHover}
      className="relative rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ease-out"
      style={{
        width: "100%",
        maxWidth: "160px",
        aspectRatio: "3/4",
        outline: isActive ? "3px solid #c45a38" : "3px solid transparent",
        outlineOffset: "3px",
        opacity: isActive ? 1 : 0.65,
        transform: isActive ? "scale(1.05)" : "scale(1)",
      }}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover object-top transition-transform duration-500"
        style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }}
      />
    </button>
  );
}

function TeamGroup({ title, members, activeIndex, onSelect, imageRef, detailsRef }) {
  const activeMember = members[activeIndex] || members[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Group title */}
      <h3 className="font-freight text-[22px] sm:text-[26px] font-semibold text-rust-dark">
        {title}
      </h3>

      <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10">
        {/* Featured image */}
        <div className="w-full lg:w-[40%] max-w-[380px] shrink-0">
          <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-lg overflow-hidden shadow-lg">
            <img
              ref={imageRef}
              src={activeMember.image}
              alt={activeMember.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Details + thumbnails */}
        <div className="flex flex-col justify-between flex-1 gap-6">
          {/* Details */}
          <div ref={detailsRef} className="flex flex-col justify-center flex-1 pt-2 lg:pt-4">
            <div className="w-8 h-[3px] bg-accent-gold mb-4 rounded-full" />
            <p className="font-freight text-[15px] sm:text-[17px] leading-[1.6] text-terracotta mb-5 max-w-[440px]">
              "{activeMember.quote}"
            </p>
            <h4 className="font-freight text-[20px] sm:text-[24px] font-semibold text-rust-dark leading-tight">
              {activeMember.name}
            </h4>
            <span className="font-freight text-[13px] sm:text-[14px] text-terracotta/70 tracking-wide mt-1">
              {activeMember.role}
            </span>
          </div>

          {/* Thumbnails */}
          {members.length > 1 && (
            <div className="flex gap-3 sm:gap-4">
              {members.map((member, index) => (
                <TeamCard
                  key={member.name}
                  member={member}
                  isActive={index === activeIndex}
                  onHover={() => onSelect(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AboutTeam() {
  const [foundersActive, setFoundersActive] = useState(0);
  const [frontActive, setFrontActive] = useState(0);
  const [backActive, setBackActive] = useState(0);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const foundersImgRef = useRef(null);
  const foundersDetailsRef = useRef(null);
  const frontImgRef = useRef(null);
  const frontDetailsRef = useRef(null);
  const backImgRef = useRef(null);
  const backDetailsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate founders on change
  useEffect(() => {
    if (foundersImgRef.current) {
      gsap.fromTo(foundersImgRef.current, { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
    }
    if (foundersDetailsRef.current) {
      gsap.fromTo(foundersDetailsRef.current.children, { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.35, ease: "power2.out" });
    }
  }, [foundersActive]);

  // Animate front of house on change
  useEffect(() => {
    if (frontImgRef.current) {
      gsap.fromTo(frontImgRef.current, { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
    }
    if (frontDetailsRef.current) {
      gsap.fromTo(frontDetailsRef.current.children, { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.35, ease: "power2.out" });
    }
  }, [frontActive]);

  // Animate back of house on change
  useEffect(() => {
    if (backImgRef.current) {
      gsap.fromTo(backImgRef.current, { opacity: 0, scale: 1.03 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
    }
    if (backDetailsRef.current) {
      gsap.fromTo(backDetailsRef.current.children, { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.35, ease: "power2.out" });
    }
  }, [backActive]);

  return (
    <section ref={sectionRef} className="w-full py-[80px] lg:py-[140px] bg-bg-inner">
      <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-[60px]">

        {/* Section heading */}
        <div ref={headingRef} className="mb-12 lg:mb-16">
          <h2 className="font-freight text-[36px] sm:text-[48px] lg:text-[62px] leading-[1.1] mb-4">
            <span className="text-rust font-black">Passion Behind Every </span>
            <span className="italic font-normal text-gold">Plate</span>
          </h2>
          <p className="font-freight font-semibold text-[16px] sm:text-[18px] leading-[1.5] text-terracotta max-w-[680px]">
            Our culinary and service teams combine good food with great service and hospitality that make for an unforgettable dining experience.
          </p>
        </div>

        {/* Founders intro text */}
        <p className="font-freight font-medium text-[15px] sm:text-[17px] leading-[1.6] text-terracotta/90 mb-10 max-w-[720px]">
          Bulbul is founded by Chef Rohan D'Souza and restaurateur Twinkle Keswani. Between them, they have spent years opening and running restaurants across India, picking up ideas, habits, and a fairly strong point of view on how people like to eat. This is where it all comes together.
        </p>

        {/* Team groups */}
        <div className="flex flex-col gap-16 lg:gap-20">
          <TeamGroup
            title="Founders"
            members={FOUNDERS}
            activeIndex={foundersActive}
            onSelect={setFoundersActive}
            imageRef={foundersImgRef}
            detailsRef={foundersDetailsRef}
          />

          <TeamGroup
            title="Front of the House"
            members={FRONT_OF_HOUSE}
            activeIndex={frontActive}
            onSelect={setFrontActive}
            imageRef={frontImgRef}
            detailsRef={frontDetailsRef}
          />

          <TeamGroup
            title="Back of the House"
            members={BACK_OF_HOUSE}
            activeIndex={backActive}
            onSelect={setBackActive}
            imageRef={backImgRef}
            detailsRef={backDetailsRef}
          />
        </div>
      </div>
    </section>
  );
}
