import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, afterFonts, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const headingRef = useRef(null);
  const mainHeadingRef = useRef(null);
  const quoteRef = useRef(null);
  const ctaRef = useRef(null);

  // iOS video autoplay fix
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    const playVideo = async () => { try { await video.play(); } catch { /* silent */ } };
    playVideo();
    document.addEventListener("touchstart", playVideo, { once: true });
    return () => document.removeEventListener("touchstart", playVideo);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => afterFonts(sectionRef, () => {
        // Intro Ken-Burns on the background video
        gsap.from(mediaRef.current, {
          scale: 1.18, autoAlpha: 0, duration: 2.2, ease: "power2.out",
        });

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Eyebrow — clip-path wipe + blur
        tl.fromTo(headingRef.current,
          { clipPath: "inset(0 0 100% 0)", opacity: 1, filter: "blur(6px)" },
          { clipPath: "inset(0 0 0% 0)", opacity: 1, filter: "blur(0px)", duration: 1.2 },
          0.3
        )
        // Main heading — slide up with blur
        .fromTo(mainHeadingRef.current,
          { y: 50, opacity: 1, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2 },
          0.6
        )
        // Quote — slide from right
        .fromTo(quoteRef.current,
          { x: 60, opacity: 1, filter: "blur(4px)" },
          { x: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
          0.9
        );

        // CTA — bounce in
        if (ctaRef.current) {
          tl.fromTo(ctaRef.current,
            { autoAlpha: 0, scale: 0.8, y: 20 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.6)" },
            1.1
          );
        }

        // Background parallax — video drifts slower than the page on scroll
        gsap.fromTo(mediaRef.current,
          { yPercent: -6 },
          {
            yPercent: 6, ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top", end: "bottom top", scrub: true,
            },
          }
        );

        // Content lifts and fades as the hero scrolls out of view
        gsap.to([headingRef.current, mainHeadingRef.current, quoteRef.current, ctaRef.current].filter(Boolean), {
          yPercent: -18, autoAlpha: 0, ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top", end: "bottom top", scrub: true,
          },
        });
      }));

      // Reduced motion — show everything, no transforms
      mm.add(REDUCED_MOTION, () => {
        gsap.set(
          [headingRef.current, mainHeadingRef.current, quoteRef.current, ctaRef.current, mediaRef.current].filter(Boolean),
          { autoAlpha: 1, clearProps: "transform,filter" }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden flex items-end min-h-screen">

      {/* Background video — oversized wrapper so parallax never reveals edges */}
      <div ref={mediaRef} className="absolute inset-[-8%] will-change-transform">
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          preload="metadata"
          disablePictureInPicture
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/videos/Hero-Banner.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent lg:from-black/50 lg:via-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-[60px] pt-[120px] pb-10 sm:pb-16 lg:pb-[67px]">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 lg:gap-20">

          {/* Left column — heading */}
          <div className="max-w-[630px]">
            <span ref={headingRef} className="block font-freight text-cream font-black text-[18px] sm:text-[24px] lg:text-[35px] leading-[1.3]">
              Food that feels a little familiar, a little <span className="italic font-medium text-accent-gold">new</span>
            </span>

            <h1 ref={mainHeadingRef} className="font-freight text-cream font-black text-[32px] sm:text-[44px] lg:text-[58px] leading-[1.1] mt-2 sm:mt-3 lg:mt-4">
              Flavors That Stay with You{" "}
              <span className="italic font-medium text-accent-gold">Forever</span>
            </h1>
          </div>

          {/* Right column — quote + CTA */}
          <div className="max-w-[574px] flex flex-col gap-4">
            <p ref={quoteRef} className="font-freight font-semibold text-sm sm:text-base leading-[22px] sm:leading-[25px] text-cream tracking-[0.5px] sm:tracking-[1.42px]">
              "We've grown up with a version of Indian food shaped by homes and everyday cooking, the kind that rarely makes it onto restaurant menus. At Bulbul, that is what comes to the table, gathered along the way and shared with you."
            </p>
            {/* CTA with hover pulse animation */}
              <a href="https://www.sevenrooms.com/explore/bulbul/reservations/create/search/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold leading-[25px] self-start px-8 py-[9px] bg-primary text-cream font-freight text-[16px] sm:text-[18px] transition-all duration-300 hover:bg-rust-dark rounded"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.05, boxShadow: "0 8px 25px rgba(124,45,38,0.4)", duration: 0.3, ease: "power2.out" });
                  gsap.to(e.currentTarget.querySelector("img"), { x: 5, duration: 0.3, ease: "power2.out" });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, boxShadow: "0 0px 0px rgba(124,45,38,0)", duration: 0.4, ease: "elastic.out(1, 0.5)" });
                  gsap.to(e.currentTarget.querySelector("img"), { x: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
                }}
              >
                Book a table <img src={arrowRight} alt="" />
              </a>
          </div>
        </div>
      </div>
    </section>
  );
}
