import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const headingRef = useRef(null);
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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(headingRef.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1, delay: 0.3 })
        .fromTo(quoteRef.current, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.8 }, "-=0.5")
        .fromTo(ctaRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden flex items-end min-h-screen">

      {/* Background video */}
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

      {/* Gradient overlays */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/50" /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" /> */}



      {/* Content */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-[60px] pb-20 lg:pb-[67px]">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-20">

          {/* Left column — heading */}
          <div className="max-w-[630px]">
            <span ref={headingRef} className="font-freight text-h1 text-cream font-black text-[36px] sm:text-[48px] lg:text-[35px]">
              Food that feels a little familiar, a little <span className="italic font-medium text-accent-gold">new</span>
            </span>

            <h1 className="font-freight text-h1 text-cream font-black text-[36px] sm:text-[48px] lg:text-[58px] mt-4">
              Flavors That Stay with You{" "}
              <span className="italic font-medium text-accent-gold">Forever</span>
            </h1>
          </div>

          {/* Right column — quote + CTA */}
          <div className="max-w-[574px] flex flex-col gap-4">
            <p ref={quoteRef} className="font-freight font-semibold text-base leading-[25px] text-cream tracking-[1.42px]">
              "We've grown up with a version of Indian food shaped by homes and everyday cooking, the kind that rarely makes it onto restaurant menus. At Bulbul, that is what comes to the table, gathered along the way and shared with you."
            </p>
           <a ref={ctaRef} href="https://www.sevenrooms.com/explore/bulbul/reservations/create/search/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold leading-[25px] self-start px-8 py-[9px] bg-primary text-cream font-freight text-[18px] transition-all duration-300 hover:bg-rust-dark rounded">
              Book a table <img src={arrowRight} alt="" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
