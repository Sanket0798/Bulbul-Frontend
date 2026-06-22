import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Menu", to: "/menu" },
  { label: "Reservations", to: "https://www.sevenrooms.com/explore/bulbul/reservations/create/search/", external: true },
  { label: "Group Bookings", to: "/group-bookings" },
  { label: "Talent Pool", to: "/careers" },
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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isTransparent = transparent && !scrolled;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isTransparent
          ? "bg-transparent border-b-0"
          : "bg-rust backdrop-blur-md shadow-md"}`}>

        <div className="max-w-container mx-auto px-5 sm:px-8 lg:px-15 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img src="/images/brand/logo/Bulbul.png" alt="Bulbul Restaurant"
              className="w-36 object-contain" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-[30px]">
            {NAV_LINKS.map(({ label, to, external }) => (
              external ? (
                <a key={label} href={to} target="_blank" rel="noopener noreferrer"
                  className="font-freight text-lg leading-[26px] font-semibold no-underline transition-colors duration-300 text-cream">
                  {label}
                </a>
              ) : (
                <Link key={label} to={to}
                  className={`font-freight text-lg leading-[26px] font-semibold no-underline transition-colors duration-300
                    ${pathname === to ? "text-accent-gold" : "text-cream"}`}>
                  {label}
                </Link>
              )
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[6px] p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu">
            <span className={`block w-7 h-[3px] rounded-sm bg-cream
              ${menuOpen ? "rotate-45 translate-x-[5px] translate-y-[9px]" : ""}`} />
            <span className={`block w-7 h-[3px] rounded-sm bg-cream
              ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`block w-7 h-[3px] rounded-sm bg-cream
              ${menuOpen ? "-rotate-45 translate-x-[5px] -translate-y-[9px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu — rendered via portal to escape any parent constraints */}
      {menuOpen && createPortal(
        <div
          className="md:hidden fixed inset-0 flex flex-col overflow-y-auto"
          style={{ zIndex: 9999, backgroundColor: "#232323" }}
        >
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
              <span className="block w-7 h-[3px] rounded-sm bg-cream rotate-45 translate-y-[1.5px]" />
              <span className="block w-7 h-[3px] rounded-sm bg-cream -rotate-45 -translate-y-[1.5px]" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-8 px-5 sm:px-8 pt-10">
            {NAV_LINKS.map(({ label, to, external }) => (
              external ? (
                <a key={label} href={to} target="_blank" rel="noopener noreferrer"
                  className="font-freight text-[28px] leading-[36px] font-semibold no-underline text-cream"
                  onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ) : (
                <Link key={label} to={to}
                  className={`font-freight text-[28px] leading-[36px] font-semibold no-underline
                    ${pathname === to ? "text-accent-gold" : "text-cream"}`}
                  onClick={() => setMenuOpen(false)}>
                  {label}
                </Link>
              )
            ))}
          </nav>
        </div>,
        document.body
      )}
    </>
  );
}
