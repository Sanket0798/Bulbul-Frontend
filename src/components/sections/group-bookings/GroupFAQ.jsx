import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQ_ITEMS = [
  {
    question: "Do you take group bookings for breakfast?",
    answer: "Yes, we offer group bookings for breakfast, lunch, and dinner. Simply get in touch with us to arrange a time that works for your party.",
  },
  {
    question: "What is the minimum group size?",
    answer: "We cater for groups of 8 or more. For smaller parties, you're welcome to book a regular table through our online reservation system.",
  },
  {
    question: "Can we choose from the full menu?",
    answer: "For groups, we offer a specially curated feast menu that includes a wide selection of our most popular dishes. You can choose from Non-Veg, Veg, or Vegan options.",
  },
  {
    question: "Is a deposit required?",
    answer: "Yes, we ask for a deposit which is used against your final bill. If you need to cancel, let us know 24 hours in advance for a full refund.",
  },
  {
    question: "Do you cater for dietary requirements?",
    answer: "Absolutely. We accommodate all dietary needs including vegan, gluten-free, and allergy-specific requirements. Please let us know when booking.",
  },
  {
    question: "How far in advance can we book?",
    answer: "We accept bookings up to four months in advance. For large parties of 16+ or specific event requests, please contact us directly.",
  },
];

export default function GroupFAQ() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        listRef.current.children,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: listRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="w-full pt-[61px] pb-[67px]">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">

        {/* Header */}
        <div ref={headerRef} className="mb-10 lg:mb-14">
          <span className="font-freight uppercase font-black text-[13px] sm:text-[14px] leading-[18px] tracking-widest text-terracotta block mb-3">
            Book for a First-Class Get-Together
          </span>

          <h2 className="font-freight text-[42px] sm:text-[56px] lg:text-[68px] leading-[48px] sm:leading-[62px] lg:leading-[74px] font-black text-rust-dark mb-3">
            FAQ'S
          </h2>

          <p className="font-freight font-semibold text-[15px] sm:text-[16px] lg:text-[17px] leading-[22px] text-terracotta">
            Answers to common queries about group feasting at Bulbul
          </p>
        </div>

        {/* FAQ list */}
        <div ref={listRef} className="flex flex-col">
          {FAQ_ITEMS.map(({ question, answer }, index) => (
            <div key={index} className="border-b border-terracotta/30">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-5 sm:py-6 cursor-pointer bg-transparent"
              >
                <span className="font-freight text-[20px] sm:text-[26px] lg:text-[30px] leading-[28px] sm:leading-[34px] lg:leading-[40px] font-semibold text-rust-dark text-left">
                  {question}
                </span>
                <span
                  className={`shrink-0 ml-4 text-rust-dark text-[24px] transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  &#8744;
                </span>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[200px] pb-5" : "max-h-0"
                }`}
              >
                <p className="font-freight font-medium text-[15px] sm:text-[16px] lg:text-[17px] leading-[22px] sm:leading-[24px] text-terracotta max-w-[700px]">
                  {answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
