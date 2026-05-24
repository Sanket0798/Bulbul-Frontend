import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',    to: '/home' },
  { label: 'About',   to: '/about' },
  { label: 'Menu',    to: '/rooms' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar({ transparent = false }) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { pathname }              = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isTransparent = transparent && !scrolled

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isTransparent ? 'transparent' : 'rgba(26,11,9,0.96)',
        backdropFilter: isTransparent ? 'none' : 'blur(12px)',
        borderBottom: isTransparent ? 'none' : '1px solid rgba(234,185,50,0.15)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-[60px] flex items-center justify-between"
        style={{ height: '79px' }}>

        {/* Logo */}
        <Link to="/home" className="shrink-0">
          <img
            src="/images/brand/logo/Bulbul.png"
            alt="Bulbul Restaurant"
            className="object-contain"
            style={{ height: '64px', width: 'auto' }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="font-gilda text-[18px] transition-colors duration-300"
              style={{
                color: pathname === to ? '#eab932' : '#efd3b6',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block w-6 h-[2px] bg-[#efd3b6] transition-all duration-300"
              style={{
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                  : i === 1 ? 'opacity:0'
                  : 'rotate(-45deg) translate(5px,-5px)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-[60px] pb-6 flex flex-col gap-4"
          style={{ background: 'rgba(26,11,9,0.98)' }}
        >
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="font-gilda text-[18px] text-[#efd3b6]"
              style={{ textDecoration: 'none' }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
