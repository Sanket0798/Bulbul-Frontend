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

// ── Data (from Figma) ────────────────────────────────────────────────────────
const WHY_WORK = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 22C10.477 26 6 21.523 6 16S10.477 6 16 6s10 4.477 10 10-4.477 10-10 10zm-1-15h2v6h-2zm0 8h2v2h-2z"
          fill={GOLD} />
      </svg>
    ),
    title: 'Creative Culture',
    desc: 'We encourage bold ideas and celebrate the people who bring them to life every day.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 2L20.09 11.26L30 12.27L23 19.14L24.18 29L16 24.27L7.82 29L9 19.14L2 12.27L11.91 11.26L16 2Z"
          fill={GOLD} stroke={GOLD} strokeWidth="1" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Growth & Learning',
    desc: "From day one, you'll have access to training, mentorship, and real opportunities to grow.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M26 10H22V8C22 5.794 20.206 4 18 4H14C11.794 4 10 5.794 10 8V10H6C4.897 10 4 10.897 4 12V26C4 27.103 4.897 28 6 28H26C27.103 28 28 27.103 28 26V12C28 10.897 27.103 10 26 10ZM12 8C12 6.897 12.897 6 14 6H18C19.103 6 20 6.897 20 8V10H12V8ZM26 26H6V12H26V26Z"
          fill={GOLD} />
      </svg>
    ),
    title: 'Meaningful Work',
    desc: 'Every role at Bulbul contributes to something bigger — a dining experience people remember.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm1 17h-2v-6h2v6zm0-8h-2V9h2v4z"
          fill={GOLD} />
      </svg>
    ),
    title: 'Inclusive Team',
    desc: 'We are a team that shows up for each other — diverse, welcoming, and proud of it.',
  },
]

const OPEN_POSITIONS = [
  { title: 'Head Chef', dept: 'Kitchen', type: 'Full-time', location: 'London' },
  { title: 'Sous Chef', dept: 'Kitchen', type: 'Full-time', location: 'London' },
  { title: 'Front of House Manager', dept: 'Operations', type: 'Full-time', location: 'London' },
  { title: 'Bartender', dept: 'Bar', type: 'Part-time', location: 'London' },
  { title: 'Waiter / Waitress', dept: 'Service', type: 'Part-time', location: 'London' },
  { title: 'Marketing Coordinator', dept: 'Marketing', type: 'Full-time', location: 'Remote' },
]

const TEAM_GALLERY = [
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

function FormInput({ label, placeholder, type = 'text', required = false }) {
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
export default function Careers() {
  const pageRef    = useRef(null)
  const [position, setPosition] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [resumeName, setResumeName]   = useState('')
  const [coverName, setCoverName]     = useState('')

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
    setResumeName('')
    setCoverName('')
    setPosition('')
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
            className="w-full h-full object-cover" style={{ opacity: 0.45 }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(26,11,9,0.92) 0%, rgba(26,11,9,0.35) 55%, rgba(26,11,9,0.7) 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(26,11,9,1) 0%, transparent 55%)' }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, transparent, ${RUST}, ${GOLD}, ${RUST}, transparent)`, zIndex: 2 }} />

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[60px] pb-24 pt-[120px]">
          <div className="max-w-[600px]">
            <SectionTag label="Our Values" color={GOLD} />
            <h1 className="font-gilda mt-5 mb-6"
              style={{ color: CREAM, fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1.1 }}>
              Built by People{' '}
              <span className="font-cormorant italic" style={{ color: GOLD }}>Who Care</span>
            </h1>
            <p className="font-josefin mb-10 max-w-[520px]"
              style={{ color: 'rgba(239,211,182,0.75)', fontSize: '15px', lineHeight: 1.75 }}>
              The food matters. The bar matters. The service matters. But more than anything,
              it's the people behind it — a team that takes pride in every detail and shows up
              for each other every single day.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/rooms" className="btn-outline-white inline-flex items-center gap-3">
                View Menu <ArrowIcon color={CREAM} size={14} />
              </Link>
              <a href="#apply" className="btn-outline-white inline-flex items-center gap-3">
                Make an Enquiry <ArrowIcon color={CREAM} size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          HERO IMAGE GRID — 3 images
      ══════════════════════════════════════════════════════════════════ */}
      <section className="w-full" style={{ background: '#120806' }}>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {['/images/gallery/gallery7.webp', '/images/gallery/gallery8.webp', '/images/gallery/gallery9.webp'].map((src, i) => (
            <div key={i} className="group relative overflow-hidden" style={{ height: '340px' }}>
              <img src={src} alt={`Team ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: 'rgba(133,44,40,0.3)' }} />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WHY WORK WITH US — 4 cards
      ══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24" style={{ background: 'rgba(196,90,56,0.05)' }}>
        <div className="max-w-[1440px] mx-auto px-[60px]">
          <div className="mb-14" data-animate>
            <SectionTag label="Why Work With Us" color={OLIVE} />
            <h2 className="font-gilda mt-4"
              style={{ color: RUST, fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.15 }}>
              WHY WORK WITH{' '}
              <span className="font-cormorant italic" style={{ color: GOLD }}>US</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_WORK.map(({ icon, title, desc }) => (
              <div key={title}
                className="flex flex-col gap-5 p-7 transition-all duration-300 group"
                style={{ border: '1px solid rgba(133,44,40,0.2)', background: 'rgba(133,44,40,0.04)' }}
                data-animate>
                <div className="w-14 h-14 flex items-center justify-center rounded-sm"
                  style={{ background: 'rgba(234,185,50,0.08)', border: '1px solid rgba(234,185,50,0.2)' }}>
                  {icon}
                </div>
                <h4 className="font-gilda text-xl" style={{ color: CREAM }}>{title}</h4>
                <p className="font-josefin text-sm leading-relaxed"
                  style={{ color: 'rgba(239,211,182,0.55)' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          OPEN POSITIONS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24" style={{ background: DARK }}>
        <div className="max-w-[1440px] mx-auto px-[60px]">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
            <div data-animate>
              <SectionTag label="Open Positions" color={GOLD} />
              <h2 className="font-gilda mt-4"
                style={{ color: CREAM, fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.15 }}>
                Current{' '}
                <span className="font-cormorant italic" style={{ color: GOLD }}>Opportunities</span>
              </h2>
            </div>
            <p className="font-josefin max-w-[500px] leading-relaxed"
              style={{ color: 'rgba(239,211,182,0.5)', fontSize: '14px' }}
              data-animate>
              We're always looking for passionate, talented people to join our team. If you don't
              see a role that fits, send us your CV anyway.
            </p>
          </div>

          <div className="flex flex-col gap-0" data-animate>
            {OPEN_POSITIONS.map(({ title, dept, type, location }, i) => (
              <div key={title}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 cursor-pointer transition-all duration-300"
                style={{ borderBottom: '1px solid rgba(239,211,182,0.08)' }}>
                <div className="flex flex-col gap-1">
                  <h4 className="font-gilda text-xl transition-colors duration-300 group-hover:text-[#eab932]"
                    style={{ color: CREAM }}>
                    {title}
                  </h4>
                  <div className="flex items-center gap-3">
                    <span className="font-josefin text-xs tracking-widest uppercase"
                      style={{ color: 'rgba(239,211,182,0.4)' }}>{dept}</span>
                    <span style={{ color: 'rgba(239,211,182,0.2)' }}>·</span>
                    <span className="font-josefin text-xs tracking-widest uppercase"
                      style={{ color: 'rgba(239,211,182,0.4)' }}>{location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-josefin text-xs px-3 py-1"
                    style={{
                      border: `1px solid ${type === 'Full-time' ? GOLD : 'rgba(239,211,182,0.2)'}`,
                      color: type === 'Full-time' ? GOLD : 'rgba(239,211,182,0.4)',
                    }}>
                    {type}
                  </span>
                  <a href="#apply"
                    className="font-josefin text-xs tracking-widest uppercase transition-colors duration-300 group-hover:text-[#eab932]"
                    style={{ color: 'rgba(239,211,182,0.4)', textDecoration: 'none' }}>
                    Apply →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TEAM GALLERY + QUOTE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-24" style={{ background: '#120806' }}>
        <div className="max-w-[1440px] mx-auto px-[60px]">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-20">

            {/* Gallery */}
            <div className="flex-1 grid grid-cols-2 gap-4" data-animate>
              {TEAM_GALLERY.map((src, i) => (
                <div key={i}
                  className={`group relative overflow-hidden rounded-sm ${i === 0 || i === 3 ? 'row-span-1' : ''}`}
                  style={{ height: i % 2 === 0 ? '280px' : '220px' }}>
                  <img src={src} alt={`Team ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: 'rgba(133,44,40,0.3)' }} />
                </div>
              ))}
            </div>

            {/* Quote + section header */}
            <div className="shrink-0 lg:w-[480px] flex flex-col gap-8" data-animate>
              <SectionTag label="Team Experience" color={OLIVE} />
              <h2 className="font-gilda"
                style={{ color: CREAM, fontSize: 'clamp(26px, 3vw, 40px)', lineHeight: 1.2 }}>
                Moments Behind{' '}
                <span className="font-cormorant italic" style={{ color: GOLD }}>the Scenes</span>
              </h2>
              <div className="flex flex-col gap-4 mt-4 p-6"
                style={{ border: '1px solid rgba(234,185,50,0.15)', background: 'rgba(234,185,50,0.03)' }}>
                <blockquote className="font-cormorant italic"
                  style={{ color: CREAM, fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.65 }}>
                  "The best experiences are created by people who love what they do."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px]" style={{ background: GOLD }} />
                  <span className="font-josefin text-xs tracking-widest uppercase"
                    style={{ color: GOLD }}>Bulbul Team</span>
                </div>
              </div>
              <a href="#apply" className="btn-outline-white inline-flex items-center gap-3 self-start">
                Apply Now <ArrowIcon color={CREAM} size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          APPLICATION FORM
      ══════════════════════════════════════════════════════════════════ */}
      <section id="apply" className="w-full py-24" style={{ background: 'rgba(196,90,56,0.05)' }}>
        <div className="max-w-[1440px] mx-auto px-[60px]">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

            {/* Left text */}
            <div className="shrink-0 lg:w-[420px]" data-animate>
              <SectionTag label="Application Form" color={OLIVE} />
              <h2 className="font-gilda mt-4 mb-4"
                style={{ color: RUST, fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1.15 }}>
                Make an{' '}
                <span className="font-cormorant italic" style={{ color: GOLD }}>Application</span>
              </h2>
              <p className="font-josefin leading-relaxed"
                style={{ color: 'rgba(196,90,56,0.7)', fontSize: '14px' }}>
                If you'd like to be part of the team, we'd love to hear from you.
              </p>

              {/* Decorative image */}
              <div className="mt-10 overflow-hidden rounded-sm" style={{ height: '280px' }}>
                <img src="/images/bg/testimonial.webp" alt="Bulbul team"
                  className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 w-full" data-animate>
              {submitted && (
                <div className="mb-6 px-5 py-4 font-josefin text-sm"
                  style={{ background: 'rgba(120,124,29,0.15)', border: `1px solid ${OLIVE}`, color: OLIVE }}>
                  Application submitted! We'll review it and get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <FormInput label="Name" placeholder="Enter your full name" required />
                <FormInput label="Email Address" placeholder="Enter your email" type="email" required />
                <FormInput label="Phone Number" placeholder="Enter your phone number" type="tel" />

                {/* Position dropdown */}
                <div className="flex flex-col gap-2">
                  <label className="font-josefin text-sm" style={{ color: 'rgba(239,211,182,0.7)' }}>
                    Position Applying For <span style={{ color: GOLD }}>*</span>
                  </label>
                  <select
                    required
                    value={position}
                    onChange={e => setPosition(e.target.value)}
                    className="w-full px-5 py-4 font-josefin text-sm outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(239,211,182,0.04)',
                      border: '1px solid rgba(239,211,182,0.15)',
                      color: position ? CREAM : 'rgba(239,211,182,0.35)',
                    }}
                  >
                    <option value="" style={{ background: DARK }}>Select a position</option>
                    {OPEN_POSITIONS.map(p => (
                      <option key={p.title} value={p.title} style={{ background: DARK }}>
                        {p.title}
                      </option>
                    ))}
                    <option value="other" style={{ background: DARK }}>Other / General Application</option>
                  </select>
                </div>

                {/* Resume upload */}
                <div className="flex flex-col gap-2">
                  <label className="font-josefin text-sm" style={{ color: 'rgba(239,211,182,0.7)' }}>
                    Upload Resume <span style={{ color: GOLD }}>*</span>
                  </label>
                  <div className="relative w-full px-5 py-4 flex items-center gap-4"
                    style={{
                      background: 'rgba(239,211,182,0.04)',
                      border: '1px solid rgba(239,211,182,0.15)',
                    }}>
                    <label className="font-josefin text-xs px-4 py-2 cursor-pointer transition-all duration-300"
                      style={{ border: `1px solid ${GOLD}`, color: GOLD, background: 'rgba(234,185,50,0.06)' }}>
                      Choose file
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden" required
                        onChange={e => setResumeName(e.target.files[0]?.name || '')} />
                    </label>
                    <span className="font-josefin text-xs"
                      style={{ color: resumeName ? CREAM : 'rgba(239,211,182,0.3)' }}>
                      {resumeName || 'No file chosen'}
                    </span>
                  </div>
                </div>

                {/* Cover letter upload */}
                <div className="flex flex-col gap-2">
                  <label className="font-josefin text-sm" style={{ color: 'rgba(239,211,182,0.7)' }}>
                    Upload Cover Letter
                  </label>
                  <div className="relative w-full px-5 py-4 flex items-center gap-4"
                    style={{
                      background: 'rgba(239,211,182,0.04)',
                      border: '1px solid rgba(239,211,182,0.15)',
                    }}>
                    <label className="font-josefin text-xs px-4 py-2 cursor-pointer transition-all duration-300"
                      style={{ border: `1px solid rgba(239,211,182,0.3)`, color: 'rgba(239,211,182,0.5)', background: 'transparent' }}>
                      Choose file
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                        onChange={e => setCoverName(e.target.files[0]?.name || '')} />
                    </label>
                    <span className="font-josefin text-xs"
                      style={{ color: coverName ? CREAM : 'rgba(239,211,182,0.3)' }}>
                      {coverName || 'No file chosen'}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-outline-white inline-flex items-center gap-3 self-start mt-2"
                >
                  Submit Application <ArrowIcon color={CREAM} size={14} />
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
