import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";
// import arrowRight from "@/assets/icons/svg/right-arrow.svg";

export default function AboutHero() {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(tagRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.3 })
        .fromTo(headingRef.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1 }, "-=0.3")
        .fromTo(descRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.4")
        .fromTo(ctaRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden flex items-end min-h-[500px] sm:min-h-[600px] lg:min-h-[782px]">

      {/* Background image */}
      <img src="/images/pages/home/about-section.png" alt=""
        className="absolute inset-0 w-full h-full object-cover object-right" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/70 to-transparent" />
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" /> */}

      {/* Content */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-[60px] pb-20 lg:pb-[200px]">
        <div className="max-w-[620px]">

          <span ref={tagRef} className="block font-freight text-base leading-[22px] uppercase font-black tracking-widest text-accent-gold">
            About Our Restaurant
          </span>

          <h1 ref={headingRef} className="font-freight text-cream font-black text-[36px] sm:text-[48px] lg:text-[63px] leading-[1.1] mt-4">
            Where Flavor Meets Our{" "}
            <span className="italic font-medium text-cream">Emotions</span>
          </h1>

          <p ref={descRef} className="font-freight font-semibold text-base leading-[25px] text-cream tracking-[1.42px] mt-5 max-w-[580px]">
            Bulbul is founded by Chef Rohan D'Souza and restaurateur Twinkle Keswani. Between them, they have spent years opening and running restaurants across India, picking up ideas, habits, and a fairly strong point of view on how people like to eat. This is where it all comes together.
          </p>

          {/* <Link ref={ctaRef} to="/contact"
            className="btn-solid-primary-dark self-start mt-6">
            Know More <img src={arrowRight} alt="" />
          </Link> */}
          <Link ref={ctaRef} to="/contact"
            className="inline-flex items-center gap-1 font-semibold leading-[25px] self-start px-8 py-[9px] bg-primary text-cream font-freight text-[18px] transition-all duration-300 hover:bg-rust-dark rounded mt-6">
            Know More <img src={arrowRight} alt="" />
          </Link>
        </div>
      </div>
    </section>
  );
}
