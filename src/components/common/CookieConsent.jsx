import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const COOKIE_KEY = "bulbul_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    // Check if user already consented
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Show after a short delay for better UX
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  useEffect(() => {
    if (visible && bannerRef.current) {
      gsap.fromTo(bannerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [visible]);

  const handleAcceptAll = () => {
    localStorage.setItem(COOKIE_KEY, "all");
    closeBanner();
  };

  const handleEssentialOnly = () => {
    localStorage.setItem(COOKIE_KEY, "essential");
    closeBanner();
  };

  const closeBanner = () => {
    gsap.to(bannerRef.current, {
      y: 100, opacity: 0, duration: 0.4, ease: "power2.in",
      onComplete: () => setVisible(false),
    });
  };

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      className="fixed bottom-0 left-0 right-0 z-[9998] px-4 sm:px-6 pb-4 sm:pb-6"
      style={{ opacity: 0 }}
    >
      <div className="max-w-[900px] mx-auto bg-[#1a0b09] border border-[#c45a38]/30 rounded-lg shadow-2xl p-5 sm:p-6 backdrop-blur-sm">

        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="font-freight text-[20px] sm:text-[24px] font-semibold text-cream leading-tight">
              Cookie Policy
            </h3>
            <p className="font-freight text-[14px] sm:text-[15px] leading-[1.6] text-cream/70 mt-2">
              The best cookies are for dipping — preferably into a steaming cup of spiced chai. Our digital cookies might not be as appetising as a fresh batch of Nankhatai, but they play a vital role in making your online journey smooth and seamless.
            </p>
          </div>
        </div>

        {/* Expandable details */}
        {expanded && (
          <div className="mt-3 mb-4 max-h-[250px] overflow-y-auto pr-2 scrollbar-hide" data-lenis-prevent style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <div className="flex flex-col gap-3 text-cream/80 font-freight text-[13px] sm:text-[14px] leading-[1.6]">
              <div>
                <h4 className="font-semibold text-cream text-[14px] sm:text-[15px] mb-1">1. Essential Cookies</h4>
                <p>Strictly necessary cookies are vital to let you move around our website, navigate smoothly, and use its core functions. The data collected relates purely to the essential operation of our site.</p>
              </div>
              <div>
                <h4 className="font-semibold text-cream text-[14px] sm:text-[15px] mb-1">2. Performance & Analytics</h4>
                <p>These collect anonymous information to analyze how visitors interact with our website. We use Google Analytics and Microsoft Clarity to gather data that helps us refine our services.</p>
              </div>
              <div>
                <h4 className="font-semibold text-cream text-[14px] sm:text-[15px] mb-1">3. Functionality Cookies</h4>
                <p>These remember your choices and preferences (location, reservation details, browser settings) to tailor your future visits.</p>
              </div>
              <div>
                <h4 className="font-semibold text-cream text-[14px] sm:text-[15px] mb-1">4. Advertising & Marketing</h4>
                <p>These follow your browsing habits to deliver tailored advertising aligned with your interests and help measure campaign effectiveness.</p>
              </div>
              <div>
                <h4 className="font-semibold text-cream text-[14px] sm:text-[15px] mb-1">5. Social Media & Meta</h4>
                <p>These allow you to interact with social media platforms and enable us to serve relevant content via Meta Advertising while you browse.</p>
              </div>
              <p className="text-cream/60 text-[12px] mt-2">
                You may manage or disable cookies through your browser settings. Visit{" "}
                <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent-gold">allaboutcookies.org</a>{" "}
                for detailed guidance.
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
          <button
            onClick={handleAcceptAll}
            className="px-6 py-[9px] bg-primary text-cream font-freight font-semibold text-[15px] rounded transition-all duration-300 hover:bg-rust-dark cursor-pointer"
          >
            Accept All Cookies
          </button>
          <button
            onClick={handleEssentialOnly}
            className="px-6 py-[9px] border border-cream/30 text-cream font-freight font-semibold text-[15px] rounded transition-all duration-300 hover:border-cream/60 cursor-pointer"
          >
            Essential Only
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-4 py-[9px] text-cream/60 font-freight font-medium text-[14px] transition-colors duration-300 hover:text-cream cursor-pointer underline"
          >
            {expanded ? "Hide Details" : "Cookie Details"}
          </button>
        </div>
      </div>
    </div>
  );
}
