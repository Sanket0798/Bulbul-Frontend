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

function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

// Warm rust/gold ambient orbs matching brand palette
function Orbs() {
  const orbsRef = useRef(null)
  useEffect(() => {
    const orbs = orbsRef.current.querySelectorAll('.orb')
    orbs.forEach((orb) => {
      gsap.set(orb, {
        x: gsap.utils.random(-60, 60),
        y: gsap.utils.random(-60, 60),
        scale: gsap.utils.random(0.7, 1.3),
      })
      gsap.to(orb, {
        x: `+=${gsap.utils.random(-80, 80)}`,
        y: `+=${gsap.utils.random(-80, 80)}`,
        duration: gsap.utils.random(8, 14),
        repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
      gsap.to(orb, {
        opacity: gsap.utils.random(0.06, 0.18),
        duration: gsap.utils.random(4, 7),
        repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
    })
  }, [])

  const orbs = [
    { w: 400, color: '#c45a38', top: '5%',  left: '10%'  },
    { w: 300, color: '#eab932', top: '70%', left: '80%'  },
    { w: 350, color: '#7d332c', top: '50%', left: '5%'   },
    { w: 250, color: '#c45a38', top: '20%', left: '75%'  },
    { w: 320, color: '#efd3b6', top: '85%', left: '40%'  },
    { w: 200, color: '#eab932', top: '35%', left: '55%'  },
  ]

  return (
    <div ref={orbsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((o, i) => (
        <div key={i} className="orb absolute rounded-full"
          style={{
            width: o.w, height: o.w,
            background: o.color,
            filter: 'blur(100px)',
            opacity: 0.1,
            top: o.top, left: o.left,
            transform: 'translate(-50%,-50%)',
          }}
        />
      ))}
    </div>
  )
}

export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE)
  const [toast, setToast]       = useState(false)
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
  const birdRef     = useRef(null)
  const taglineRef  = useRef(null)
  const titleRef    = useRef(null)
  const dividerRef  = useRef(null)
  const storyRef    = useRef(null)
  const timerRef    = useRef(null)
  const formRef     = useRef(null)
  const socialRef   = useRef(null)
  const footerRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Bird drifts in from top
      tl.fromTo(birdRef.current,
        { y: -50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'back.out(1.4)' }
      )

      // 2. Tagline — word by word with slight upward drift + fade
      .fromTo(taglineRef.current.querySelectorAll('.tagline-word'),
        { y: 18, opacity: 0, filter: 'blur(4px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.55, stagger: 0.1, ease: 'power2.out' }, '-=0.5'
      )

      // 3. "Coming Soon" — char typewriter
      .fromTo(titleRef.current.querySelectorAll('.title-char'),
        { opacity: 0, y: 14, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, stagger: 0.055, ease: 'power2.out' }, '-=0.3'
      )

      // 4. Gold shimmer sweep across title after typing finishes
      .to(titleRef.current, {
        backgroundImage: `linear-gradient(90deg, ${CREAM} 0%, ${GOLD} 40%, ${CREAM} 60%, ${CREAM} 100%)`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        backgroundSize: '200% 100%',
        backgroundPosition: '-100% 0',
        duration: 0
      }, '+=0.05')
      .to(titleRef.current, {
        backgroundPosition: '200% 0',
        duration: 1.2,
        ease: 'power1.inOut',
      })
      // reset back to solid cream after shimmer
      .to(titleRef.current, {
        backgroundImage: 'none',
        color: CREAM,
        duration: 0,
      })

      // 5. Divider expands from center
      .fromTo(dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, transformOrigin: 'center', ease: 'power2.inOut' }, '-=0.6'
      )

      // 6. Story words — slide up from clip, line by line with word stagger
      .fromTo(storyRef.current.querySelectorAll('.story-word'),
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.5, stagger: 0.018, ease: 'power2.out' }, '-=0.3'
      )

      // 7. Timer blocks pop in with scale bounce
      .fromTo(timerRef.current.querySelectorAll('.timer-block'),
        { y: 35, opacity: 0, scale: 0.75 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.6)' }, '-=0.2'
      )
      .fromTo(timerRef.current.querySelectorAll('.timer-sep'),
        { opacity: 0, scale: 0 },
        { opacity: 0.5, scale: 1, duration: 0.3, stagger: 0.08, ease: 'back.out(2)' }, '-=0.5'
      )

      // 8. Form slides up
      .fromTo(formRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, '-=0.2'
      )

      // 9. Social icons pop in with back ease
      .fromTo(socialRef.current.querySelectorAll('a'),
        { y: 16, opacity: 0, scale: 0.5 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.09, ease: 'back.out(1.7)' }, '-=0.3'
      )

      // 10. Footer note — letter-spacing expand
      .fromTo(footerRef.current,
        { opacity: 0, letterSpacing: '0.4em' },
        { opacity: 1, letterSpacing: '0.15em', duration: 0.9, ease: 'power2.out' }, '-=0.2'
      )

      // Continuous: gentle bird float
      gsap.to(birdRef.current, {
        y: -8, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5,
      })

      // Continuous: subtle gold glow pulse on title
      gsap.to(titleRef.current, {
        textShadow: `0 0 30px ${GOLD}55`,
        duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3,
      })

    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  // seconds flip
  const secRef  = useRef(null)
  const prevSec = useRef(seconds)
  useEffect(() => {
    if (secRef.current && seconds !== prevSec.current) {
      prevSec.current = seconds
      gsap.fromTo(secRef.current,
        { y: -14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, ease: 'power2.out' }
      )
    }
  }, [seconds])

  const pad = (n) => String(n).padStart(2, '0')
  const units = [
    { label: 'DAYS',    value: pad(days) },
    { label: 'HOURS',   value: pad(hours) },
    { label: 'MINUTES', value: pad(minutes) },
    { label: 'SECONDS', value: pad(seconds), ref: secRef },
  ]

  // brand colours
  const RUST   = '#7C2D26'
  const CREAM  = '#efd3b6'
  const GOLD   = '#eab932'
  const RUST2  = '#c45a38'

  return (
    <section
      ref={wrapperRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ background: '#1a0b09' }}
    >
      {/* Subtle texture overlay using RedBg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/images/brand/bg/RedBg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
        }}
      />

      <Orbs />

      {/* Thin top border accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, transparent, ${RUST2}, ${GOLD}, ${RUST2}, transparent)` }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 sm:px-10 py-10 sm:py-16 flex flex-col items-center text-center gap-4 sm:gap-6">

        {/* Bird logo */}
        <img
          ref={birdRef}
          src="/images/brand/logo/Bird.png"
          alt="Bulbul"
          style={{ width: 'clamp(44px, 10vw, 80px)', filter: `drop-shadow(0 0 18px ${RUST2}88)` }}
        />

        {/* Italic tagline — client copy */}
        <p
          ref={taglineRef}
          className="font-cormorant italic"
          style={{ color: CREAM, fontSize: 'clamp(18px, 5vw, 45px)', letterSpacing: '0.02em', fontWeight: 300 }}
        >
          {['little', "birdie's", 'been', 'spreading', 'the', 'word.'].map((word, i) => (
            <span key={i} className="tagline-word" style={{ display: 'inline-block', marginRight: '0.28em', opacity: 0 }}>
              {word}
            </span>
          ))}
        </p>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-gilda"
          style={{ color: CREAM, fontSize: 'clamp(38px, 9vw, 80px)', lineHeight: 1.1, letterSpacing: '0.04em' }}
        >
          {'Coming Soon'.split('').map((char, i) => (
            <span key={i} className="title-char" style={{ display: 'inline-block'}}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Ornamental divider */}
        <div ref={dividerRef} className="flex items-center gap-3 w-40 sm:w-64">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${RUST2})` }} />
          <span style={{ color: GOLD, fontSize: '14px' }}>✦</span>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${RUST2}, transparent)` }} />
        </div>

        {/* Story copy — client copy */}
        <div ref={storyRef} className="flex flex-col gap-2 sm:gap-3 max-w-lg w-full px-1 sm:px-0">
          {[
            'Something new is coming to the City of London.',
            'Indian small plates and cocktails.',
            "We've grown up with a version of Indian food shaped by homes and everyday cooking, the kind that rarely makes it onto restaurant menus.",
            'At Bulbul, that is what comes to the table, gathered along the way and shared with you.',
            "Opening this June. We'd love to have you in early.",
          ].map((line, pi) => (
            <p key={pi}
              className={`font-josefin story-line overflow-hidden${pi === 4 ? ' font-semibold' : ''}`}
              style={{
                color: pi === 4 ? CREAM : `${CREAM}cc`,
                fontSize: pi === 2 ? 'clamp(12px, 2vw, 14px)' : 'clamp(13px, 2.2vw, 15px)',
                lineHeight: 1.85,
              }}
            >
              {line.split(' ').map((word, wi) => (
                <span key={wi} className="story-word"
                  style={{ display: 'inline-block', marginRight: '0.3em', opacity: 0, transform: 'translateY(100%)' }}>
                  {word}
                </span>
              ))}
            </p>
          ))}
        </div>

        {/* Countdown */}
        <div ref={timerRef} className="flex items-center justify-center gap-2 sm:gap-4 w-full mt-2">
          {units.map(({ label, value, ref }, i) => (
            <div key={label} className="flex items-center gap-2 sm:gap-4">
              <div
                className="timer-block rounded-lg flex flex-col items-center px-3 sm:px-5 py-3 sm:py-4"
                style={{
                  background: 'rgba(124,45,38,0.18)',
                  border: `1px solid ${RUST2}55`,
                  backdropFilter: 'blur(10px)',
                  minWidth: 'clamp(60px, 15vw, 88px)',
                }}
              >
                <span
                  ref={ref || undefined}
                  className="font-gilda font-light"
                  style={{ color: CREAM, fontSize: 'clamp(26px, 6.5vw, 60px)', lineHeight: 1, display: 'block' }}
                >
                  {value}
                </span>
                <span
                  className="font-josefin tracking-widest mt-1"
                  style={{ color: `${CREAM}70`, fontSize: 'clamp(7px, 1.6vw, 10px)' }}
                >
                  {label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="timer-sep font-gilda self-center pb-4"
                  style={{ color: `${GOLD}88`, fontSize: 'clamp(20px, 4.5vw, 44px)', lineHeight: 1 }}>
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Notify form */}
        <form
          ref={formRef}
          onSubmit={handleNotify}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-1"
        >
          <div className="flex flex-col flex-1 gap-1">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={() => emailError && setEmailError('')}
              className="flex-1 px-4 py-3 text-sm font-josefin outline-none transition-colors w-full"
              style={{
                background: 'rgba(239,211,182,0.07)',
                border: `1px solid ${emailError ? '#ef4444' : RUST2 + '66'}`,
                color: CREAM,
                '::placeholder': { color: `${CREAM}55` },
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
            className="whitespace-nowrap font-josefin tracking-widest transition-all duration-300 w-full sm:w-auto"
            style={{
              background: RUST,
              color: CREAM,
              border: `1px solid ${RUST2}`,
              fontSize: '12px',
              padding: '12px 24px',
              letterSpacing: '0.12em',
            }}
            onMouseEnter={e => gsap.to(e.currentTarget, { backgroundColor: RUST2, duration: 0.3 })}
            onMouseLeave={e => gsap.to(e.currentTarget, { backgroundColor: RUST, duration: 0.3 })}
          >
            NOTIFY ME
          </button>
        </form>

        {/* Social */}
        <div ref={socialRef} className="flex items-center gap-3 sm:gap-4 mt-1">
          {['facebook-f', 'instagram', 'twitter', 'youtube'].map((icon) => (
            <a
              key={icon}
              href="#"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ border: `1px solid ${RUST2}66`, color: `${CREAM}99`, fontSize: '13px' }}
              onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.2, backgroundColor: RUST, borderColor: RUST2, duration: 0.3 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, backgroundColor: 'transparent', borderColor: `${RUST2}66`, duration: 0.3 })}
            >
              <i className={`fa-brands fa-${icon}`} />
            </a>
          ))}
        </div>

        {/* Footer note */}
        <p ref={footerRef} className="font-josefin" style={{ color: `${CREAM}44`, fontSize: '10px', letterSpacing: '0.15em', marginTop: '8px', opacity: 0 }}>
          BULBUL · CITY OF LONDON
        </p>

      </div>

      {/* Bottom border accent */}
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
