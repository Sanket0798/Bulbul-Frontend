import { useState } from "react";
import SectionTag from "@/components/common/SectionTag";

const FAQS = [
  { q: "Do you take group bookings for breakfast?" },
  { q: "What is the minimum group size for a group booking?" },
  { q: "Can we choose from different menu options for our group?" },
  { q: "Is a deposit required for group bookings?" },
  { q: "How far in advance can we book for a large group?" },
];

export default function GroupFAQ() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="w-full py-24 bg-charcoal/95">
      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

          <div className="shrink-0 lg:w-[380px]">
            <SectionTag label="Common questions" light />
            <h2 className="font-freight text-h2 text-cream font-normal mt-4">
              FAQ<span className="italic text-accent-gold">'S</span>
            </h2>
            <p className="font-josefin text-body-xs text-cream/50 mt-4">
              Answers to common queries about group feasting at Bulbul.
            </p>
          </div>

          <div className="flex-1 w-full">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-cream/10">
                <button
                  className="w-full flex items-center justify-between py-5 text-left cursor-pointer bg-transparent border-none"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}>
                  <span className={`font-josefin text-body-xs pr-8 transition-colors duration-300
                    ${openFaq === i ? "text-accent-gold" : "text-cream"}`}>
                    {faq.q}
                  </span>
                  <span className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full
                    border transition-all duration-300 font-josefin text-body
                    ${openFaq === i
                      ? "border-accent-gold text-accent-gold rotate-45"
                      : "border-cream/20 text-cream/40"}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="pb-5">
                    <p className="font-josefin text-body-xs text-cream/55">
                      Please contact us at{" "}
                      <a href="mailto:hello@bulbulrestaurant.com"
                        className="text-accent-gold no-underline">
                        hello@bulbulrestaurant.com
                      </a>{" "}
                      for more information.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
