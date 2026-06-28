import { useEffect, useRef, useState } from "react";
import { gsap, afterFonts, NO_PREFERENCE, REDUCED_MOTION } from "@/utils/animations";

const FAQ_DATA = [
  {
    category: "Reservations, Walk-Ins & Queue Policies",
    questions: [
      {
        q: "Do I need to book a table, or can I just walk in?",
        a: "We welcome both! If the restaurant is full when you arrive, our hosts will gladly add you to our virtual queue. For guaranteed times—especially during busy corporate lunch hours and weekend evenings—we highly recommend booking online.",
      },
      {
        q: "What is the maximum group size I can book online?",
        a: "You can reserve a table for up to six guests directly through our online booking system. For groups of seven or more, corporate events, or private dining enquiries, please visit our Group Dining & Events page or email our team directly.",
      },
      {
        q: "How long will I have my table for?",
        a: "To ensure a seamless dining flow and look after all our guests smoothly, our table allocations for lunch are 1 hr 15 minutes and dinner is 2 hrs.",
      },
      {
        q: "Do you require a deposit or credit card details to book?",
        a: "To secure reservations during peak dining hours and for larger groups, we require credit card details. No upfront charge is made to your card. However, a fee of £20 per person will apply if the reservation is cancelled or the party size is reduced by more than half within 24 hours of the booking time, or in the case of a complete no-show.",
      },
      {
        q: "What happens if I am running late for my reservation?",
        a: "We hold all reserved tables for a maximum of 15 minutes. If you are running late, please let us know via your booking confirmation link. If we do not hear from you, we may have to release the table to guests waiting in our walk-in queue.",
      },
      {
        q: "Can I request a specific area, like the fountain courtyard or a semi-private booth?",
        a: "You are welcome to note any preferences during your booking process! While we always do our absolute best to accommodate your requests, we cannot guarantee specific tables or seating areas in advance as they depend on the flow of the room on the day.",
      },
      {
        q: "Can I amend my reservation party size?",
        a: "You can easily amend your booking size online up to 24 hours in advance using your booking confirmation link, subject to table availability. If you need to make changes within 24 hours of your reservation, please call or email us directly. Please note that for larger groups, reducing your party size by more than half within 24 hours may incur a fee of £20 per missing person.",
      },
      {
        q: "What times are you open?",
        a: "Mondays to Saturdays - 11:45 am to 10:30 pm",
      },
    ],
  },
  {
    category: "Group Bookings, Private Dining & Special Events",
    questions: [
      {
        q: "What is considered a group booking at Bulbul?",
        a: "Any reservation for seven or more guests is considered a group booking. These reservations cannot be made through our standard online booking portal. To arrange a group experience, please submit an enquiry through our online Events Form or contact our dedicated events team via email.",
      },
      {
        q: "Do larger groups have to dine from a set menu?",
        a: "Yes. To ensure an exceptional pace of service from our kitchen and a seamless dining experience for your party, groups of seven or more are required to dine from one of our specially curated Feast Sharing Menus.",
      },
      {
        q: "Can you accommodate dietary requirements and allergies within a set group menu?",
        a: "Absolutely. We tailor our Feast Menus to accommodate all dietary restrictions, including vegetarian, vegan, halal, and gluten-free requirements. We ask that you share your party's final dietary details and allergies with our events team at least 72 hours prior to your booking.",
      },
      {
        q: "What is your cancellation policy for group bookings?",
        a: "For group bookings of 7 to 20 guests, we require a final confirmation of guest numbers and any cancellations at least 48 hours in advance. Cancellations, significant drops in party numbers, or no-shows inside this 48-hour window will incur a charge of the full cost of the selected set menu per missing guest.",
      },
      {
        q: "Do you have private dining rooms (PDR) or semi-private spaces?",
        a: "Yes! Bulbul features an exclusive, intimate private dining room that comfortably seats up to 8 guests. Additionally, our dramatic, maximalist indoor fountain courtyard can be partitioned or reserved for larger semi-private group gatherings.",
      },
      {
        q: "Is the restaurant available for full venue buyout or private hire?",
        a: "Yes, Bulbul can be hired exclusively for large-scale corporate showcases, media launches, weddings, or grand celebrations. Please reach out directly to our events manager with your proposed dates for a bespoke quote.",
      },
      {
        q: "Can we bring our own decorations, flowers, or AV equipment for a private event?",
        a: "For bookings in our private dining room or full venue hire, you are more than welcome to bring custom floral arrangements, menus, and place cards. For full venue buyouts, external AV equipment, DJ setups, and branding installations are permitted, subject to prior approval.",
      },
      {
        q: "Do you host events?",
        a: "Yes, we regularly host custom events, brand showcases, and seasonal celebrations. Keep an eye on our social media platforms and website for upcoming event listings.",
      },
    ],
  },
  {
    category: "Dress Code & Restaurant Vibe",
    questions: [
      {
        q: "Do you have an official dress code?",
        a: "Our dress code is smart-casual. We want you to feel relaxed yet elegant. While we love a high-energy, design-led independent dining atmosphere, we ask that guests refrain from wearing gym-wear, beachwear, or heavily torn clothing.",
      },
      {
        q: "Can I take photos or film inside the restaurant?",
        a: "You are more than welcome to take personal photos and videos at your table. However, we strictly prohibit flash photography, professional filming equipment, tripods, or moving around the room to shoot content without prior management approval.",
      },
    ],
  },
  {
    category: "Dietary Requirements, Allergens & Sourcing",
    questions: [
      {
        q: "How do you handle severe food allergies and intolerances?",
        a: "Your safety is our top priority. We maintain a detailed allergen matrix for our entire menu. Please inform your server of any severe allergies before ordering. While we take every precaution, our open kitchen handles nuts, dairy, gluten, and seafood daily.",
      },
      {
        q: "Is your meat Halal?",
        a: "Yes. All of our chicken, lamb, and goat are sourced from fully certified Halal suppliers.",
      },
      {
        q: "Do you have plenty of options for vegetarians, vegans, and gluten-free diets?",
        a: "Absolutely. Our menu is deeply rooted in regional Indian home-style cooking, which naturally celebrates vibrant plant-based dishes. We offer an expansive selection of dedicated vegetarian, vegan, and gluten-free small plates and mains.",
      },
      {
        q: "Can I bring my own wine or champagne (Corkage)?",
        a: "No, we do not allow outside alcohol. For event corkage enquiries please get in touch with our events team.",
      },
      {
        q: "Can I bring a celebratory cake for a birthday or special occasion?",
        a: "You are welcome to bring a celebratory cake; we charge a \u2018cakeage\u2019 fee of \u00a35 per guest dining at the table. Alternatively, our kitchen team can arrange a complimentary birthday dessert with a candle if you note the occasion on your booking!",
      },
    ],
  },
  {
    category: "Delivery & Takeaway",
    questions: [
      {
        q: "Do you offer takeaway/click and collect at your restaurant?",
        a: "Yes! We offer a takeaway and collection service. Local City workers can pre-order and collect their favourite plates directly from our team.",
      },
      {
        q: "Can we take home leftovers from our meal?",
        a: "Absolutely. We hate to see great food go to waste. Simply ask your server, and our team will happily pack your leftovers in sustainable, eco-friendly takeaway boxes.",
      },
      {
        q: "Can I use my gift vouchers on Deliveroo?",
        a: "No, our gift vouchers can only be redeemed directly with us for in-house dining or direct collection services.",
      },
    ],
  },
  {
    category: "Notes on Payment, Corporate Accounts & Vouchers",
    questions: [
      {
        q: "Can I pay with cash?",
        a: "Yes, we accept cash and all major credit and debit cards (Visa, Mastercard, American Express), as well as contactless mobile payments (Apple Pay).",
      },
      {
        q: "Is a service charge automatically added to the bill?",
        a: "A discretionary service charge of 12.5% is added to your final bill. Every penny is distributed entirely among our front-of-house and kitchen staff.",
      },
      {
        q: "Can our company set up a corporate billing account?",
        a: "Yes! We offer dedicated B2B account structures for local firms, legal chambers, and financial institutions. Please contact our corporate partnerships manager to set this up.",
      },
      {
        q: "How can I request a duplicate itemized VAT receipt?",
        a: "Simply email our team with the date of your visit, the approximate time, the last 4 digits of the card used, and the total bill amount. We will email you a digital VAT copy within 24 hours.",
      },
      {
        q: "Do you offer gift vouchers? How many can I use per transaction?",
        a: "Yes, we offer gift vouchers. You can use multiple valid Bulbul vouchers within a single transaction.",
      },
    ],
  },
  {
    category: "Safety, Accessibility & Facilities",
    questions: [
      {
        q: "Are you wheelchair-accessible?",
        a: "Yes! Our main entrance, ground-floor dining spaces, fountain courtyard, and dedicated accessible facilities are entirely step-free and fully wheelchair accessible.",
      },
      {
        q: "Is it possible to sit in a quieter area of the restaurant?",
        a: "Our main room carries a vibrant energy. However, if you are looking for a quieter pocket, please let our hosts know upon arrival or note it in your booking.",
      },
      {
        q: "Do you have parking?",
        a: "Being located on Tudor Street in the heart of Blackfriars (EC4Y), we do not have dedicated on-site parking. We highly recommend arriving via public transport; we are just a short walk from Blackfriars Station, City Thameslink, and Temple Station.",
      },
      {
        q: "Do you have a cloakroom?",
        a: "Yes, we have a complimentary cloakroom facility where our hosts can securely store your coats, umbrellas, and small shopping bags.",
      },
      {
        q: "Do you have WiFi?",
        a: "Yes, we provide complimentary guest Wi-Fi for all our diners. Simply ask our hosting team.",
      },
      {
        q: "I\u2019ve lost or left something in the restaurant, what should I do?",
        a: "Please email our team with a detailed description of the item, the date and time of your visit, and the name your booking was under.",
      },
    ],
  },
  {
    category: "Getting in Touch",
    questions: [
      {
        q: "Can I leave feedback?",
        a: "Yes! We love hearing about your experience. Please email your thoughts to hello@bulbullondon.com.",
      },
      {
        q: "How can we contact you?",
        a: "You can email hello@bulbullondon.com or write to us at: Butter Chicken Hospitality Ltd. (T/A Bulbul), 25 Tudor Street, Victoria House, London, EC4Y 0DD.",
      },
      {
        q: "I would love to work for Bulbul.",
        a: "We are always on the lookout for talented individuals! Please send your CV and a brief introduction to hello@bulbullondon.com.",
      },
    ],
  },
];

function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef(null);

  useEffect(() => {
    if (answerRef.current) {
      if (isOpen) {
        gsap.to(answerRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(answerRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }
  }, [isOpen]);

  return (
    <div className="border-b border-accent-gold/15 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span className="font-freight text-[20px] sm:text-[24px] lg:text-[28px] leading-[1.3] font-semibold text-terracotta text-left group-hover:text-rust-dark transition-colors duration-300">
          {question}
        </span>
        <span className="font-freight font-black text-xl sm:text-3xl leading-[22px] sm:leading-[24px] text-terracotta select-none">
          {isOpen ? "\u2212" : "+"}
        </span>
      </button>
      <div
        ref={answerRef}
        className="overflow-hidden h-0 opacity-0"
        aria-hidden={!isOpen}
      >
        <p className="font-freight font-medium text-[14px] sm:text-[16px] leading-[1.7] text-terracotta/90 pb-4 pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function Faqs() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(NO_PREFERENCE, () => afterFonts(sectionRef, () => {
        // Hero heading animation - clipPath reveal
        gsap.fromTo(heroRef.current,
          { clipPath: "inset(0 0 100% 0)", opacity: 0, filter: "blur(6px)" },
          { clipPath: "inset(0 0 0% 0)", opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
        );

        // Content sections stagger in
        gsap.fromTo(contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: contentRef.current, start: "top 85%" },
          }
        );
      }));

      mm.add(REDUCED_MOTION, () => {
        gsap.set([heroRef.current, contentRef.current.children], { autoAlpha: 1, clearProps: "transform,filter,clipPath" });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-bg-inner min-h-screen">
      {/* Hero banner */}
      <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[400px] overflow-hidden">
        <img
          src="/images/bg/aboutbg.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-end w-full max-w-[900px] mx-auto px-5 sm:px-8 lg:px-0 pb-10 sm:pb-14 lg:pb-16 pt-[100px]">
          <div ref={heroRef}>
            <span className="block font-freight text-[13px] sm:text-[14px] uppercase font-black tracking-widest text-accent-gold mb-2">
              Legal
            </span>
            <h1 className="font-freight text-cream font-black text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.1]">
              FAQ&apos;S
            </h1>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="w-full max-w-[900px] mx-auto px-5 sm:px-8 lg:px-0 py-12 sm:py-16 lg:py-20">
        <div ref={contentRef} className="flex flex-col gap-10 sm:gap-12">
          {FAQ_DATA.map((section) => (
            <div key={section.category}>
              <h2 className="font-freight text-[20px] sm:text-[36px] font-semibold text-rust-dark mb-4 leading-tight border-l-[3px] border-accent-gold pl-4">
                {section.category}
              </h2>
              <div className="pl-0 sm:pl-2">
                {section.questions.map((item) => (
                  <AccordionItem
                    key={item.q}
                    question={item.q}
                    answer={item.a}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
