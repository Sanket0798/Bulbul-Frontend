import { forwardRef, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, afterFonts, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";
import ArrowIcon from "@/components/common/ArrowIcon";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

const AboutSection = forwardRef(function AboutSection(_, ref) {
  const imageColRef = useRef(null);
  const textColRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => afterFonts(ref, () => {
        const images = imageColRef.current.children;
        // Everything below the heading (paragraphs + CTA) staggers in together.
        const copy = gsap.utils.toArray(textColRef.current.children).slice(1);

        // Image collage — clip-path reveal + parallax depth
        gsap.fromTo(images[0],
          { clipPath: "inset(0 100% 0 0)", autoAlpha: 0 },
          {
            clipPath: "inset(0 0% 0 0)", autoAlpha: 1, duration: 1.2, ease: "power4.inOut",
            scrollTrigger: { trigger: imageColRef.current, start: "top 80%" }
          }
        );
        gsap.fromTo(images[1],
          { clipPath: "inset(100% 0 0 0)", autoAlpha: 0, scale: 0.9 },
          {
            clipPath: "inset(0% 0 0 0)", autoAlpha: 1, scale: 1, duration: 1.2, delay: 0.3, ease: "power4.inOut",
            scrollTrigger: { trigger: imageColRef.current, start: "top 80%" }
          }
        );

        // Parallax float on images
        gsap.to(images[0], {
          yPercent: -8, ease: "none",
          scrollTrigger: { trigger: imageColRef.current, start: "top bottom", end: "bottom top", scrub: true }
        });
        gsap.to(images[1], {
          yPercent: 6, ease: "none",
          scrollTrigger: { trigger: imageColRef.current, start: "top bottom", end: "bottom top", scrub: true }
        });

        // Heading — clip-path reveal
        gsap.fromTo(headingRef.current,
          { clipPath: "inset(0 0 100% 0)", opacity: 0, filter: "blur(6px)" },
          {
            clipPath: "inset(0 0 0% 0)", opacity: 1, filter: "blur(0px)",
            duration: 1.2, ease: "power4.out",
            scrollTrigger: { trigger: textColRef.current, start: "top 80%" },
          }
        );

        // Copy — staggered blur-in with rotation
        gsap.fromTo(copy,
          { autoAlpha: 0, y: 40, filter: "blur(4px)", rotateY: -5 },
          {
            autoAlpha: 1, y: 0, filter: "blur(0px)", rotateY: 0,
            stagger: 0.12, duration: 1, ease: "power3.out", delay: 0.2,
            scrollTrigger: { trigger: textColRef.current, start: "top 80%" }
          }
        );
      }));

      mm.add(REDUCED_MOTION, () => {
        gsap.set([imageColRef.current.children, textColRef.current.children], {
          autoAlpha: 1, clearProps: "transform,filter,clipPath",
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full py-[80px] lg:py-[162px] overflow-hidden">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-10 lg:gap-24">

          {/* Image collage — hidden on mobile to avoid overlap with parallax map */}
          <div ref={imageColRef} className="relative shrink-0 mx-auto md:mx-0 w-full sm:block sm:w-[400px] lg:w-[480px] h-[350px] sm:h-[420px] lg:h-[462px]">
            {/* <div className="absolute top-0 left-[60px] sm:left-[87px] w-[180px] sm:w-[240px] h-[280px] sm:h-[380px] border-2 border-rust-dark" /> */}
            <a href="https://www.instagram.com/reel/DYPgpIjIVTZ/?igsh=bTg1NWR2ZjJxNjdh" target="_blank" rel="noopener noreferrer" className="absolute top-[24px] left-0 w-[200px] sm:w-[234px] h-[280px] sm:h-[334px] overflow-hidden rounded-sm group/img">
              <img src="/images/thumbnail/Thumbnail-1.jpg" alt="Watch on Instagram"
                className="w-full h-full object-fit transition-transform duration-500 group-hover/img:scale-105" />
            </a>
            <a href="https://www.instagram.com/reel/DZ4-5_BIxt4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" target="_blank" rel="noopener noreferrer" className="absolute top-[150px] sm:top-[206px] left-[120px] sm:left-[170px] w-auto h-[195px] sm:h-[257px] overflow-hidden rounded-sm shadow-xl group/img">
              <img src="/images/thumbnail/Thumbnail-3.PNG" alt="Watch on Instagram"
                className=" transition-transform duration-500 group-hover/img:scale-105" />
            </a>
          </div>

          {/* Text */}
          <div ref={textColRef} className="flex flex-col max-w-[619px]">
            <h2 ref={headingRef} className="font-freight text-[36px] sm:text-5xl leading-[44px] sm:leading-[56px] mb-4">
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
            {/* <Link to="/about#front-of-house"
              className="inline-flex items-center gap-1 font-semibold leading-[25px] self-start px-8 py-[9px] bg-primary text-cream font-freight text-lg transition-all duration-100 hover:bg-rust-dark rounded mt-6">
              Meet the Team <img src={arrowRight} alt="" />
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
