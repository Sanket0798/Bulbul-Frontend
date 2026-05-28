import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

// ── Static data ───────────────────────────────────────────────────────────────
const STATS = [
  { value: "15+",  label: "Signature Dishes" },
  { value: "50K+", label: "Happy Guests"     },
  { value: "10+",  label: "Years Experience" },
];

const EXPERIENCE_CARDS = [
  { img: "/images/index/services1.webp", title: "Explore Menu",    subtitle: "Elegant dishes preview"  },
  { img: "/images/index/services2.webp", title: "Reservations",    subtitle: "Reserve table instantly" },
  { img: "/images/index/Room1.webp",     title: "Online Ordering", subtitle: "Order your favorites"    },
];

const GALLERY_IMAGES = [
  "/images/gallery/gallery1.webp",
  "/images/gallery/gallery2.webp",
  "/images/gallery/gallery3.webp",
  "/images/gallery/gallery4.webp",
  "/images/gallery/gallery5.webp",
  "/images/gallery/gallery6.webp",
];

const TEAM_AVATARS = ["john", "kate", "evan", "daisy"];

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

// ── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  const pageRef = useRef(null);

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

  return (
    <div ref={pageRef} className="min-h-screen bg-bg-inner">
      <Navbar transparent />

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden flex items-end min-h-screen bg-charcoal">
        <img src="/images/bg/aboutbg.webp" alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 overlay-hero-left" />
        <div className="absolute inset-0 overlay-hero-bottom" />
        <div className="absolute top-0 left-0 right-0 h-[3px] z-10 accent-line-rust-gold" />

        <div className="relative z-10 w-full max-w-page mx-auto px-5 sm:px-8 lg:px-15 pb-24 pt-[120px]">
          <div className="max-w-[640px]">
            <SectionTag label="About Our Restaurant" light />
            <h1 className="font-freight text-h1 text-cream font-normal mt-5 mb-6">
              Where Flavor Meets{" "}
              <span className="italic text-accent-gold">Our Emotions</span>
            </h1>
            <p className="font-josefin text-body-sm text-cream/75 mb-8 max-w-[480px]">
              Bulbul is founded by Chef Rohan D'Souza and restaurateur Twinkle Keswani.
              Between them, they have spent years opening and running restaurants across
              India, picking up ideas, habits, and a fairly strong point of view on how
              people like to eat.
            </p>
            <Link to="/contact" className="btn-outline-white inline-flex items-center gap-3">
              Know More <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          STORY — image left, text + stats right
      ════════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 overflow-hidden bg-rust/5">
        <div className="max-w-page mx-auto px-5 sm:px-8 lg:px-15">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

            {/* Large image */}
            <div className="relative shrink-0 w-full lg:w-[610px] h-[560px] overflow-hidden rounded-sm" data-animate>
              <img src="/images/bg/aboutbg.webp" alt="Bulbul interior"
                className="w-full h-full object-cover" />
            </div>

            {/* Text + stats */}
            <div className="flex flex-col gap-8 flex-1" data-animate>
              <SectionTag label="Our Story" />
              <h2 className="font-freight text-h2 font-normal">
                <span className="text-rust">Crafted with Flavor, </span>
                <span className="italic text-accent-gold">Served with Heart</span>
              </h2>
              <p className="font-josefin text-body-sm text-rust/85">
                Bulbul started with a simple thought. Indian food is far broader, more
                regional, and more nuanced than the handful of dishes it is often reduced
                to. Cooking styles change every few hundred kilometres, sometimes every
                few streets. It is shaped as much by homes and everyday cooking as it is
                by tradition.
              </p>

              {/* Stats */}
              <div className="flex flex-col gap-0 mt-2">
                {STATS.map(({ value, label }) => (
                  <div key={label}
                    className="flex items-center gap-5 border-b border-rust/15 pb-4 mb-4 last:border-0 last:mb-0">
                    <div className="shrink-0 w-[72px] h-[72px] flex items-center justify-center rounded-sm border border-rust/30 bg-rust/5">
                      <span className="font-freight text-h4 text-rust">{value}</span>
                    </div>
                    <span className="font-josefin text-label uppercase tracking-widest text-rust/70">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <Link to="/rooms" className="btn-outline-primary-inner inline-flex items-center gap-3 self-start">
                Explore <ArrowIcon className="stroke-rust" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SIGNATURE EXPERIENCE — 3 cards
      ════════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 bg-charcoal">
        <div className="max-w-page mx-auto px-5 sm:px-8 lg:px-15">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
            <div className="flex flex-col gap-4 max-w-[520px]" data-animate>
              <SectionTag label="Signature Experience" light />
              <h2 className="font-freight text-h2 text-cream font-normal">
                More Than Just <span className="italic text-accent-gold">Dining</span>
              </h2>
            </div>
            <p className="font-josefin text-body-xs text-cream/55 max-w-[580px]" data-animate>
              The menu moves across regions, bringing together dishes, references, and
              recipes drawn from homes, street-side cooking, and everyday meals. It is
              built around small plates, so you can try more, share across the table,
              and come back to the things you like.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXPERIENCE_CARDS.map(({ img, title, subtitle }) => (
              <div key={title} className="group relative overflow-hidden h-[420px]" data-animate>
                <img src={img} alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 overlay-card-bottom-dark" />
                <div className="absolute bottom-0 left-0 px-6 py-8 flex flex-col gap-1">
                  <span className="font-freight text-h4 text-cream">{title}</span>
                  <span className="font-freight italic text-body text-cream/65">{subtitle}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="font-josefin text-body-xs text-cream/45 mt-12 max-w-[660px]" data-animate>
            The bar takes a similar route, with cocktails that pick up on familiar
            flavours, pantry staples, and techniques you would recognise, reworked to
            sit easily alongside the food.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          GALLERY GRID
      ════════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 bg-charcoal/95">
        <div className="max-w-page mx-auto px-5 sm:px-8 lg:px-15">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
            <div className="flex flex-col gap-4" data-animate>
              <SectionTag label="Team Experience" light />
              <h2 className="font-freight text-h2 text-cream font-normal">
                Moments Behind <span className="italic text-accent-gold">the Scenes</span>
              </h2>
            </div>
            <blockquote className="font-freight italic text-body-lg text-cream/50 max-w-[500px] text-right" data-animate>
              "The best experiences are created by people who love what they do."
            </blockquote>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((src, i) => (
              <div key={i}
                className={`group relative overflow-hidden rounded-sm
                  ${i === 0 || i === 3 ? "h-[480px]" : "h-[230px]"}`}
                data-animate>
                <img src={src} alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-rust/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CHEF EXPERIENCE
      ════════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 bg-rust/5">
        <div className="max-w-page mx-auto px-5 sm:px-8 lg:px-15">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

            {/* Chef image */}
            <div className="relative shrink-0 w-full lg:w-[650px] h-[560px]" data-animate>
              <div className="w-full h-full overflow-hidden rounded-sm">
                <img src="/images/bg/moment.webp" alt="Head Chef Paul Jonas"
                  className="w-full h-full object-cover" />
              </div>
              {/* Name badge */}
              <div className="absolute bottom-6 left-6 px-5 py-4 rounded-sm bg-charcoal/90 border border-accent-gold/20">
                <p className="font-freight text-body-lg text-cream">Paul Jonas</p>
                <p className="font-josefin text-caption uppercase tracking-widest text-accent-gold mt-1">
                  Head Chef
                </p>
              </div>
            </div>

            {/* Chef text */}
            <div className="flex flex-col gap-6 flex-1" data-animate>
              <SectionTag label="Chef Experience" />
              <h2 className="font-freight text-h2 font-normal">
                <span className="text-rust">Passion Behind </span>
                <span className="italic text-accent-gold">Every Plate</span>
              </h2>
              <p className="font-josefin text-body-sm text-rust/85">
                Our culinary team combines creativity, craftsmanship, and authentic
                ingredients to deliver dishes that celebrate flavor, culture, and the
                joy of sharing great food.
              </p>

              <hr className="border-rust/20 my-2" />

              {/* Quote */}
              <blockquote className="font-freight italic text-h4 text-charcoal">
                "Great food is not just tasted — it is remembered."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-accent-gold" />
                <span className="font-josefin text-caption uppercase tracking-widest text-accent-gold">
                  Paul Jonas, Head Chef
                </span>
              </div>

              {/* Team avatars */}
              <div className="flex items-center mt-4">
                {TEAM_AVATARS.map((name, n) => (
                  <div key={name}
                    className={`w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-bg-inner ${n > 0 ? "-ml-3" : ""}`}>
                    <img src={`/images/contact/${name}.webp`} alt={name}
                      className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="-ml-3 w-[52px] h-[52px] rounded-full flex items-center justify-center border-2 border-accent-gold bg-accent-gold/10">
                  <span className="font-josefin text-caption text-accent-gold">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
