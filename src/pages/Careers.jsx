import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

// ── Static data ───────────────────────────────────────────────────────────────
const WHY_WORK = [
  {
    title: "Creative Culture",
    desc: "We encourage bold ideas and celebrate the people who bring them to life every day.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent-gold">
        <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 22C10.477 26 6 21.523 6 16S10.477 6 16 6s10 4.477 10 10-4.477 10-10 10zm-1-15h2v6h-2zm0 8h2v2h-2z"
          fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Growth & Learning",
    desc: "From day one, you'll have access to training, mentorship, and real opportunities to grow.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent-gold">
        <path d="M16 2L20.09 11.26L30 12.27L23 19.14L24.18 29L16 24.27L7.82 29L9 19.14L2 12.27L11.91 11.26L16 2Z"
          fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Meaningful Work",
    desc: "Every role at Bulbul contributes to something bigger — a dining experience people remember.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent-gold">
        <path d="M26 10H22V8C22 5.794 20.206 4 18 4H14C11.794 4 10 5.794 10 8V10H6C4.897 10 4 10.897 4 12V26C4 27.103 4.897 28 6 28H26C27.103 28 28 27.103 28 26V12C28 10.897 27.103 10 26 10ZM12 8C12 6.897 12.897 6 14 6H18C19.103 6 20 6.897 20 8V10H12V8ZM26 26H6V12H26V26Z"
          fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Inclusive Team",
    desc: "We are a team that shows up for each other — diverse, welcoming, and proud of it.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent-gold">
        <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm1 17h-2v-6h2v6zm0-8h-2V9h2v4z"
          fill="currentColor" />
      </svg>
    ),
  },
];

const OPEN_POSITIONS = [
  { title: "Head Chef",              dept: "Kitchen",    type: "Full-time", location: "London" },
  { title: "Sous Chef",              dept: "Kitchen",    type: "Full-time", location: "London" },
  { title: "Front of House Manager", dept: "Operations", type: "Full-time", location: "London" },
  { title: "Bartender",              dept: "Bar",        type: "Part-time", location: "London" },
  { title: "Waiter / Waitress",      dept: "Service",    type: "Part-time", location: "London" },
  { title: "Marketing Coordinator",  dept: "Marketing",  type: "Full-time", location: "Remote" },
];

const TEAM_GALLERY = [
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
export default function Careers() {
  const pageRef = useRef(null);
  const [position, setPosition]   = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [coverName, setCoverName]   = useState("");

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
    setResumeName("");
    setCoverName("");
    setPosition("");
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-bg-inner">
      <Navbar transparent />

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden flex items-end min-h-screen bg-charcoal">
        <img src="/images/bg/choose.webp" alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 overlay-hero-left" />
        <div className="absolute inset-0 overlay-hero-bottom" />
        <div className="absolute top-0 left-0 right-0 h-[3px] z-10 accent-line-rust-gold" />

        <div className="relative z-10 w-full max-w-page mx-auto px-15 pb-24 pt-[120px]">
          <div className="max-w-[600px]">
            <SectionTag label="Our Values" light />
            <h1 className="font-freight text-h1 text-cream font-normal mt-5 mb-6">
              Built by People <span className="italic text-accent-gold">Who Care</span>
            </h1>
            <p className="font-josefin text-body-sm text-cream/75 mb-10 max-w-[520px]">
              The food matters. The bar matters. The service matters. But more than
              anything, it's the people behind it — a team that takes pride in every
              detail and shows up for each other every single day.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/rooms" className="btn-outline-white inline-flex items-center gap-3">
                View Menu <ArrowIcon />
              </Link>
              <a href="#apply" className="btn-outline-white inline-flex items-center gap-3">
                Make an Enquiry <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          HERO IMAGE GRID
      ════════════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-charcoal/95">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {["/images/gallery/gallery7.webp", "/images/gallery/gallery8.webp", "/images/gallery/gallery9.webp"].map((src, i) => (
            <div key={i} className="group relative overflow-hidden h-[340px]">
              <img src={src} alt={`Team ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-rust/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          WHY WORK WITH US
      ════════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 bg-rust/5">
        <div className="max-w-page mx-auto px-15">
          <div className="mb-14" data-animate>
            <SectionTag label="Why Work With Us" />
            <h2 className="font-freight text-h2 font-normal mt-4">
              <span className="text-rust">Why Work With </span>
              <span className="italic text-accent-gold">Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_WORK.map(({ icon, title, desc }) => (
              <div key={title}
                className="flex flex-col gap-5 p-7 border border-rust/20 bg-rust/4 transition-all duration-300"
                data-animate>
                <div className="w-14 h-14 flex items-center justify-center rounded-sm bg-accent-gold/8 border border-accent-gold/20">
                  {icon}
                </div>
                <h4 className="font-freight text-h4 text-charcoal">{title}</h4>
                <p className="font-josefin text-body-xs text-charcoal/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          OPEN POSITIONS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 bg-charcoal">
        <div className="max-w-page mx-auto px-15">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
            <div data-animate>
              <SectionTag label="Open Positions" light />
              <h2 className="font-freight text-h2 text-cream font-normal mt-4">
                Current <span className="italic text-accent-gold">Opportunities</span>
              </h2>
            </div>
            <p className="font-josefin text-body-xs text-cream/50 max-w-[500px]" data-animate>
              We're always looking for passionate, talented people to join our team.
              If you don't see a role that fits, send us your CV anyway.
            </p>
          </div>

          <div className="flex flex-col" data-animate>
            {OPEN_POSITIONS.map(({ title, dept, type, location }) => (
              <div key={title}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 cursor-pointer border-b border-cream/8 transition-colors duration-300">
                <div className="flex flex-col gap-1">
                  <h4 className="font-freight text-h4 text-cream group-hover:text-accent-gold transition-colors duration-300">
                    {title}
                  </h4>
                  <div className="flex items-center gap-3">
                    <span className="font-josefin text-caption uppercase tracking-widest text-cream/40">{dept}</span>
                    <span className="text-cream/20">·</span>
                    <span className="font-josefin text-caption uppercase tracking-widest text-cream/40">{location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-josefin text-caption px-3 py-1 border
                    ${type === "Full-time" ? "border-accent-gold text-accent-gold" : "border-cream/20 text-cream/40"}`}>
                    {type}
                  </span>
                  <a href="#apply"
                    className="font-josefin text-caption uppercase tracking-widest text-cream/40 no-underline group-hover:text-accent-gold transition-colors duration-300">
                    Apply →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          TEAM GALLERY + QUOTE
      ════════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 bg-charcoal/95">
        <div className="max-w-page mx-auto px-15">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-20">

            {/* Gallery grid */}
            <div className="flex-1 grid grid-cols-2 gap-4" data-animate>
              {TEAM_GALLERY.map((src, i) => (
                <div key={i}
                  className={`group relative overflow-hidden rounded-sm ${i % 2 === 0 ? "h-[280px]" : "h-[220px]"}`}>
                  <img src={src} alt={`Team ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-rust/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            {/* Quote block */}
            <div className="shrink-0 lg:w-[480px] flex flex-col gap-8" data-animate>
              <SectionTag label="Team Experience" light />
              <h2 className="font-freight text-h2 text-cream font-normal">
                Moments Behind <span className="italic text-accent-gold">the Scenes</span>
              </h2>
              <div className="flex flex-col gap-4 p-6 border border-accent-gold/15 bg-accent-gold/3">
                <blockquote className="font-freight italic text-h4 text-cream">
                  "The best experiences are created by people who love what they do."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-accent-gold" />
                  <span className="font-josefin text-caption uppercase tracking-widest text-accent-gold">
                    Bulbul Team
                  </span>
                </div>
              </div>
              <a href="#apply" className="btn-outline-white inline-flex items-center gap-3 self-start">
                Apply Now <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          APPLICATION FORM
      ════════════════════════════════════════════════════════════════════ */}
      <section id="apply" className="w-full py-24 bg-rust/5">
        <div className="max-w-page mx-auto px-15">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

            {/* Left panel */}
            <div className="shrink-0 lg:w-[420px]" data-animate>
              <SectionTag label="Application Form" />
              <h2 className="font-freight text-h2 font-normal mt-4 mb-4">
                <span className="text-rust">Make an </span>
                <span className="italic text-accent-gold">Application</span>
              </h2>
              <p className="font-josefin text-body-xs text-rust/70">
                If you'd like to be part of the team, we'd love to hear from you.
              </p>
              <div className="mt-10 overflow-hidden rounded-sm h-[280px]">
                <img src="/images/bg/testimonial.webp" alt="Bulbul team"
                  className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 w-full" data-animate>
              {submitted && (
                <div className="mb-6 px-5 py-4 font-josefin text-body-xs bg-olive/15 border border-olive text-olive">
                  Application submitted! We'll review it and get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <FormField label="Name" placeholder="Enter your full name" required />
                <FormField label="Email Address" placeholder="Enter your email" type="email" required />
                <FormField label="Phone Number" placeholder="Enter your phone number" type="tel" />

                {/* Position dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="font-josefin text-body-xs text-cream/70">
                    Position Applying For <span className="text-accent-gold">*</span>
                  </label>
                  <select required value={position} onChange={(e) => setPosition(e.target.value)}
                    className="form-field">
                    <option value="" className="bg-charcoal">Select a position</option>
                    {OPEN_POSITIONS.map((p) => (
                      <option key={p.title} value={p.title} className="bg-charcoal">{p.title}</option>
                    ))}
                    <option value="other" className="bg-charcoal">Other / General Application</option>
                  </select>
                </div>

                {/* Resume upload */}
                <div className="flex flex-col gap-2">
                  <label className="font-josefin text-body-xs text-cream/70">
                    Upload Resume <span className="text-accent-gold">*</span>
                  </label>
                  <div className="w-full px-5 py-4 flex items-center gap-4 bg-cream/5 border border-cream/15">
                    <label className="font-josefin text-caption px-4 py-2 cursor-pointer border border-accent-gold text-accent-gold bg-accent-gold/6">
                      Choose file
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden" required
                        onChange={(e) => setResumeName(e.target.files[0]?.name || "")} />
                    </label>
                    <span className={`font-josefin text-caption ${resumeName ? "text-cream" : "text-cream/30"}`}>
                      {resumeName || "No file chosen"}
                    </span>
                  </div>
                </div>

                {/* Cover letter upload */}
                <div className="flex flex-col gap-2">
                  <label className="font-josefin text-body-xs text-cream/70">Upload Cover Letter</label>
                  <div className="w-full px-5 py-4 flex items-center gap-4 bg-cream/5 border border-cream/15">
                    <label className="font-josefin text-caption px-4 py-2 cursor-pointer border border-cream/30 text-cream/50 bg-transparent">
                      Choose file
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                        onChange={(e) => setCoverName(e.target.files[0]?.name || "")} />
                    </label>
                    <span className={`font-josefin text-caption ${coverName ? "text-cream" : "text-cream/30"}`}>
                      {coverName || "No file chosen"}
                    </span>
                  </div>
                </div>

                <button type="submit"
                  className="btn-outline-white inline-flex items-center gap-3 self-start mt-2">
                  Submit Application <ArrowIcon />
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
