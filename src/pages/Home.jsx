import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

// ── Static data ──────────────────────────────────────────────────────────────
const SERVICE_CARDS = [
  { img: "/images/index/services1.webp", title: "Explore Menu",    subtitle: "Elegant dishes preview",  to: "/rooms"   },
  { img: "/images/index/services2.webp", title: "Reservations",    subtitle: "Reserve table instantly", to: "/contact" },
  { img: "/images/index/Room1.webp",     title: "Online Ordering", subtitle: "Order your favorites",    to: "/rooms"   },
];

const MENU_ITEMS = [
  { num: "01", name: "Crispy Wings"   },
  { num: "02", name: "Butter Chicken" },
  { num: "03", name: "Grilled Steak"  },
  { num: "04", name: "Classic Slider" },
  { num: "05", name: "Dragon Roll"    },
];

const FEATURED_DISHES = [
  { img: "/images/index/Room1.webp", name: "Truffle Pasta",  desc: "Creamy indulgence finished with rich truffle aroma and parmesan perfection." },
  { img: "/images/index/Room2.webp", name: "Butter Chicken", desc: "Slow-cooked tender chicken in a rich, aromatic tomato-cream sauce."          },
  { img: "/images/index/Room3.webp", name: "Crispy Wings",   desc: "Golden-fried wings tossed in our signature spice blend."                     },
  { img: "/images/index/about.webp", name: "Dragon Roll",    desc: "A bold fusion roll with avocado, spicy tuna, and crispy tempura."             },
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

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const aboutRef    = useRef(null);
  const servicesRef = useRef(null);
  const menuRef     = useRef(null);
  const featuredRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [aboutRef, servicesRef, menuRef, featuredRef].forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current.querySelectorAll("[data-animate]"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 80%" } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <Navbar transparent />

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden flex items-center min-h-screen bg-charcoal">

        {/* Background image */}
        <img src="/images/bg/hero_bg.webp" alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-55" />

        {/* Gradient overlays — defined as named CSS classes in index.css */}
        <div className="absolute inset-0 overlay-hero-left" />
        <div className="absolute inset-0 overlay-hero-bottom" />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] z-10 accent-line-rust-gold" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-page mx-auto px-15 pt-28 pb-20">
          <div className="max-w-[700px]">

            <div className="mb-4">
              <SectionTag label="Handcrafted Goodness" light />
            </div>

            <h1 className="font-freight text-h1 text-cream font-normal mb-6">
              Flavors That Stay{" "}
              <span className="italic text-accent-gold">with You Forever</span>
            </h1>

            <p className="font-josefin text-body-sm text-cream/80 mb-8 max-w-[560px]">
              "We've grown up with a version of Indian food shaped by homes and
              everyday cooking, the kind that rarely makes it onto restaurant
              menus. At Bulbul, that is what comes to the table, gathered along
              the way and shared with you."
            </p>

            <Link to="/rooms" className="btn-outline-white inline-flex items-center gap-3">
              View our Menu <ArrowIcon />
            </Link>
          </div>

          {/* Watermark bird */}
          <img src="/images/brand/logo/Bird.png" alt=""
            className="absolute right-15 bottom-20 w-44 opacity-15 brightness-[10] hidden lg:block" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ABOUT SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section ref={aboutRef} className="w-full py-24 overflow-hidden bg-rust/5">
        <div className="max-w-page mx-auto px-15">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Image collage — pixel values converted to Tailwind arbitrary syntax */}
            <div className="relative shrink-0 w-full lg:w-[480px] h-[420px] lg:h-[500px]" data-animate>

              {/* Decorative border box */}
              <div className="absolute top-0 left-[87px] w-[240px] h-[380px] border-2 border-rust rounded-sm" />

              {/* Main image */}
              <div className="absolute top-[24px] left-0 w-[234px] h-[334px] overflow-hidden rounded-sm">
                <img src="/images/index/about.webp" alt="Bulbul restaurant interior"
                  className="w-full h-full object-cover" />
              </div>

              {/* Accent image */}
              <div className="absolute top-[206px] left-[170px] w-[310px] h-[257px] overflow-hidden rounded-sm shadow-xl">
                <img src="/images/index/easystay.webp" alt="Bulbul dining experience"
                  className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-6 max-w-[620px]" data-animate>
              <SectionTag label="Our Story" />
              <h2 className="font-freight text-h2 font-normal">
                <span className="text-rust">About </span>
                <span className="italic text-accent-gold">Bulbul</span>
              </h2>
              <p className="font-josefin text-body-sm text-rust/90">
                Bulbul started with a simple thought. Indian food is far broader,
                more regional, and more nuanced than the handful of dishes it is
                often reduced to. Cooking styles change every few hundred
                kilometres, sometimes every few streets. It is shaped as much by
                homes and everyday cooking as it is by tradition.
              </p>
              <Link to="/about" className="btn-outline-primary-home inline-flex items-center gap-3 self-start">
                Read More <ArrowIcon className="stroke-rust" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SERVICES SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section ref={servicesRef} className="w-full py-24 bg-olive/5">
        <div className="max-w-page mx-auto px-15">

          {/* Header row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 mb-16">
            <div className="flex flex-col gap-4 max-w-[520px]" data-animate>
              <SectionTag label="Our Service" />
              <h2 className="font-freight text-h2 font-normal">
                <span className="text-rust">The Heart of Great Food &amp; </span>
                <span className="italic text-accent-gold">Hospitality</span>
              </h2>
              <Link to="/rooms" className="btn-outline-primary-home inline-flex items-center gap-3 self-start">
                View our Menu <ArrowIcon className="stroke-rust" />
              </Link>
            </div>

            <div className="flex flex-col gap-5 max-w-[590px]" data-animate>
              <p className="font-josefin text-body-sm text-olive">
                The menu moves across regions, bringing together dishes,
                references, and recipes drawn from homes, street-side cooking,
                and everyday meals. It is presented in a way that feels lighter
                and more suited to how people like to eat today.
              </p>
              <div className="flex flex-wrap gap-6">
                {["Culinary Excellence", "Rich Cultural Flavors", "Inspired Global Cuisine"].map((tag) => (
                  <div key={tag} className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 1L11.09 6.26L17 7.27L13 11.14L14.18 17L9 14.27L3.82 17L5 11.14L1 7.27L6.91 6.26L9 1Z"
                        fill="#EAB932" stroke="#EAB932" strokeWidth="1" strokeLinejoin="round" />
                    </svg>
                    <span className="font-josefin text-body-xs font-semibold text-accent-gold">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICE_CARDS.map(({ img, title, subtitle, to }) => (
              <Link key={title} to={to}
                className="group relative overflow-hidden block no-underline h-[436px]"
                data-animate>
                <img src={img} alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 overlay-card-bottom transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 px-5 py-8 flex flex-col gap-1">
                  <span className="font-freight text-h4 text-cream">{title}</span>
                  <span className="font-freight italic text-body text-cream/70">{subtitle}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          BESTSELLER / MENU SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section ref={menuRef} className="w-full py-24 bg-charcoal">
        <div className="max-w-page mx-auto px-15">

          {/* Header */}
          <div className="text-center mb-16" data-animate>
            <SectionTag label="Our Bestseller" light />
            <h2 className="font-freight text-h2 text-cream font-normal mt-4 mb-4">
              A Menu Crafted to Delight{" "}
              <span className="italic text-accent-gold">Every Craving</span>
            </h2>
            <p className="font-josefin text-body-xs text-cream/60 max-w-[700px] mx-auto">
              From signature classics to chef-inspired specialties, every dish on
              our menu is prepared with fresh ingredients, rich flavors, and a
              passion for unforgettable dining experiences.
            </p>
          </div>

          {/* List + flanking images */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="hidden lg:block relative overflow-hidden rounded-sm shrink-0 w-[410px] h-[410px]" data-animate>
              <img src="/images/index/Room2.webp" alt="Featured dish" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 w-full" data-animate>
              {MENU_ITEMS.map(({ num, name }, i) => (
                <div key={num}
                  className={`group flex items-center justify-between py-5 cursor-pointer transition-colors duration-300
                    ${i < MENU_ITEMS.length - 1 ? "border-b border-cream/10" : ""}`}>
                  <h3 className="font-freight text-h2-sm text-cream group-hover:text-accent-gold transition-colors duration-300">
                    {name}
                  </h3>
                  <span className="font-josefin text-caption text-cream/30 shrink-0 ml-4">[{num}]</span>
                </div>
              ))}
            </div>

            <div className="hidden lg:block relative overflow-hidden rounded-sm shrink-0 w-[410px] h-[410px]" data-animate>
              <img src="/images/index/Room3.webp" alt="Featured dish" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex justify-end mt-10" data-animate>
            <Link to="/rooms" className="btn-outline-white inline-flex items-center gap-3">
              See Full Menu <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FEATURED DISHES
      ════════════════════════════════════════════════════════════════════ */}
      <section ref={featuredRef} className="w-full py-24 bg-charcoal/95">
        <div className="max-w-page mx-auto px-15">

          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
            <div className="flex flex-col gap-4" data-animate>
              <SectionTag label="Our Menu" light />
              <h2 className="font-freight text-h2 text-cream font-normal">
                Our Signature <span className="italic text-accent-gold">Menu</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4 max-w-[590px]" data-animate>
              <p className="font-josefin text-body-xs text-cream/60">
                A carefully curated selection of bold flavors, handcrafted
                recipes, and timeless favorites made to satisfy every craving.
              </p>
              <div className="flex flex-wrap gap-3">
                {["ALL", "SOUPS", "MAIN", "SALADS"].map((cat, i) => (
                  <button key={cat}
                    className={`font-josefin text-caption tracking-widest px-4 py-2 border bg-transparent cursor-pointer transition-all duration-300
                      ${i === 0 ? "border-accent-gold text-accent-gold" : "border-cream/20 text-cream/50"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dish cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_DISHES.map(({ img, name, desc }) => (
              <div key={name} className="group flex flex-col" data-animate>
                <div className="relative overflow-hidden h-80">
                  <img src={img} alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col gap-2 pt-4 pb-2 border-b border-cream/10">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-freight text-h4 text-cream group-hover:text-accent-gold transition-colors duration-300">
                      {name}
                    </h4>
                    <ArrowIcon className="stroke-accent-gold shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={16} />
                  </div>
                  <p className="font-josefin text-body-xs text-cream/50">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
