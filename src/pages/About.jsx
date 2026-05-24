import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

gsap.registerPlugin(ScrollTrigger)

// ── Design tokens ────────────────────────────────────────────────────────────
const RUST  = '#852c28'
const CREAM = '#efd3b6'
const GOLD  = '#eab932'
const OLIVE = '#787c1d'
const DARK  = '#1a0b09'

// ── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { icon: '🍽', value: '15+', label: 'Signature Dishes' },
  { icon: '😊', value: '50K+', label: 'Happy Guests' },
  { icon: '📈', value: '10+', label: 'Years Experience' },
]

const EXPERIENCE_CARDS = [
  {
    img: '/images/index/services1.webp',
    title: 'Explore Menu',
    subtitle: 'Elegant dishes preview',
  },
  {
    img: '/images/index/services2.webp',
    title: 'Reservations',
    subtitle: 'Reserve table instantly',
  },
  {
    img: '/images/index/Room1.webp',
    title: 'Online Ordering',
    subtitle: 'Order your favorites',
  },
]

const GALLERY_IMAGES = [
  '/images/gallery/gallery1.webp',
  '/images/gallery/gallery2.webp',
  '/images/gallery/gallery3.webp',
  '/images/gallery/gallery4.webp',
  '/images/gallery/gallery5.webp',
  '/images/gallery/gallery6.webp',
]

// ── Helpers ──────────────────────────────────────────────────────────────────
function ArrowIcon({ color = CREAM, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none"
      style={{ transform: 'rotate(45deg)', flexShrink: 0 }}>
      <path d="M1 13L13 1M13 1H4M13 1V10" stroke={color} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SectionTag({ label, color = OLIVE }) {
  return (
    <div className="flex items-center gap-3">
      <hr style={{ width: 50, borderColor: color, opacity: 1, margin: 0 }} />
      <span className="font-josefin text-xs tracking-[0.18em] uppercase" style={{ color }}>
        {label}
      </span>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-animate]').forEach(el => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          }
        )
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="min-h-screen" style={{ background: DARK, color: CREAM }}>
      <Navbar transparent />

      {/* ══════════════════════════════════════════════════════════════════
          HERO — "Where Flavor Meets Our Emotions"
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden flex items-end"
        style={{ minHeight: '100dvh', background: DARK }}
      >
        {/* BG image */}
        <div className="absolute inset-0">
          <img src="/images/bg/aboutbg.webp" alt=""
            className="w-full h-full object-cover" style={{ opacity: 0.5 }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(26,11,9,0.92) 0%, rgba(26,11,9,0.4) 55%, rgba(26,11,9,0.7) 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,11,9,1) 0%, transparent 55%)' }} />
        </div>

        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, transparent, ${RUST}, ${GOLD}, ${RUST}, transparent)`, zIndex: 2 }} />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[60px] pb-24 pt-[120px]">
          <div className="max-w-[640px]">
            <SectionTag label="About Our Restaurant" color={GOLD} />
            <h1 className="font-gilda mt-5 mb-6"
              style={{ color: CREAM, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1.1 }}>
              Where Flavor Meets{' '}
              <span className="font-cormorant italic" style={{ color: GOLD }}>
                Our Emotions
              </span>
            </h1>
            <p className="font-josefin mb-8 max-w-[480px]"
              style={{ color: 'rgba(239,211,182,0.75)', fontSize: '15px', lineHeight: 1.75 }}>
              Bulbul is founded by Chef Rohan D'Souza and restaurateur Twinkle Keswani. Between
              them, they have spent years opening and running restaurants across India, picking up
              ideas, habits, and a fairly strong point of view on how people like to eat.
            </p>
            <Link to="/contact" className="btn-outline-white inline-flex items-center gap-3">
              Know More <ArrowIcon color={CREAM} size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          STORY SECTION — image left, text right
      ══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24 overflow-hidden"
        style={{ background: 'rgba(196,90,56,0.05)' }}>
        <div className="max-w-[1440px] mx-auto px-[60px]">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

            {/* Large image */}
            <div className="relative shrink-0 w-full lg:w-[610px] overflow-hidden rounded-sm"
              style={{ height: '560px' }} data-animate>
              <img src="/images/bg/aboutbg.webp" alt="Bulbul interior"
                className="w-full h-full object-cover" />
            </div>

            {/* Text + stats */}
            <div className="flex flex-col gap-8 flex-1" data-animate>
              <SectionTag label="Our Story" color={OLIVE} />
              <h2 className="font-gilda"
                style={{ color: RUST, fontSize: 'clamp(30px, 3.5vw, 48px)', lineHeight: 1.15 }}>
                Crafted with Flavor,{' '}
                <span className="font-cormorant italic" style={{ color: GOLD }}>
                  Served with Heart
                </span>
              </h2>
              <p className="font-josefin leading-relaxed"
                style={{ color: 'rgba(196,90,56,0.85)', fontSize: '15px' }}>
                Bulbul started with a simple thought. Indian food is far broader, more regional,
                and more nuanced than the handful of dishes it is often reduced to. Cooking styles
                change every few hundred kilometres, sometimes every few streets. It is shaped as
                much by homes and everyday cooking as it is by tradition.
              </p>

              {/* Stats */}
              <div className="flex flex-col gap-5 mt-2">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="flex items-center gap-5"
                    style={{ borderBottom: '1px solid rgba(133,44,40,0.15)', paddingBottom: '16px' }}>
                    <div className="shrink-0 w-[72px] h-[72px] flex items-center justify-center rounded-sm"
                      style={{ border: `1px solid rgba(133,44,40,0.3)`, background: 'rgba(133,44,40,0.06)' }}>
                      <span className="font-gilda text-2xl" style={{ color: RUST }}>{value}</span>
                    </div>
                    <span className="font-josefin text-sm tracking-widest uppercase"
                      style={{ color: 'rgba(133,44,40,0.7)' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <Link to="/rooms" className="btn-outline-primary inline-flex items-center gap-3 self-start">
                Explore <ArrowIcon color={RUST} size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          EXPERIENCE CARDS — 3 image cards
      ══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24" style={{ background: DARK }}>
        <div className="max-w-[1440px] mx-auto px-[60px]">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
            <div className="flex flex-col gap-4 max-w-[520px]" data-animate>
              <SectionTag label="Signature Experience" color={GOLD} />
              <h2 className="font-gilda"
                style={{ color: CREAM, fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.15 }}>
                More Than Just{' '}
                <span className="font-cormorant italic" style={{ color: GOLD }}>Dining</span>
              </h2>
            </div>
            <p className="font-josefin max-w-[580px] leading-relaxed"
              style={{ color: 'rgba(239,211,182,0.55)', fontSize: '14px', lineHeight: 1.8 }}
              data-animate>
              The menu moves across regions, bringing together dishes, references, and recipes
              drawn from homes, street-side cooking, and everyday meals. It is built around small
              plates, so you can try more, share across the table, and come back to the things
              you like.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXPERIENCE_CARDS.map(({ img, title, subtitle }) => (
              <div key={title} className="group relative overflow-hidden" style={{ height: '420px' }}
                data-animate>
                <img src={img} alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(26,11,9,0.88) 0%, transparent 55%)' }} />
                <div className="absolute bottom-0 left-0 px-6 py-8 flex flex-col gap-1">
                  <span className="font-gilda" style={{ color: CREAM, fontSize: '26px' }}>{title}</span>
                  <span className="font-cormorant italic"
                    style={{ color: 'rgba(239,211,182,0.65)', fontSize: '15px' }}>{subtitle}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bar section text */}
          <p className="font-josefin mt-12 max-w-[660px] leading-relaxed"
            style={{ color: 'rgba(239,211,182,0.45)', fontSize: '14px', lineHeight: 1.9 }}
            data-animate>
            The bar takes a similar route, with cocktails that pick up on familiar flavours,
            pantry staples, and techniques you would recognise, reworked to sit easily alongside
            the food.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          GALLERY GRID
      ══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24" style={{ background: '#120806' }}>
        <div className="max-w-[1440px] mx-auto px-[60px]">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
            <div className="flex flex-col gap-4" data-animate>
              <SectionTag label="Team Experience" color={GOLD} />
              <h2 className="font-gilda"
                style={{ color: CREAM, fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
                Moments Behind{' '}
                <span className="font-cormorant italic" style={{ color: GOLD }}>the Scenes</span>
              </h2>
            </div>
            <blockquote className="font-cormorant italic max-w-[500px] text-right"
              style={{ color: 'rgba(239,211,182,0.5)', fontSize: '18px', lineHeight: 1.7 }}
              data-animate>
              "The best experiences are created by people who love what they do."
            </blockquote>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((src, i) => (
              <div key={i}
                className={`group relative overflow-hidden rounded-sm ${i === 0 || i === 3 ? 'row-span-2' : ''}`}
                style={{ height: i === 0 || i === 3 ? '480px' : '230px' }}
                data-animate>
                <img src={src} alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'rgba(133,44,40,0.35)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CHEF EXPERIENCE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24" style={{ background: 'rgba(196,90,56,0.05)' }}>
        <div className="max-w-[1440px] mx-auto px-[60px]">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

            {/* Chef image */}
            <div className="relative shrink-0 w-full lg:w-[650px]" style={{ height: '560px' }}
              data-animate>
              <div className="w-full h-full overflow-hidden rounded-sm">
                <img src="/images/bg/moment.webp" alt="Head Chef Paul Jonas"
                  className="w-full h-full object-cover" />
              </div>
              {/* Chef name badge */}
              <div className="absolute bottom-6 left-6 px-5 py-4 rounded-sm"
                style={{ background: 'rgba(26,11,9,0.9)', border: `1px solid rgba(234,185,50,0.2)` }}>
                <p className="font-gilda text-lg" style={{ color: CREAM }}>Paul Jonas</p>
                <p className="font-josefin text-xs tracking-widest uppercase mt-1"
                  style={{ color: GOLD }}>Head Chef</p>
              </div>
            </div>

            {/* Chef text */}
            <div className="flex flex-col gap-6 flex-1" data-animate>
              <SectionTag label="Chef Experience" color={OLIVE} />
              <h2 className="font-gilda"
                style={{ color: RUST, fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.15 }}>
                Passion Behind{' '}
                <span className="font-cormorant italic" style={{ color: GOLD }}>Every Plate</span>
              </h2>
              <p className="font-josefin leading-relaxed"
                style={{ color: 'rgba(196,90,56,0.85)', fontSize: '15px' }}>
                Our culinary team combines creativity, craftsmanship, and authentic ingredients
                to deliver dishes that celebrate flavor, culture, and the joy of sharing great food.
              </p>

              {/* Divider */}
              <hr style={{ borderColor: 'rgba(133,44,40,0.2)', margin: '8px 0' }} />

              {/* Chef quote */}
              <div className="flex flex-col gap-2">
                <blockquote className="font-cormorant italic"
                  style={{ color: CREAM, fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.6 }}>
                  "Great food is not just tasted — it is remembered."
                </blockquote>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-8 h-[1px]" style={{ background: GOLD }} />
                  <span className="font-josefin text-xs tracking-widest uppercase"
                    style={{ color: GOLD }}>Paul Jonas, Head Chef</span>
                </div>
              </div>

              {/* Team avatars */}
              <div className="flex items-center gap-0 mt-4">
                {[1, 2, 3, 4].map(n => (
                  <div key={n}
                    className="w-[52px] h-[52px] rounded-full overflow-hidden border-2"
                    style={{ borderColor: DARK, marginLeft: n > 1 ? '-12px' : 0 }}>
                    <img src={`/images/contact/${['john', 'kate', 'evan', 'daisy'][n - 1]}.webp`}
                      alt={`Team member ${n}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center border-2"
                  style={{ borderColor: GOLD, background: 'rgba(234,185,50,0.1)', marginLeft: '-12px' }}>
                  <span className="font-josefin text-xs" style={{ color: GOLD }}>+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
