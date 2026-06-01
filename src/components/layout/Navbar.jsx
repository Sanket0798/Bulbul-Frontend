import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  // { label: "Menu", to: "/rooms" },
  { label: "Group Bookings", to: "/group-bookings" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isTransparent = transparent && !scrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${isTransparent
        ? "bg-transparent border-b-0"
        : "bg-charcoal/96 backdrop-blur-md"}`}>

      <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-15 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src="/images/brand/logo/bulbul-text-white.png" alt="Bulbul Restaurant"
            className="w-36 object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-[30px]">
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={label} to={to}
              className={`font-freight text-lg leading-[26px] font-semibold no-underline transition-colors duration-300
                ${pathname === to ? "text-accent-gold" : "text-cream"}`}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu">
          <span className={`block w-6 h-[2px] bg-cream transition-all duration-300
            ${menuOpen ? "rotate-45 translate-x-[5px] translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-cream transition-all duration-300
            ${menuOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`block w-6 h-[2px] bg-cream transition-all duration-300
            ${menuOpen ? "-rotate-45 translate-x-[5px] -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu — full screen overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 z-40 bg-charcoal flex flex-col">
          {/* Menu header with logo and close */}
          <div className="px-5 sm:px-8 py-4 flex items-center justify-between">
            <Link to="/" className="shrink-0" onClick={() => setMenuOpen(false)}>
              <img src="/images/brand/logo/bulbul-text-white.png" alt="Bulbul Restaurant"
                className="w-36 object-contain" />
            </Link>
            <button
              className="p-2"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu">
              <span className="block w-6 h-[2px] bg-cream rotate-45 translate-y-[1px]" />
              <span className="block w-6 h-[2px] bg-cream -rotate-45 -translate-y-[1px]" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-6 px-5 sm:px-8 pt-10">
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={label} to={to}
                className={`font-freight text-[28px] leading-[36px] font-semibold no-underline transition-colors duration-300
                  ${pathname === to ? "text-accent-gold" : "text-cream"}`}
                onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
