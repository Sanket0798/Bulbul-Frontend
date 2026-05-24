import { useState, useEffect, useRef } from 'react'
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

// ── FAQ data (from Figma) ────────────────────────────────────────────────────
const FAQS = [
  { q: 'Do you take group bookings for breakfast?' },
  { q: 'What is the minimum group size for a group booking?' },
  { q: 'Can we choose from different menu options for our group?' },
  { q: 'Is a deposit required for group bookings?' },
  { q: 'How far in advance can we book for a large group?' },
]

// ── Gallery images ───────────────────────────────────────────────────────────
const GALLERY = [
  '/images/gallery/gallery1.webp',
  '/images/gallery/gallery2.webp',
  '/images/gallery/gallery3.webp',
  '/images/gallery/gallery4.webp',
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

function InputField({ label, placeholder, type = 'text', required = false }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-josefin text-sm" style={{ color: 'rgba(239,211,182,0.7)' }}>
        {label}{required && <span style={{ color: GOLD }}> *</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full px-5 py-4 font-josefin text-sm outline-none transition-all duration-300"
        style={{
          background: 'rgba(239,211,182,0.04)',
          border: '1px solid rgba(239,211,182,0.15)',
          color: CREAM,
        }}
        onFocus={e => { e.target.style.borderColor = GOLD }}
        onBlur={e => { e.target.style.borderColor = 'rgba(239,211,182,0.15)' }}
      />
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function GroupBookings() {
  const pageRef   = useRef(null)
  const [openFaq, setOpenFaq] = useState(null)
  const [agreed, setAgreed]   = useState(false)
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    e.target.reset()
    setAgreed(false)
  }

  return (
    <div ref={pageRef} className="min-h-screen" style={{ background: DARK, color: CREAM }}>
      <Navbar transparent />

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden flex items-end"
        style={{ minHeight: '100dvh', background: DARK }}>
        <div className="absolute inset-0">
          <img src="/images/bg/choose.webp" alt=""
            className="w-full h-full object-cover" style={{ opacity: 0.5 }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(26,11,9,0.92) 0%, rgba(26,11,9,0.35) 55%, rgba(26,11,9,0.7) 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,11,9,1) 0%, transparent 55%)' }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, transparent, ${RUST}, ${GOLD}, ${RUST}, transparent)`, zIndex: 2 }} />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[60px] pb-24 pt-[120px]">
          <div className="max-w-[600px]">
            <SectionTag label="Crowd-pleasing plates to share" color={GOLD} />
            <h1 className="font-gilda mt-5 mb-6"
              style={{ color: CREAM, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1.1 }}>
              Group Feast{' '}
              <span className="font-cormorant italic" style={{ color: GOLD }}>Menus</span>
            </h1>
            <p className="font-josefin mb-10 max-w-[520px]"
              style={{ color: 'rgba(239,211,182,0.75)', fontSize: '15px', lineHeight: 1.75 }}>
              Finest snacks, grills, ruby murrays, fragrant biryanis, naans, rotis and sweet
              puddings. Delicious and copious dishes that laden tables with café favourites to
              share at breakfast, lunch and dinner.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/rooms" className="btn-outline-white inline-flex items-center gap-3">
                View Menu <ArrowIcon color={CREAM} size={14} />
              </Link>
              <a href="#enquiry" className="btn-outline-white inline-flex items-center gap-3">
                Make an Enquiry <ArrowIcon color={CREAM} size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          GALLERY STRIP — 4 images
      ══════════════════════════════════════════════════════════════════ */}
      <section className="w-full" style={{ background: '#120806' }}>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {GALLERY.map((src, i) => (
            <div key={i} className="group relative overflow-hidden" style={{ height: '300px' }}>
              <img src={src} alt={`Group dining ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: 'rgba(133,44,40,0.3)' }} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PARTY HEARTILY — text + image
      ══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24" style={{ background: 'rgba(196,90,56,0.05)' }}>
        <div className="max-w-[1440px] mx-auto px-[60px]">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

            {/* Text */}
            <div className="flex flex-col gap-6 flex-1 max-w-[560px]" data-animate>
              <SectionTag label="Much to enjoy, little to do" color={OLIVE} />
              <h2 className="font-gilda"
                style={{ color: RUST, fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.15 }}>
                Party Heartily,{' '}
                <span className="font-cormorant italic" style={{ color: GOLD }}>Fuss-free</span>
              </h2>
              <p className="font-josefin leading-relaxed"
                style={{ color: 'rgba(196,90,56,0.85)', fontSize: '15px' }}>
                Finest snacks, grills, ruby murrays, fragrant biryanis, naans, rotis and sweet
                puddings. Choose from Non-Veg., Veg. or Vegan menus upon arrival, whichever
                combination you please — no need to order ahead. All appetites will be pleased
                and leave most sated. Thirsty lips — chai and tipples are happily at hand.
              </p>
              <Link to="/rooms" className="btn-outline-primary inline-flex items-center gap-3 self-start">
                View Menu <ArrowIcon color={RUST} size={14} />
              </Link>
            </div>

            {/* Image pair */}
            <div className="relative shrink-0 w-full lg:w-[620px]" style={{ height: '480px' }}
              data-animate>
              <div className="absolute top-0 left-0 w-[48%] h-[55%] overflow-hidden rounded-sm">
                <img src="/images/gallery/gallery5.webp" alt="Group dining"
                  className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-[60%] h-[65%] overflow-hidden rounded-sm shadow-2xl">
                <img src="/images/gallery/gallery6.webp" alt="Group feast"
                  className="w-full h-full object-cover" />
              </div>
              {/* Accent border */}
              <div className="absolute top-[10%] right-[5%] w-[55%] h-[55%] rounded-sm"
                style={{ border: `2px solid rgba(234,185,50,0.25)`, zIndex: -1 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          GROUP RESERVATIONS INFO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24" style={{ background: DARK }}>
        <div className="max-w-[1440px] mx-auto px-[60px]">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

            {/* Image */}
            <div className="relative shrink-0 w-full lg:w-[580px] overflow-hidden rounded-sm"
              style={{ height: '500px' }} data-animate>
              <img src="/images/bg/moment.webp" alt="Group reservation"
                className="w-full h-full object-cover" />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(26,11,9,0.6) 0%, transparent 60%)' }} />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-6 flex-1" data-animate>
              <SectionTag label="Book for a first-class get-together" color={GOLD} />
              <h2 className="font-gilda"
                style={{ color: CREAM, fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.15 }}>
                Group{' '}
                <span className="font-cormorant italic" style={{ color: GOLD }}>Reservations</span>
              </h2>
              <div className="flex flex-col gap-5">
                <p className="font-josefin leading-relaxed"
                  style={{ color: 'rgba(239,211,182,0.65)', fontSize: '15px' }}>
                  A good meal can gladden the heart. A fine gathering, more so. Come — eat, drink
                  and be joyful. It will be our delight to host you.
                </p>
                <p className="font-josefin leading-relaxed"
                  style={{ color: 'rgba(239,211,182,0.65)', fontSize: '15px' }}>
                  We accept bookings online up to four months in advance. For large parties of
                  16+ or for specific event requests, do get in touch with us directly to book.
                </p>
                <p className="font-josefin leading-relaxed"
                  style={{ color: 'rgba(239,211,182,0.65)', fontSize: '15px' }}>
                  For any group, we do ask for a deposit, which is used against your final bill.
                  If you need to cancel for any reason, let us know 24 hours in advance and we
                  will gladly refund your deposit.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-2">
                <a href="#enquiry" className="btn-outline-white inline-flex items-center gap-3">
                  Make an Enquiry <ArrowIcon color={CREAM} size={14} />
                </a>
                <Link to="/contact" className="btn-outline-white inline-flex items-center gap-3">
                  Book Online <ArrowIcon color={CREAM} size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ ACCORDION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24" style={{ background: '#120806' }}>
        <div className="max-w-[1440px] mx-auto px-[60px]">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

            {/* FAQ header */}
            <div className="shrink-0 lg:w-[380px]" data-animate>
              <SectionTag label="Book for a first-class get-together" color={OLIVE} />
              <h2 className="font-gilda mt-4"
                style={{ color: CREAM, fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.15 }}>
                FAQ
                <span className="font-cormorant italic" style={{ color: GOLD }}>'S</span>
              </h2>
              <p className="font-josefin mt-4 leading-relaxed"
                style={{ color: 'rgba(239,211,182,0.5)', fontSize: '14px' }}>
                Answers to common queries about group feasting at Bulbul.
              </p>
            </div>

            {/* Accordion */}
            <div className="flex-1 w-full" data-animate>
              {FAQS.map((faq, i) => (
                <div key={i}
                  style={{ borderBottom: '1px solid rgba(239,211,182,0.1)' }}>
                  <button
                    className="w-full flex items-center justify-between py-5 text-left transition-colors duration-300"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-josefin text-sm pr-8"
                      style={{ color: openFaq === i ? GOLD : CREAM }}>
                      {faq.q}
                    </span>
                    <span
                      className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300"
                      style={{
                        border: `1px solid ${openFaq === i ? GOLD : 'rgba(239,211,182,0.2)'}`,
                        color: openFaq === i ? GOLD : 'rgba(239,211,182,0.4)',
                        transform: openFaq === i ? 'rotate(45deg)' : 'none',
                      }}
                    >
                      +
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="pb-5">
                      <p className="font-josefin text-sm leading-relaxed"
                        style={{ color: 'rgba(239,211,182,0.55)' }}>
                        Please contact us directly at{' '}
                        <a href="mailto:hello@bulbulrestaurant.com"
                          style={{ color: GOLD, textDecoration: 'none' }}>
                          hello@bulbulrestaurant.com
                        </a>{' '}
                        or call us for more information about this query.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ENQUIRY FORM
      ══════════════════════════════════════════════════════════════════ */}
      <section id="enquiry" className="w-full py-24" style={{ background: 'rgba(196,90,56,0.05)' }}>
        <div className="max-w-[1440px] mx-auto px-[60px]">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

            {/* Left image */}
            <div className="relative shrink-0 w-full lg:w-[580px] overflow-hidden rounded-sm"
              style={{ height: '600px' }} data-animate>
              <img src="/images/bg/testimonial.webp" alt="Group dining"
                className="w-full h-full object-cover" />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(26,11,9,0.7) 0%, transparent 60%)' }} />
            </div>

            {/* Form */}
            <div className="flex-1 w-full" data-animate>
              <SectionTag label="Contact us" color={OLIVE} />
              <h2 className="font-gilda mt-4 mb-8"
                style={{ color: RUST, fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.15 }}>
                Make an{' '}
                <span className="font-cormorant italic" style={{ color: GOLD }}>Enquiry</span>
              </h2>

              {submitted && (
                <div className="mb-6 px-5 py-4 font-josefin text-sm"
                  style={{ background: 'rgba(120,124,29,0.15)', border: `1px solid ${OLIVE}`, color: OLIVE }}>
                  Thank you! We'll be in touch shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField label="Name" placeholder="Enter your full name" required />
                  <InputField label="Email Address" placeholder="Enter your email" type="email" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField label="Phone Number" placeholder="Enter your phone" type="tel" />
                  <InputField label="Date of Booking" placeholder="DD / MM / YYYY" type="date" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField label="Number of Guests" placeholder="e.g. 12" type="number" required />
                  <div className="flex flex-col gap-2">
                    <label className="font-josefin text-sm" style={{ color: 'rgba(239,211,182,0.7)' }}>
                      Occasion
                    </label>
                    <select
                      className="w-full px-5 py-4 font-josefin text-sm outline-none transition-all duration-300"
                      style={{
                        background: 'rgba(239,211,182,0.04)',
                        border: '1px solid rgba(239,211,182,0.15)',
                        color: CREAM,
                      }}
                    >
                      <option value="" style={{ background: DARK }}>Select occasion</option>
                      <option value="birthday" style={{ background: DARK }}>Birthday</option>
                      <option value="anniversary" style={{ background: DARK }}>Anniversary</option>
                      <option value="corporate" style={{ background: DARK }}>Corporate Event</option>
                      <option value="other" style={{ background: DARK }}>Other</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-2">
                  <label className="font-josefin text-sm" style={{ color: 'rgba(239,211,182,0.7)' }}>
                    Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Dietary preferences, occasion, or anything you'd like us to know"
                    className="w-full px-5 py-4 font-josefin text-sm outline-none resize-none transition-all duration-300"
                    style={{
                      background: 'rgba(239,211,182,0.04)',
                      border: '1px solid rgba(239,211,182,0.15)',
                      color: CREAM,
                    }}
                    onFocus={e => { e.target.style.borderColor = GOLD }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(239,211,182,0.15)' }}
                  />
                </div>

                {/* Consent */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    className="shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center transition-all duration-200"
                    style={{
                      border: `1px solid ${agreed ? GOLD : 'rgba(239,211,182,0.3)'}`,
                      background: agreed ? GOLD : 'transparent',
                    }}
                    onClick={() => setAgreed(v => !v)}
                  >
                    {agreed && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke={DARK} strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <span className="font-josefin text-xs leading-relaxed"
                    style={{ color: 'rgba(239,211,182,0.5)' }}>
                    I consent to receive occasional emails from Bulbul, including updates, events,
                    and news, in line with our Privacy Policy.
                  </span>
                </label>

                <button
                  type="submit"
                  className="btn-outline-white inline-flex items-center gap-3 self-start mt-2"
                >
                  Subscribe <ArrowIcon color={CREAM} size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
