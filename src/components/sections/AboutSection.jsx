import { forwardRef, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowIcon from "@/components/common/ArrowIcon";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = forwardRef(function AboutSection(_, ref) {
  const imageColRef = useRef(null);
  const textColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image collage animation
      gsap.fromTo(imageColRef.current.children,
        { autoAlpha: 0, scale: 0.9, y: 30 },
        {
          autoAlpha: 1, scale: 1, y: 0, stagger: 0.2, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: imageColRef.current, start: "top 80%" }
        }
      );

      // Text column animation
      gsap.fromTo(textColRef.current.children,
        { autoAlpha: 0, x: 50 },
        {
          autoAlpha: 1, x: 0, stagger: 0.15, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: textColRef.current, start: "top 80%" }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full py-[80px] lg:py-[162px] overflow-hidden">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-10 lg:gap-24">

          {/* Image collage */}
          <div ref={imageColRef} className="relative shrink-0 w-full sm:w-[400px] lg:w-[480px] h-[350px] sm:h-[420px] lg:h-[462px]">
            {/* <div className="absolute top-0 left-[60px] sm:left-[87px] w-[180px] sm:w-[240px] h-[280px] sm:h-[380px] border-2 border-rust-dark" /> */}
            <div className="absolute top-[24px] left-0 w-[175px] sm:w-[234px] h-[250px] sm:h-[334px] overflow-hidden rounded-sm">
              <img src="/images/shared/food/steak-herbs-plated.png" alt="Bulbul restaurant interior"
                className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-[150px] sm:top-[206px] left-[120px] sm:left-[170px] w-[220px] sm:w-[310px] h-[190px] sm:h-[257px] overflow-hidden rounded-sm shadow-xl">
              <img src="/images/shared/food/lamb-kadai.png" alt="Bulbul dining experience"
                className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Text */}
          <div ref={textColRef} className="flex flex-col max-w-[619px]">
            <h2 className="font-freight text-[36px] sm:text-5xl leading-[44px] sm:leading-[56px] mb-4">
              <span className="text-rust font-semibold">Rooted in India.</span>
              <br />
              <span className="italic text-accent-gold">At home in London.</span>
            </h2>
            <p className="font-freight font-semibold text-[16px] sm:text-[19px] leading-[22px] sm:leading-[25px] text-terracotta">
              Bulbul started with a simple thought. Indian food is far broader, more regional, and more nuanced than the handful of dishes it is often reduced to. Cooking styles change every few hundred kilometres, sometimes from one household to the next.
            </p>
            <p className="font-freight font-semibold text-[16px] sm:text-[19px] leading-[22px] sm:leading-[25px] text-terracotta mt-4">
              So we travelled. Through forests, villages, cities, coastlines and old market streets. We sat at tables, listened to stories, learned family recipes and ways of cooking that have quietly endured for generations.
            </p>
            {/* <Link to="/about" className="btn-outline-primary-home inline-flex items-center gap-3 self-start mt-6">
              Read More <ArrowIcon className="stroke-rust" />
            </Link> */}
            <Link to="/contact#contact-staff"
              className="inline-flex items-center gap-1 font-semibold leading-[25px] self-start px-8 py-[9px] bg-primary text-cream font-freight text-lg transition-all duration-100 hover:bg-rust-dark rounded mt-6">
              Meet the Team <img src={arrowRight} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
