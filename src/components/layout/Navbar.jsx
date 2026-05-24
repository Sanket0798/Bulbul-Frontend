import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home",    to: "/home"    },
  { label: "About",   to: "/about"   },
  { label: "Menu",    to: "/rooms"   },
  { label: "Contact", to: "/contact" },
];

export default function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname }            = useLocation();

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
        : "bg-charcoal/96 backdrop-blur-md border-b border-accent-gold/15"}`}>

      <div className="max-w-page mx-auto px-15 h-[79px] flex items-center justify-between">

        {/* Logo */}
        <Link to="/home" className="shrink-0">
          <img src="/images/brand/logo/Bulbul.png" alt="Bulbul Restaurant"
            className="h-16 w-auto object-contain" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={label} to={to}
              className={`font-freight text-[18px] no-underline transition-colors duration-300
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-15 pb-6 flex flex-col gap-4 bg-charcoal/98">
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={label} to={to}
              className="font-freight text-[18px] text-cream no-underline"
              onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
