import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTag from "@/components/common/SectionTag";

import youtubeSvg from "@/assets/icons/svg/youtube.svg";
import instagramSvg from "@/assets/icons/svg/instagram.svg";
import facebookSvg from "@/assets/icons/svg/facebook.svg";
import twitterPng from "@/assets/icons/svg/twitter.svg";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  {
    label: "YouTube",
    href:
      import.meta.env.VITE_SOCIAL_YOUTUBE ||
      "https://youtube.com/@bulbulrestaurant",
    icon: youtubeSvg,
  },
  {
    label: "Instagram",
    href:
      import.meta.env.VITE_SOCIAL_INSTAGRAM ||
      "https://instagram.com/bulbulrestaurant",
    icon: instagramSvg,
  },
  {
    label: "Facebook",
    href:
      import.meta.env.VITE_SOCIAL_FACEBOOK ||
      "https://facebook.com/bulbulrestaurant",
    icon: facebookSvg,
  },
  {
    label: "Twitter",
    href:
      import.meta.env.VITE_SOCIAL_TWITTER ||
      "https://twitter.com/bulbulrestaurant",
    icon: twitterPng,
  },
];

const CONTACT_DETAILS = [
  { text: "Bandra West, Mumbai, Maharashtra, India" },
  { text: "T: (+91) 22 1234 5678" },
  { text: "M: hello@bulbulrestaurant.com" },
];

export default function ContactInfo() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.children,
        { autoAlpha: 0, x: -40 },
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0, x: 40 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-20">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-15">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left — Contact info */}
          <div ref={textRef} className="flex flex-col gap-5 lg:w-1/2">
            <h2 className="font-freight text-h2 text-rust font-black">
              How To Find Us
            </h2>
            {/* <SectionTag label="Contact" /> */}
            <p className="font-freight text-[22px] leading-[30px] text-terracotta font-semibold max-w-[500px]">
              Whether you're planning a dinner, a celebration, or simply craving
              something exceptional — we'd love to hear from you.
            </p>

            {/* Contact details */}
            <ul className="flex flex-col gap-1 pt-2">
              {CONTACT_DETAILS.map(({ text }) => (
                <li key={text}>
                  <span className="font-freight font-medium text-[19px] text-charcoal">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <hr className="w-full border-rust/20 my-2" />

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-rust/10 transition-all duration-300"
                >
                  <img src={icon} alt={label}  />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Image */}
          <div ref={imageRef} className="lg:w-1/2">
            <img
              src="/images/shared/interior/restaurant-wooden-lanterns.png"
              alt="Bulbul Restaurant Interior"
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
