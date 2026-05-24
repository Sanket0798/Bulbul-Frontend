import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

gsap.registerPlugin(ScrollTrigger)

// ── Design tokens (from Figma) ──────────────────────────────────────────────
const RUST   = '#852c28'
const CREAM  = '#efd3b6'
const GOLD   = '#eab932'
const OLIVE  = '#787c1d'
const DARK   = '#1a0b09'

// ── Service card data ────────────────────────────────────────────────────────
const SERVICE_CARDS = [
  {
    img: '/images/index/services1.webp',
    title: 'Explore Menu',
    subtitle: 'Elegant dishes preview',
    to: '/rooms',
  },
  {
    img: '/images/index/services2.webp',
    title: 'Reservations',
    subtitle: 'Reserve table instantly',
    to: '/contact',
  },
  {
    img: '/images/index/Room1.webp',
    title: 'Online Ordering',
    subtitle: 'Order your favorites',
    to: '/rooms',
  },
]

// ── Bestseller menu items ────────────────────────────────────────────────────
const MENU_ITEMS = [
  { num: '01', name: 'Crispy Wings' },
  { num: '02', name: 'Butter Chicken' },
  { num: '03', name: 'Grilled Steak' },
  { num: '04', name: 'Classic Slider' },
  { num: '05', name: 'Dragon Roll' },
]

// ── Featured menu cards ──────────────────────────────────────────────────────
const FEATURED_DISHES = [
  {
    img: '/images/index/Room1.webp',
    name: 'Truffle Pasta',
    desc: 'Creamy indulgence finished with rich truffle aroma and parmesan perfection.',
  },
  {
    img: '/images/index/Room2.webp',
    name: 'Butter Chicken',
    desc: 'Slow-cooked tender chicken in a rich, aromatic tomato-cream sauce.',
  },
  {
    img: '/images/index/Room3.webp',
    name: 'Crispy Wings',
    desc: 'Golden-fried wings tossed in our signature spice blend.',
  },
  {
    img: '/images/index/about.webp',
    name: 'Dragon Roll',
    desc: 'A bold fusion roll with avocado, spicy tuna, and crispy tempura.',
  },
]

// ── Reusable arrow icon ──────────────────────────────────────────────────────
function ArrowIcon({ color = CREAM, size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      style={{ transform: 'rotate(45deg)', flexShrink: 0 }}
    >
      <path d="M1 13L13 1M13 1H4M13 1V10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Section tag (label + rule) ───────────────────────────────────────────────
function SectionTag({ label, color = OLIVE }) {
  return (
    <div className="flex items-center gap-3">
      <hr style={{ width: 50, borderColor: color, opacity: 1, margin: 0 }} />
      <span
        className="font-josefin text-xs tracking-[0.18em] uppercase"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  )
}

export default function Home() {
  const heroRef      = useRef(null)
  const aboutRef     = useRef(null)
  const servicesRef  = useRef(null)
  const menuRef      = useRef(null)
  const featuredRef  = useRef(null)

  // ── Scroll-triggered fade-in for sections ──────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = [aboutRef, servicesRef, menuRef, featuredRef]
      sections.forEach(ref => {
        if (!ref.current) return
        gsap.fromTo(
          ref.current.querySelectorAll('[data-animate]'),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
            },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen" style={{ background: DARK, color: CREAM }}>
      <Navbar transparent />

      {/* ════════════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden flex items-center"
        style={{ minHeight: '100dvh', background: DARK }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/bg/hero_bg.webp"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.55 }}
          />
          {/* Vignette overlays */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(26,11,9,0.85) 0%, rgba(26,11,9,0.3) 60%, rgba(26,11,9,0.6) 100%)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,11,9,0.9) 0%, transparent 50%)' }}
          />
        </div>

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, transparent, ${RUST}, ${GOLD}, ${RUST}, transparent)`, zIndex: 2 }}
        />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[60px] pt-[100px] pb-[80px]">
          <div className="max-w-[700px]">
            {/* Tag */}
            <div className="mb-4">
              <SectionTag label="Handcrafted Goodness" color={GOLD} />
            </div>

            {/* Main headline */}
            <h1
              className="font-gilda mb-6"
              style={{
                color: CREAM,
                fontSize: 'clamp(44px, 5.5vw, 80px)',
                lineHeight: 1.1,
              }}
            >
              Flavors That Stay{' '}
              <span
                className="font-cormorant italic"
                style={{ color: GOLD }}
              >
                with You Forever
              </span>
            </h1>

            {/* Quote */}
            <p
              className="font-josefin mb-8 max-w-[560px]"
              style={{ color: 'rgba(239,211,182,0.8)', fontSize: '15px', lineHeight: 1.7 }}
            >
              "We've grown up with a version of Indian food shaped by homes and everyday cooking,
              the kind that rarely makes it onto restaurant menus. At Bulbul, that is what comes
              to the table, gathered along the way and shared with you."
            </p>

            {/* CTA */}
            <Link
              to="/rooms"
              className="btn-outline-white inline-flex items-center gap-3"
            >
              View our Menu
              <ArrowIcon color="inherit" size={14} />
            </Link>
          </div>

          {/* Bird logo watermark */}
          <div
            className="absolute right-[60px] bottom-[80px] hidden lg:block"
            style={{ opacity: 0.15 }}
          >
            <img
              src="/images/brand/logo/Bird.png"
              alt=""
              style={{ width: '180px', filter: 'brightness(10)' }}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ABOUT SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={aboutRef}
        className="w-full py-24 overflow-hidden"
        style={{ background: 'rgba(196,90,56,0.06)' }}
      >
        <div className="max-w-[1440px] mx-auto px-[60px]">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Image collage */}
            <div className="relative shrink-0 w-full lg:w-[480px] h-[420px] lg:h-[500px]" data-animate>
              {/* Decorative border box */}
              <div
                className="absolute"
                style={{
                  top: 0, left: '87px',
                  width: '240px', height: '380px',
                  border: `2.5px solid ${RUST}`,
                  borderRadius: '2px',
                }}
              />
              {/* Main image */}
              <div
                className="absolute overflow-hidden rounded-sm"
                style={{ top: '24px', left: 0, width: '234px', height: '334px' }}
              >
                <img
                  src="/images/index/about.webp"
                  alt="Bulbul restaurant interior"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Accent image */}
              <div
                className="absolute overflow-hidden rounded-sm shadow-xl"
                style={{ top: '206px', left: '170px', width: '310px', height: '257px' }}
              >
                <img
                  src="/images/index/easystay.webp"
                  alt="Bulbul dining experience"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text content */}
            <div className="flex flex-col gap-6 max-w-[620px]" data-animate>
              <SectionTag label="Our Story" color={OLIVE} />

              <h2
                className="font-gilda"
                style={{ color: RUST, fontSize: 'clamp(32px, 3.5vw, 48px)', lineHeight: 1.15 }}
              >
                About{' '}
                <span className="font-cormorant italic" style={{ color: GOLD }}>
                  Bulbul
                </span>
              </h2>

              <p
                className="font-josefin leading-relaxed"
                style={{ color: 'rgba(196,90,56,0.9)', fontSize: '15px' }}
              >
                Bulbul started with a simple thought. Indian food is far broader, more regional,
                and more nuanced than the handful of dishes it is often reduced to. Cooking styles
                change every few hundred kilometres, sometimes every few streets. It is shaped as
                much by homes and everyday cooking as it is by tradition.
              </p>

              <Link
                to="/about"
                className="btn-outline-primary inline-flex items-center gap-3 self-start"
              >
                Read More
                <ArrowIcon color={RUST} size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SERVICES SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={servicesRef}
        className="w-full py-24"
        style={{ background: 'rgba(120,124,29,0.06)' }}
      >
        <div className="max-w-[1440px] mx-auto px-[60px]">

          {/* Header row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 mb-16">
            <div className="flex flex-col gap-4 max-w-[520px]" data-animate>
              <SectionTag label="Our Service" color={OLIVE} />
              <h2
                className="font-gilda"
                style={{ color: RUST, fontSize: 'clamp(30px, 3.5vw, 48px)', lineHeight: 1.15 }}
              >
                The Heart of Great Food &amp;{' '}
                <span className="font-cormorant italic" style={{ color: GOLD }}>
                  Hospitality
                </span>
              </h2>
              <Link
                to="/rooms"
                className="btn-outline-primary inline-flex items-center gap-3 self-start"
              >
                View our Menu
                <ArrowIcon color={RUST} size={14} />
              </Link>
            </div>

            <div className="flex flex-col gap-5 max-w-[590px]" data-animate>
              <p
                className="font-josefin leading-relaxed"
                style={{ color: OLIVE, fontSize: '15px' }}
              >
                The menu moves across regions, bringing together dishes, references, and recipes
                drawn from homes, street-side cooking, and everyday meals. It is presented in a
                way that feels lighter and more suited to how people like to eat today.
              </p>
              <div className="flex flex-wrap gap-6">
                {['Culinary Excellence', 'Rich Cultural Flavors', 'Inspired Global Cuisine'].map(tag => (
                  <div key={tag} className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 1L11.09 6.26L17 7.27L13 11.14L14.18 17L9 14.27L3.82 17L5 11.14L1 7.27L6.91 6.26L9 1Z"
                        fill={GOLD} stroke={GOLD} strokeWidth="1" strokeLinejoin="round" />
                    </svg>
                    <span
                      className="font-josefin text-sm font-semibold"
                      style={{ color: GOLD }}
                    >
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICE_CARDS.map(({ img, title, subtitle, to }) => (
              <Link
                key={title}
                to={to}
                className="group relative overflow-hidden block"
                style={{ height: '436px', textDecoration: 'none' }}
                data-animate
              >
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(133,44,40,0.92) 0%, transparent 55%)' }}
                />
                {/* Card label */}
                <div
                  className="absolute bottom-0 left-0 px-5 py-8 flex flex-col gap-1"
                >
                  <span
                    className="font-gilda"
                    style={{ color: CREAM, fontSize: '28px', lineHeight: 1.2 }}
                  >
                    {title}
                  </span>
                  <span
                    className="font-cormorant italic"
                    style={{ color: 'rgba(239,211,182,0.7)', fontSize: '16px' }}
                  >
                    {subtitle}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          BESTSELLER / MENU SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={menuRef}
        className="w-full py-24"
        style={{ background: DARK }}
      >
        <div className="max-w-[1440px] mx-auto px-[60px]">

          {/* Section header */}
          <div className="text-center mb-16" data-animate>
            <SectionTag label="Our Bestseller" color={GOLD} />
            <h2
              className="font-gilda mt-4 mb-4"
              style={{ color: CREAM, fontSize: 'clamp(28px, 3.5vw, 44px)' }}
            >
              A Menu Crafted to Delight{' '}
              <span className="font-cormorant italic" style={{ color: GOLD }}>
                Every Craving
              </span>
            </h2>
            <p
              className="font-josefin max-w-[700px] mx-auto"
              style={{ color: 'rgba(239,211,182,0.6)', fontSize: '14px', lineHeight: 1.8 }}
            >
              From signature classics to chef-inspired specialties, every dish on our menu is
              prepared with fresh ingredients, rich flavors, and a passion for unforgettable
              dining experiences.
            </p>
          </div>

          {/* Menu layout: list + images */}
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Left image */}
            <div
              className="hidden lg:block relative overflow-hidden rounded-sm shrink-0"
              style={{ width: '410px', height: '410px' }}
              data-animate
            >
              <img
                src="/images/index/Room2.webp"
                alt="Featured dish"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Menu list */}
            <div className="flex-1 w-full" data-animate>
              {MENU_ITEMS.map(({ num, name }, i) => (
                <div
                  key={num}
                  className="group flex items-center justify-between py-5 cursor-pointer transition-all duration-300"
                  style={{
                    borderBottom: i < MENU_ITEMS.length - 1
                      ? '1px solid rgba(239,211,182,0.1)'
                      : 'none',
                  }}
                >
                  <h3
                    className="font-gilda transition-colors duration-300 group-hover:text-[#eab932]"
                    style={{
                      color: CREAM,
                      fontSize: 'clamp(28px, 3vw, 44px)',
                      lineHeight: 1.1,
                    }}
                  >
                    {name}
                  </h3>
                  <span
                    className="font-josefin text-xs tracking-widest shrink-0 ml-4"
                    style={{ color: 'rgba(239,211,182,0.3)' }}
                  >
                    [{num}]
                  </span>
                </div>
              ))}
            </div>

            {/* Right image */}
            <div
              className="hidden lg:block relative overflow-hidden rounded-sm shrink-0"
              style={{ width: '410px', height: '410px' }}
              data-animate
            >
              <img
                src="/images/index/Room3.webp"
                alt="Featured dish"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* See full menu CTA */}
          <div className="flex justify-end mt-10" data-animate>
            <Link
              to="/rooms"
              className="btn-outline-white inline-flex items-center gap-3"
            >
              See Full Menu
              <ArrowIcon color={CREAM} size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FEATURED DISHES SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={featuredRef}
        className="w-full py-24"
        style={{ background: '#120806' }}
      >
        <div className="max-w-[1440px] mx-auto px-[60px]">

          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
            <div className="flex flex-col gap-4" data-animate>
              <SectionTag label="Our Menu" color={GOLD} />
              <h2
                className="font-gilda"
                style={{ color: CREAM, fontSize: 'clamp(28px, 3.5vw, 44px)' }}
              >
                Our Signature{' '}
                <span className="font-cormorant italic" style={{ color: GOLD }}>
                  Menu
                </span>
              </h2>
            </div>

            <div className="flex flex-col gap-4 max-w-[590px]" data-animate>
              <p
                className="font-josefin"
                style={{ color: 'rgba(239,211,182,0.6)', fontSize: '14px', lineHeight: 1.8 }}
              >
                A carefully curated selection of bold flavors, handcrafted recipes, and timeless
                favorites made to satisfy every craving.
              </p>
              {/* Category filters */}
              <div className="flex flex-wrap gap-3">
                {['ALL', 'SOUPS', 'MAIN', 'SALADS'].map((cat, i) => (
                  <button
                    key={cat}
                    className="font-josefin text-xs tracking-widest px-4 py-2 transition-all duration-300"
                    style={{
                      border: `1px solid ${i === 0 ? GOLD : 'rgba(239,211,182,0.2)'}`,
                      color: i === 0 ? GOLD : 'rgba(239,211,182,0.5)',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dish cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_DISHES.map(({ img, name, desc }) => (
              <div
                key={name}
                className="group flex flex-col"
                data-animate
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: '320px' }}
                >
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Card info */}
                <div
                  className="flex flex-col gap-2 pt-4 pb-2"
                  style={{ borderBottom: '1px solid rgba(239,211,182,0.1)' }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4
                      className="font-gilda transition-colors duration-300 group-hover:text-[#eab932]"
                      style={{ color: CREAM, fontSize: '22px', lineHeight: 1.2 }}
                    >
                      {name}
                    </h4>
                    <div
                      className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ArrowIcon color={GOLD} size={16} />
                    </div>
                  </div>
                  <p
                    className="font-josefin text-sm leading-relaxed"
                    style={{ color: 'rgba(239,211,182,0.5)' }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
