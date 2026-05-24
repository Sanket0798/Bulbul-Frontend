import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

// ── Static data ───────────────────────────────────────────────────────────────
const FAQS = [
  { q: "Do you take group bookings for breakfast?" },
  { q: "What is the minimum group size for a group booking?" },
  { q: "Can we choose from different menu options for our group?" },
  { q: "Is a deposit required for group bookings?" },
  { q: "How far in advance can we book for a large group?" },
];

const GALLERY = [
  "/images/gallery/gallery1.webp",
  "/images/gallery/gallery2.webp",
  "/images/gallery/gallery3.webp",
  "/images/gallery/gallery4.webp",
];

// ── Shared small components ───────────────────────────────────────────────────
function ArrowIcon({ className = "stroke-current", size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none"
      className={`rotate-45 shrink-0 ${className}`}>
      <path d="M1 13L13 1M13 1H4M13 1V10" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionTag({ label, light = false }) {
  const color = light ? "border-accent-gold text-accent-gold" : "border-olive text-olive";
  return (
    <div className="flex items-center gap-3">
      <hr className={`w-12 m-0 opacity-100 ${color}`} />
      <span className={`font-josefin text-caption uppercase tracking-[0.18em] ${color}`}>
        {label}
      </span>
    </div>
  );
}

// Reusable form field — dark background variant
function FormField({ label, placeholder, type = "text", required = false }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-josefin text-body-xs text-cream/70">
        {label}{required && <span className="text-accent-gold"> *</span>}
      </label>
      <input type={type} placeholder={placeholder} required={required}
        className="form-field" />
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function GroupBookings() {
  const pageRef  = useRef(null);
  const [openFaq, setOpenFaq]     = useState(null);
  const [agreed, setAgreed]       = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-animate]").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" } }
        );
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    e.target.reset();
    setAgreed(false);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-bg-inner">
      <Navbar transparent />

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden flex items-end min-h-screen bg-charcoal">
        <img src="/images/bg/choose.webp" alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 overlay-hero-left" />
        <div className="absolute inset-0 overlay-hero-bottom" />
        <div className="absolute top-0 left-0 right-0 h-[3px] z-10 accent-line-rust-gold" />

        <div className="relative z-10 w-full max-w-page mx-auto px-15 pb-24 pt-[120px]">
          <div className="max-w-[600px]">
            <SectionTag label="Crowd-pleasing plates to share" light />
            <h1 className="font-freight text-h1 text-cream font-normal mt-5 mb-6">
              Group Feast <span className="italic text-accent-gold">Menus</span>
            </h1>
            <p className="font-josefin text-body-sm text-cream/75 mb-10 max-w-[520px]">
              Finest snacks, grills, ruby murrays, fragrant biryanis, naans, rotis and
              sweet puddings. Delicious and copious dishes that laden tables with café
              favourites to share at breakfast, lunch and dinner.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/rooms" className="btn-outline-white inline-flex items-center gap-3">
                View Menu <ArrowIcon />
              </Link>
              <a href="#enquiry" className="btn-outline-white inline-flex items-center gap-3">
                Make an Enquiry <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          GALLERY STRIP
      ════════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-charcoal/95">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {GALLERY.map((src, i) => (
            <div key={i} className="group relative overflow-hidden h-[300px]">
              <img src={src} alt={`Group dining ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-rust/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PARTY HEARTILY
      ════════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 bg-rust/5">
        <div className="max-w-page mx-auto px-15">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

            {/* Text */}
            <div className="flex flex-col gap-6 flex-1 max-w-[560px]" data-animate>
              <SectionTag label="Much to enjoy, little to do" />
              <h2 className="font-freight text-h2 font-normal">
                <span className="text-rust">Party Heartily, </span>
                <span className="italic text-accent-gold">Fuss-free</span>
              </h2>
              <p className="font-josefin text-body-sm text-rust/85">
                Finest snacks, grills, ruby murrays, fragrant biryanis, naans, rotis and
                sweet puddings. Choose from Non-Veg., Veg. or Vegan menus upon arrival,
                whichever combination you please — no need to order ahead. All appetites
                will be pleased and leave most sated.
              </p>
              <Link to="/rooms" className="btn-outline-primary-inner inline-flex items-center gap-3 self-start">
                View Menu <ArrowIcon className="stroke-rust" />
              </Link>
            </div>

            {/* Overlapping image pair */}
            <div className="relative shrink-0 w-full lg:w-[620px] h-[480px]" data-animate>
              <div className="absolute top-0 left-0 w-[48%] h-[55%] overflow-hidden rounded-sm">
                <img src="/images/gallery/gallery5.webp" alt="Group dining"
                  className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-[60%] h-[65%] overflow-hidden rounded-sm shadow-2xl">
                <img src="/images/gallery/gallery6.webp" alt="Group feast"
                  className="w-full h-full object-cover" />
              </div>
              {/* Accent border */}
              <div className="absolute top-[10%] right-[5%] w-[55%] h-[55%] rounded-sm border-2 border-accent-gold/25 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          GROUP RESERVATIONS INFO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 bg-charcoal">
        <div className="max-w-page mx-auto px-15">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

            {/* Image */}
            <div className="relative shrink-0 w-full lg:w-[580px] h-[500px] overflow-hidden rounded-sm" data-animate>
              <img src="/images/bg/moment.webp" alt="Group reservation"
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 overlay-hero-bottom" />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-6 flex-1" data-animate>
              <SectionTag label="Book for a first-class get-together" light />
              <h2 className="font-freight text-h2 text-cream font-normal">
                Group <span className="italic text-accent-gold">Reservations</span>
              </h2>
              <div className="flex flex-col gap-5">
                <p className="font-josefin text-body-sm text-cream/65">
                  A good meal can gladden the heart. A fine gathering, more so. Come —
                  eat, drink and be joyful. It will be our delight to host you.
                </p>
                <p className="font-josefin text-body-sm text-cream/65">
                  We accept bookings online up to four months in advance. For large
                  parties of 16+ or for specific event requests, do get in touch with
                  us directly to book.
                </p>
                <p className="font-josefin text-body-sm text-cream/65">
                  For any group, we do ask for a deposit, which is used against your
                  final bill. If you need to cancel, let us know 24 hours in advance
                  and we will gladly refund your deposit.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-2">
                <a href="#enquiry" className="btn-outline-white inline-flex items-center gap-3">
                  Make an Enquiry <ArrowIcon />
                </a>
                <Link to="/contact" className="btn-outline-white inline-flex items-center gap-3">
                  Book Online <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FAQ ACCORDION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 bg-charcoal/95">
        <div className="max-w-page mx-auto px-15">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

            {/* Header */}
            <div className="shrink-0 lg:w-[380px]" data-animate>
              <SectionTag label="Common questions" light />
              <h2 className="font-freight text-h2 text-cream font-normal mt-4">
                FAQ<span className="italic text-accent-gold">'S</span>
              </h2>
              <p className="font-josefin text-body-xs text-cream/50 mt-4">
                Answers to common queries about group feasting at Bulbul.
              </p>
            </div>

            {/* Accordion */}
            <div className="flex-1 w-full" data-animate>
              {FAQS.map((faq, i) => (
                <div key={i} className="border-b border-cream/10">
                  <button
                    className="w-full flex items-center justify-between py-5 text-left"
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

      {/* ════════════════════════════════════════════════════════════════════
          ENQUIRY FORM
      ════════════════════════════════════════════════════════════════════ */}
      <section id="enquiry" className="w-full py-24 bg-rust/5">
        <div className="max-w-page mx-auto px-15">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

            {/* Left image */}
            <div className="relative shrink-0 w-full lg:w-[580px] h-[600px] overflow-hidden rounded-sm" data-animate>
              <img src="/images/bg/testimonial.webp" alt="Group dining"
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 overlay-hero-bottom" />
            </div>

            {/* Form */}
            <div className="flex-1 w-full" data-animate>
              <SectionTag label="Contact us" />
              <h2 className="font-freight text-h2 font-normal mt-4 mb-8">
                <span className="text-rust">Make an </span>
                <span className="italic text-accent-gold">Enquiry</span>
              </h2>

              {submitted && (
                <div className="mb-6 px-5 py-4 font-josefin text-body-xs bg-olive/15 border border-olive text-olive">
                  Thank you! We'll be in touch shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Name" placeholder="Enter your full name" required />
                  <FormField label="Email Address" placeholder="Enter your email" type="email" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Phone Number" placeholder="Enter your phone" type="tel" />
                  <FormField label="Date of Booking" placeholder="DD / MM / YYYY" type="date" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Number of Guests" placeholder="e.g. 12" type="number" required />
                  <div className="flex flex-col gap-2">
                    <label className="font-josefin text-body-xs text-cream/70">Occasion</label>
                    <select className="form-field">
                      <option value="" className="bg-charcoal">Select occasion</option>
                      <option value="birthday" className="bg-charcoal">Birthday</option>
                      <option value="anniversary" className="bg-charcoal">Anniversary</option>
                      <option value="corporate" className="bg-charcoal">Corporate Event</option>
                      <option value="other" className="bg-charcoal">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-josefin text-body-xs text-cream/70">Notes</label>
                  <textarea rows={4}
                    placeholder="Dietary preferences, occasion, or anything you'd like us to know"
                    className="form-field resize-none" />
                </div>

                {/* Consent checkbox */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    className={`shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center border transition-all duration-200 cursor-pointer
                      ${agreed ? "bg-accent-gold border-accent-gold" : "bg-transparent border-cream/30"}`}
                    onClick={() => setAgreed((v) => !v)}>
                    {agreed && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <span className="font-josefin text-caption text-cream/50">
                    I consent to receive occasional emails from Bulbul, including updates,
                    events, and news, in line with our Privacy Policy.
                  </span>
                </label>

                <button type="submit"
                  className="btn-outline-white inline-flex items-center gap-3 self-start mt-2">
                  Subscribe <ArrowIcon />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
