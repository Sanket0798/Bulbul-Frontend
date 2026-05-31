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
    <section ref={sectionRef} className="w-full py-[60px] lg:py-[100px] bg-bg">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

          {/* Left — Text content */}
          <div ref={textRef} className="flex flex-col flex-1 lg:max-w-[480px]">
            <span className="font-freight uppercase font-black text-[13px] sm:text-[14px] leading-[18px] tracking-widest text-terracotta block mb-3">
              Book for a First-Class Get Together
            </span>

            <h2 className="font-freight text-[36px] sm:text-[48px] lg:text-[56px] leading-[42px] sm:leading-[54px] lg:leading-[62px] font-black text-rust-dark mb-5">
              Group{" "}
              <span className="italic font-normal text-gold">Reservations</span>
            </h2>

            <p className="font-freight font-semibold text-[15px] sm:text-[16px] lg:text-[17px] leading-[22px] sm:leading-[24px] text-terracotta mb-4">
              A good meal can gladden the heart. A fine gathering, more so. Come – eat, drink and be joyful. It will be our delight to host you.
            </p>

            <p className="font-freight font-semibold text-[15px] sm:text-[16px] lg:text-[17px] leading-[22px] sm:leading-[24px] text-terracotta mb-4">
              We accept bookings online up to four months in advance. For large parties of 16+ or for specific event requests, do get in touch with us directly to book.
            </p>

            <p className="font-freight font-semibold text-[15px] sm:text-[16px] lg:text-[17px] leading-[22px] sm:leading-[24px] text-terracotta mb-8">
              For any group, we do ask for a deposit, which is used against your final bill. If you need to cancel for any reason, let us know 24 hours in advance and we will gladly refund your deposit.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 font-semibold leading-[25px] px-6 py-[9px] bg-primary text-cream font-freight text-[16px] sm:text-[17px] transition-all duration-300 hover:bg-rust-dark rounded"
              >
                Make an enquiry <img src={arrowRight} alt="" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 font-semibold leading-[25px] px-6 py-[9px] border border-rust text-rust font-freight text-[16px] sm:text-[17px] transition-all duration-300 hover:bg-rust hover:text-cream rounded"
              >
                Book online <img src={arrowRust} alt="" />
              </Link>
            </div>
          </div>

          {/* Right — Phone/Bulbul image */}
          <div ref={imageRef} className="flex-1 flex justify-center lg:justify-end">
            <div className="w-full max-w-[500px] lg:max-w-none lg:w-[520px] h-[360px] sm:h-[440px] lg:h-[520px] overflow-hidden rounded-sm">
              <img
                src="/images/shared/people/friends-cocktails-dark-bar.png"
                alt="Book on Bulbul app"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
