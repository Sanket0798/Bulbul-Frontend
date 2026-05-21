import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// brand colours
const RUST  = '#7C2D26'
const CREAM = '#ffffff'
const GOLD  = '#eab932'
const RUST2 = '#c45a38'

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || ''

export default function ComingSoon() {
  const [toast, setToast]           = useState(false)
  const [emailError, setEmailError] = useState('')
  const [agreeError, setAgreeError] = useState('')
  const [agreed, setAgreed]         = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const toastRef = useRef(null)

  const showToast = () => {
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
  }

  const handleNotify = async (e) => {
    e.preventDefault()
    const email = e.target.elements.email.value.trim()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) { setEmailError('Please enter a valid email address.'); return }
    setEmailError('')
    if (!agreed) { setAgreeError('Please agree to receive updates before subscribing.'); return }
    setAgreeError('')
    setSubmitting(true)
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'New Waitlist Signup — Bulbul Restaurant',
          email,
        }),
      })
      if (res.ok) { showToast(); e.target.reset(); setAgreed(false) }
      else showToast()
    } catch { showToast() }
    finally { setSubmitting(false) }
  }

  // refs
  const wrapperRef  = useRef(null)
  const videoRef    = useRef(null)
  const logoRef     = useRef(null)
  const taglineRef  = useRef(null)
  const titleRef    = useRef(null)
  const dividerRef  = useRef(null)
  const storyRef    = useRef(null)
  const formRef     = useRef(null)
  const socialRef   = useRef(null)
  const footerRef   = useRef(null)

  // ── iOS video autoplay fix ──
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    const playVideo = async () => { try { await video.play() } catch { /* silent */ } }
    playVideo()
    document.addEventListener('touchstart', playVideo, { once: true })
    return () => document.removeEventListener('touchstart', playVideo)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(logoRef.current,
        { y: -60, opacity: 0, scale: 0.4, filter: 'blur(8px)' },
        { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'elastic.out(1, 0.6)' }
      )
      .fromTo(taglineRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5'
      )
      .fromTo(titleRef.current.querySelectorAll('.title-char'),
        { opacity: 0, y: 30, rotateZ: gsap.utils.wrap([-4, 4]), scale: 0.7, filter: 'blur(4px)' },
        { opacity: 1, y: 0, rotateZ: 0, scale: 1, filter: 'blur(0px)', duration: 0.45, stagger: { each: 0.05, ease: 'power1.in' }, ease: 'back.out(1.5)' }, '-=0.3'
      )
      .to(titleRef.current, {
        backgroundImage: `linear-gradient(90deg, ${CREAM} 0%, ${GOLD} 45%, ${CREAM} 55%, ${CREAM} 100%)`,
        backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent',
        backgroundSize: '200% 100%', backgroundPosition: '-100% 0', duration: 0,
      }, '+=0.05')
      .to(titleRef.current, { backgroundPosition: '200% 0', duration: 1.1, ease: 'power1.inOut' })
      .to(titleRef.current, { backgroundImage: 'none', color: CREAM, duration: 0 })
      .fromTo(dividerRef.current.querySelector('.div-left'),
        { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, transformOrigin: 'right', ease: 'power2.inOut' }, '-=0.4'
      )
      .fromTo(dividerRef.current.querySelector('.div-right'),
        { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, transformOrigin: 'left', ease: 'power2.inOut' }, '-=0.5'
      )
      .fromTo(dividerRef.current.querySelector('.div-star'),
        { scale: 0, opacity: 0, rotateZ: -180 }, { scale: 1, opacity: 1, rotateZ: 0, duration: 0.5, ease: 'back.out(2.5)' }, '-=0.3'
      )
      .fromTo(storyRef.current.querySelectorAll('.story-word'),
        (i) => ({ y: 22 + Math.sin(i * 0.6) * 8, opacity: 0, filter: 'blur(3px)' }),
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, stagger: 0.018, ease: 'power2.out' }, '-=0.2'
      )
      .fromTo(formRef.current,
        { y: 40, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.75)' }, '-=0.1'
      )
      .fromTo(socialRef.current.querySelectorAll('a'),
        { y: 20, opacity: 0, scale: 0.3, rotateZ: -90 },
        { y: 0, opacity: 1, scale: 1, rotateZ: 0, duration: 0.5, stagger: 0.07, ease: 'back.out(2)' }, '-=0.4'
      )
      .fromTo(footerRef.current,
        { opacity: 0, letterSpacing: '0.5em', y: 8 },
        { opacity: 1, letterSpacing: '0.15em', y: 0, duration: 1.0, ease: 'power2.out' }, '-=0.2'
      )

      gsap.to(logoRef.current, { y: -8, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 })
      gsap.to(titleRef.current, { textShadow: `0 0 32px ${GOLD}55, 0 0 60px ${RUST2}33`, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3 })
      gsap.to(dividerRef.current.querySelector('.div-star'), { rotateZ: 360, duration: 12, repeat: -1, ease: 'none', delay: 2 })

    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={wrapperRef}
      className="relative w-screen overflow-hidden flex items-center justify-center"
      style={{ background: '#1a0b09', height: '100dvh' }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        preload="metadata"
        disablePictureInPicture
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.45, zIndex: 0 }}
      >
        <source src="/images/cuisines/video2.mp4" type="video/mp4" />
      </video>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #1a0b09cc 100%)', zIndex: 1 }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${RUST2}, ${GOLD}, ${RUST2}, transparent)`, zIndex: 2 }} />

      {/* ── Main content — scales as a whole to fit any viewport height ── */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ zIndex: 2, height: '100%' }}
      >
        <div
          className="w-full max-w-3xl mx-auto px-5 sm:px-10 flex flex-col items-center text-center"
          style={{ gap: 'clamp(8px, 2.6vh, 28px)' }}
        >

          {/* Logo */}
          <img
            ref={logoRef}
            src="/images/brand/logo/Bulbul.png"
            alt="Bulbul Restaurant"
            className="object-contain"
            style={{ width: 'clamp(100px, 14vh, 160px)', filter: `drop-shadow(0 0 16px ${RUST2}99)` }}
          />

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="font-cormorant italic whitespace-nowrap"
            style={{ color: CREAM, fontSize: 'clamp(16px, min(3.5vw, 4.2vh), 40px)', fontWeight: 300, letterSpacing: '0.01em', opacity: 0 }}
          >
            A Little birdie&apos;s been spreading the word.
          </p>

          {/* Main title */}
          <h1
            ref={titleRef}
            className="font-playfair"
            style={{ color: CREAM, fontSize: 'clamp(40px, min(9vw, 13vh), 96px)', lineHeight: 1.05, letterSpacing: '0.03em', fontWeight: 700 }}
          >
            {'Coming Soon'.split('').map((char, i) => (
              <span key={i} className="title-char" style={{ display: 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Ornamental divider */}
          <div ref={dividerRef} className="flex items-center gap-3 w-36 sm:w-56">
            <div className="div-left flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${RUST2})` }} />
            <span className="div-star inline-block" style={{ color: GOLD, fontSize: '12px' }}>✦</span>
            <div className="div-right flex-1 h-px" style={{ background: `linear-gradient(90deg, ${RUST2}, transparent)` }} />
          </div>

          {/* Story */}
          <div ref={storyRef} className="w-full max-w-2xl px-1 sm:px-0">
            {[
              "Something new is coming to the City of London — Indian small plates and cocktails.",
              "We've grown up with a version of Indian food shaped by homes and everyday cooking, the kind that rarely makes it onto restaurant menus.",
              "At Bulbul, that is what comes to the table, gathered along the way and shared with you.",
              "Opening this June. We'd love to have you in early.",
            ].map((line, pi) => (
              <p key={pi}
                className={`font-playfair story-line${pi === 3 ? ' font-semibold' : ''}`}
                style={{
                  color: pi === 3 ? CREAM : `${CREAM}cc`,
                  fontSize: 'clamp(13px, min(1.9vw, 2.4vh), 17px)',
                  lineHeight: 1.7,
                  marginBottom: pi < 3 ? '0.4em' : 0,
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
          <form ref={formRef} onSubmit={handleNotify} className="flex flex-col w-full max-w-md gap-2">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex flex-col flex-1 gap-1">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={() => emailError && setEmailError('')}
                  className="flex-1 px-4 py-2 text-sm font-josefin outline-none transition-colors w-full"
                  style={{
                    background: 'rgba(239,211,182,0.07)',
                    border: `1px solid ${emailError ? '#ef4444' : RUST2 + '66'}`,
                    color: CREAM,
                  }}
                />
                {emailError && (
                  <span className="font-josefin text-left" style={{ color: '#f87171', fontSize: '11px' }}>{emailError}</span>
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="whitespace-nowrap font-josefin tracking-widest w-full sm:w-auto"
                style={{
                  background: RUST, color: CREAM, border: `1px solid ${RUST2}`,
                  fontSize: '11px', padding: '9px 22px', letterSpacing: '0.12em',
                  transition: 'background 0.3s',
                  opacity: submitting ? 0.7 : 1,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={e => !submitting && gsap.to(e.currentTarget, { backgroundColor: RUST2, duration: 0.3 })}
                onMouseLeave={e => !submitting && gsap.to(e.currentTarget, { backgroundColor: RUST, duration: 0.3 })}
              >
                {submitting ? 'SENDING…' : 'NOTIFY ME'}
              </button>
            </div>

            {/* Consent checkbox */}
            <div className="flex flex-col gap-1">
              <label
                className="flex items-start gap-2 cursor-pointer select-none text-left"
                onClick={() => { setAgreed(v => !v); setAgreeError('') }}
              >
                <span
                  className="mt-0.5 flex-shrink-0 w-3.5 h-3.5 flex items-center justify-center transition-colors"
                  style={{
                    border: `1px solid ${agreeError ? '#ef4444' : agreed ? GOLD : RUST2 + '99'}`,
                    background: agreed ? RUST : 'rgba(239,211,182,0.07)',
                  }}
                >
                  {agreed && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className="font-josefin" style={{ color: `${CREAM}99`, fontSize: '10px', letterSpacing: '0.04em', lineHeight: 1.6 }}>
                  I agree to receive updates and launch news from Bulbul Restaurant. No spam, unsubscribe anytime.
                </span>
              </label>
              {agreeError && (
                <span className="font-josefin pl-5 text-left" style={{ color: '#f87171', fontSize: '10px' }}>{agreeError}</span>
              )}
            </div>
          </form>

          {/* Social */}
          <div ref={socialRef} className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://www.instagram.com/bulbullondonofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center"
              style={{ border: `1px solid ${RUST2}66`, color: `${CREAM}99`, fontSize: '12px' }}
              onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.2, backgroundColor: RUST, borderColor: RUST2, duration: 0.3 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, backgroundColor: 'transparent', borderColor: `${RUST2}66`, duration: 0.3 })}
            >
              <i className="fa-brands fa-instagram" />
            </a>
          </div>

          {/* Footer */}
          <p ref={footerRef} className="font-josefin"
            style={{ color: `${CREAM}80`, fontSize: '10px', letterSpacing: '0.15em', opacity: 0 }}>
            BULBUL · TUDOR St
          </p>

        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${RUST2}, transparent)`, zIndex: 2 }} />

      {/* Toast */}
      {toast && (
        <div
          ref={toastRef}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 w-[90vw] sm:w-auto max-w-sm"
          style={{ background: '#1a0b09ee', border: `1px solid ${RUST2}`, backdropFilter: 'blur(14px)', boxShadow: `0 8px 32px ${RUST}66` }}
        >
          <span style={{ color: GOLD, fontSize: '16px' }}>✓</span>
          <p className="font-josefin" style={{ color: CREAM, fontSize: '13px', letterSpacing: '0.05em' }}>
            You&apos;re on the list! We&apos;ll notify you at launch.
          </p>
        </div>
      )}

    </section>
  )
}
