import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";
import arrowRust from "@/assets/icons/svg/right-arrow-rust.svg";

gsap.registerPlugin(ScrollTrigger);

export default function GroupReservations() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.children,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0, x: 50 },
        {
          autoAlpha: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: imageRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full pt-8 lg:pt-[35px] pb-10 lg:pb-[61px]">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 justify-between">

          {/* Left — Text content */}
          <div ref={textRef} className="flex flex-col w-full lg:max-w-[511px] justify-center">
            <span className="font-freight uppercase font-black text-[15px] leading-[16px] tracking-widest text-terracotta block mb-3">
              Book for a first-class get-together
            </span>

            <h2 className="font-freight text-[32px] sm:text-[38px] lg:text-[44px] leading-[1.1] font-black text-rust mb-[18px]">
              Group Reservations{" "}
              <span className="italic font-normal text-gold">Menus</span>
            </h2>

            <p className="font-freight font-semibold text-base sm:text-lg leading-[22px] text-terracotta mb-2">
              A good meal can gladden the heart. A fine gathering, more so. Come – eat, drink and be joyful. It will be our delight to host you.
            </p>
            <p className="font-freight font-semibold text-base sm:text-lg leading-[22px] text-terracotta mb-2">
              We accept bookings online up to four months in advance. For large parties of 16+ or for specific event requests, do get in touch with us directly to book.
            </p>
            <p className="font-freight font-semibold text-base sm:text-lg leading-[22px] text-terracotta mb-7">
              For any group, we do ask for a deposit, which is used against your final bill. If you need to cancel for any reason, let us know 24 hours in advance and we will gladly refund your deposit.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/rooms"
                className="inline-flex items-center gap-1 font-semibold leading-[22px] px-6 sm:px-8 py-[10px] bg-primary text-cream font-freight text-[16px] transition-all duration-300 hover:bg-rust-dark rounded"
              >
                View Menu <img src={arrowRight} alt="" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 font-semibold leading-[22px] px-6 sm:px-8 py-[10px] border border-rust text-rust font-freight text-[16px] transition-all duration-300 hover:bg-rust hover:text-cream rounded"
              >
                Make an enquiry <img src={arrowRust} alt="" />
              </Link>
            </div>
          </div>

          {/* Right — Image */}
          <div ref={imageRef} className="w-full lg:flex-1">
            <div className="w-full max-w-[720px] overflow-hidden rounded-sm">
              <img
                src="/images/shared/food/loaded-fries.png"
                alt="Book on Bulbul app"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
