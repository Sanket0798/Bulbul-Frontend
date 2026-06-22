import { Link } from "react-router-dom";
import brandLogo from "@/assets/icons/svg/brand-white-logo.svg";
import youtubeSvg from "@/assets/icons/svg/youtube.svg";
import instagramSvg from "@/assets/icons/svg/instagram.svg";
import facebookSvg from "@/assets/icons/svg/facebook.svg";
import twitterPng from "@/assets/icons/svg/twitter.svg";

const SOCIAL_LINKS = [
  {
    label: "YouTube",
    href: import.meta.env.VITE_SOCIAL_YOUTUBE || "https://youtube.com/@bulbulrestaurant",
    icon: youtubeSvg,
  },
  {
    label: "Instagram",
    href: import.meta.env.VITE_SOCIAL_INSTAGRAM || "https://instagram.com/bulbulrestaurant",
    icon: instagramSvg,
  },
  {
    label: "Facebook",
    href: import.meta.env.VITE_SOCIAL_FACEBOOK || "https://facebook.com/bulbulrestaurant",
    icon: facebookSvg,
  },
  {
    label: "Twitter",
    href: import.meta.env.VITE_SOCIAL_TWITTER || "https://twitter.com/bulbulrestaurant",
    icon: twitterPng,
  },
];

const FOOTER_LINKS = [
  { label: "Home", to: "/" },
  { label: "Reservation", to: "https://www.sevenrooms.com/explore/bulbul/reservations/create/search/", external: true },
  { label: "Menu", to: "/menu" },
  { label: "Directions", to: "https://maps.google.com/?q=Bulbul+Tudor+Street+London", external: true },
];

export default function Footer() {
  return (
    <footer className="w-full py-[30px] bg-rust-dark border-t border-accent-gold/15">
      <div className="max-w-page mx-auto px-5 sm:px-8 flex flex-col items-center gap-[14px]">

        {/* Logo */}
        <img src={brandLogo} alt="Bulbul Restaurant"
          className="w-auto object-contain" />

        {/* Connect label */}
        <p className="font-freight font-medium text-xl text-white">
          connect with us
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              aria-label={label}
              className="">
              <img src={icon} alt={label} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="font-freight font-medium text-lg text-white">
          Ⓒ 2026 Bulbul. All Rights Reserved
        </p>

        {/* Footer nav */}
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {FOOTER_LINKS.map(({ label, to, external }, i) => (
            <span key={label} className="flex items-center gap-4">
              {external ? (
                <a href={to} target="_blank" rel="noopener noreferrer"
                  className="font-freight text-caption tracking-widest no-underline
                    text-white font-medium text-lg hover:text-accent-gold transition-colors duration-300">
                  {label}
                </a>
              ) : (
                <Link to={to}
                  className="font-freight text-caption tracking-widest no-underline
                    text-white font-medium text-lg hover:text-accent-gold transition-colors duration-300">
                  {label}
                </Link>
              )}
              {i < FOOTER_LINKS.length - 1 && (
                <span className="text-white font-medium text-base">|</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
