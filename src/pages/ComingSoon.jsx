import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const LAUNCH_DATE = (() => {
  const key = 'bulbul_launch_date'
  const stored = localStorage.getItem(key)
  if (stored) return new Date(Number(stored))
  const date = new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
  localStorage.setItem(key, date.getTime())
  return date
})()

// brand colours
const RUST  = '#7C2D26'
const CREAM = '#ffffff'
const GOLD  = '#eab932'
const RUST2 = '#c45a38'

export default function ComingSoon() {
  const [toast, setToast]           = useState(false)
  const [emailError, setEmailError] = useState('')
  const toastRef = useRef(null)

  const handleNotify = (e) => {
    e.preventDefault()
    const email = e.target.elements.email.value.trim()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) { setEmailError('Please enter a valid email address.'); return }
    setEmailError('')
    setToast(true)
    gsap.fromTo(toastRef.current,
      { y: -30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }
    )
    setTimeout(() => {
      gsap.to(toastRef.current, {
        y: -10, opacity: 0, duration: 0.35, ease: 'power2.in',
        onComplete: () => setToast(false),
      })
    }, 3500)
    e.target.reset()
  }

  // refs
  const wrapperRef  = useRef(null)
  const logoRef     = useRef(null)
  const taglineRef  = useRef(null)
  const titleRef    = useRef(null)
  const dividerRef  = useRef(null)
  const storyRef    = useRef(null)
  const formRef     = useRef(null)
  const socialRef   = useRef(null)
  const footerRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Logo drops in
      tl.fromTo(logoRef.current,
        { y: -40, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 1.0, ease: 'back.out(1.4)' }
      )

      // 2. Tagline — word by word blur-fade
      .fromTo(taglineRef.current.querySelectorAll('.tagline-word'),
        { y: 16, opacity: 0, filter: 'blur(5px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, stagger: 0.09, ease: 'power2.out' }, '-=0.4'
      )

      // 3. "Coming Soon" — char typewriter with blur
      .fromTo(titleRef.current.querySelectorAll('.title-char'),
        { opacity: 0, y: 16, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.38, stagger: 0.055, ease: 'power2.out' }, '-=0.3'
      )

      // 4. Gold shimmer sweep across title
      .to(titleRef.current, {
        backgroundImage: `linear-gradient(90deg, ${CREAM} 0%, ${GOLD} 45%, ${CREAM} 55%, ${CREAM} 100%)`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        backgroundSize: '200% 100%',
        backgroundPosition: '-100% 0',
        duration: 0,
      }, '+=0.05')
      .to(titleRef.current, {
        backgroundPosition: '200% 0',
        duration: 1.1,
        ease: 'power1.inOut',
      })
      .to(titleRef.current, { backgroundImage: 'none', color: CREAM, duration: 0 })

      // 5. Divider expands
      .fromTo(dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.7, transformOrigin: 'center', ease: 'power2.inOut' }, '-=0.5'
      )

      // 6. Story words slide up
      .fromTo(storyRef.current.querySelectorAll('.story-word'),
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.48, stagger: 0.016, ease: 'power2.out' }, '-=0.3'
      )

      // 7. Form slides up
      .fromTo(formRef.current,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, '-=0.15'
      )

      // 8. Social icons pop in
      .fromTo(socialRef.current.querySelectorAll('a'),
        { y: 14, opacity: 0, scale: 0.5 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.7)' }, '-=0.3'
      )

      // 9. Footer letter-spacing collapse
      .fromTo(footerRef.current,
        { opacity: 0, letterSpacing: '0.45em' },
        { opacity: 1, letterSpacing: '0.15em', duration: 0.9, ease: 'power2.out' }, '-=0.2'
      )

      // Continuous: logo gentle float
      gsap.to(logoRef.current, {
        y: -7, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2,
      })

      // Continuous: gold glow pulse on title
      gsap.to(titleRef.current, {
        textShadow: `0 0 28px ${GOLD}44`,
        duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3,
      })

    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={wrapperRef}
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#1a0b09' }}
    >
      {/* Background image — Img1 at low opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/images/cuisines/Img1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
        }}
      />

      {/* Dark vignette overlay so edges stay dark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, #1a0b09cc 100%)',
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, transparent, ${RUST2}, ${GOLD}, ${RUST2}, transparent)` }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-10 flex flex-col items-center text-center gap-3 sm:gap-4">

        {/* Bulbul logo */}
        <img
          ref={logoRef}
          src="/images/brand/logo/Bulbul.png"
          alt="Bulbul Restaurant"
          className="w-32 sm:w-32 md:w-40 object-contain"
          style={{ filter: `drop-shadow(0 0 16px ${RUST2}99)` }}
        />

        {/* Tagline — single line, nowrap on desktop */}
        <p
          ref={taglineRef}
          className="font-cormorant italic whitespace-nowrap"
  style={{ color: CREAM, fontSize: 'clamp(18px, 3.2vw, 40px)', fontWeight: 300, letterSpacing: '0.01em' }}
        >
          {["little", "birdie's", "been", "spreading", "the", "word."].map((word, i) => (
            <span key={i} className="tagline-word" style={{ display: 'inline-block', marginRight: '0.26em', opacity: 0 }}>
              {word}
            </span>
          ))}
        </p>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-playfair"
          style={{ color: CREAM, fontSize: 'clamp(40px, 8.5vw, 88px)', lineHeight: 1.05, letterSpacing: '0.03em', fontWeight: 700 }}
        >
          {'Coming Soon'.split('').map((char, i) => (
            <span key={i} className="title-char" style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Ornamental divider */}
        <div ref={dividerRef} className="flex items-center gap-3 w-36 sm:w-56">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${RUST2})` }} />
          <span style={{ color: GOLD, fontSize: '12px' }}>✦</span>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${RUST2}, transparent)` }} />
        </div>

        {/* Story — condensed to 2–3 lines using font-playfair */}
        <div ref={storyRef} className="w-full max-w-xl px-1 sm:px-0">
          {[
            "Something new is coming to the City of London — Indian small plates and cocktails.",
            "We've grown up with a version of Indian food shaped by homes and everyday cooking, the kind that rarely makes it onto restaurant menus.",
            "At Bulbul, that is what comes to the table. Opening this June — we'd love to have you in early.",
          ].map((line, pi) => (
            <p key={pi}
              className={`font-playfair story-line${pi === 2 ? ' font-semibold' : ''}`}
              style={{
                color: pi === 2 ? CREAM : `${CREAM}cc`,
                fontSize: 'clamp(13px, 1.8vw, 16px)',
                lineHeight: 1.75,
                marginBottom: pi < 2 ? '0.4em' : 0,
              }}
            >
              {line.split(' ').map((word, wi) => (
                <span key={wi} className="story-word"
                  style={{ display: 'inline-block', marginRight: '0.28em', opacity: 0, transform: 'translateY(110%)' }}>
                  {word}
                </span>
              ))}
            </p>
          ))}
        </div>

        {/* Notify form */}
        <form
          ref={formRef}
          onSubmit={handleNotify}
          className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full max-w-md mt-1"
        >
          <div className="flex flex-col flex-1 gap-1">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={() => emailError && setEmailError('')}
              className="flex-1 px-4 py-2.5 text-sm font-josefin outline-none transition-colors w-full"
              style={{
                background: 'rgba(239,211,182,0.07)',
                border: `1px solid ${emailError ? '#ef4444' : RUST2 + '66'}`,
                color: CREAM,
              }}
            />
            {emailError && (
              <span className="font-josefin text-left" style={{ color: '#f87171', fontSize: '11px' }}>
                {emailError}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="whitespace-nowrap font-josefin tracking-widest w-full sm:w-auto"
            style={{
              background: RUST,
              color: CREAM,
              border: `1px solid ${RUST2}`,
              fontSize: '11px',
              padding: '10px 22px',
              letterSpacing: '0.12em',
              transition: 'background 0.3s',
            }}
            onMouseEnter={e => gsap.to(e.currentTarget, { backgroundColor: RUST2, duration: 0.3 })}
            onMouseLeave={e => gsap.to(e.currentTarget, { backgroundColor: RUST, duration: 0.3 })}
          >
            NOTIFY ME
          </button>
        </form>

        {/* Social */}
        <div ref={socialRef} className="flex items-center gap-3 sm:gap-4">
          {['facebook-f', 'instagram', 'twitter', 'youtube'].map((icon) => (
            <a
              key={icon}
              href="#"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center"
              style={{ border: `1px solid ${RUST2}66`, color: `${CREAM}99`, fontSize: '12px' }}
              onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.2, backgroundColor: RUST, borderColor: RUST2, duration: 0.3 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, backgroundColor: 'transparent', borderColor: `${RUST2}66`, duration: 0.3 })}
            >
              <i className={`fa-brands fa-${icon}`} />
            </a>
          ))}
        </div>

        {/* Footer note */}
        <p ref={footerRef} className="font-josefin"
          style={{ color: `${CREAM}80`, fontSize: '10px', letterSpacing: '0.15em', opacity: 0 }}>
          BULBUL · CITY OF LONDON
        </p>

      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${RUST2}, transparent)` }}
      />

      {/* Toast */}
      {toast && (
        <div
          ref={toastRef}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 w-[90vw] sm:w-auto max-w-sm"
          style={{
            background: '#1a0b09ee',
            border: `1px solid ${RUST2}`,
            backdropFilter: 'blur(14px)',
            boxShadow: `0 8px 32px ${RUST}66`,
          }}
        >
          <span style={{ color: GOLD, fontSize: '16px' }}>✓</span>
          <p className="font-josefin" style={{ color: CREAM, fontSize: '13px', letterSpacing: '0.05em' }}>
            You're on the list! We'll notify you at launch.
          </p>
        </div>
      )}

    </section>
  )
}
