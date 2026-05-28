import { useEffect } from "react";
import { Link } from "react-router-dom";
import arrowRight from "@/assets/icons/svg/right-arrow.svg";

export default function DishModal({ dish, onClose }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!dish) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative w-full max-w-[900px] bg-bg border border-rust/15 shadow-2xl flex flex-col lg:flex-row overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-charcoal/60 text-cream hover:bg-rust transition-colors duration-300 cursor-pointer"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="lg:w-1/2 h-[280px] lg:h-auto shrink-0">
          <img
            src={dish.img}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="lg:w-1/2 flex flex-col justify-between p-8 lg:p-10">
          <div>
            {/* Category tag */}
            <span className="font-josefin text-[12px] uppercase tracking-[0.2em] text-olive font-medium">
              {dish.category}
            </span>

            {/* Dish name */}
            <h2 className="font-freight text-[36px] lg:text-[42px] leading-[1.1] text-rust-dark font-semibold mt-2 mb-4">
              {dish.name}
            </h2>

            {/* Decorative line */}
            <div className="w-16 h-[2px] bg-gradient-to-r from-rust to-accent-gold mb-5" />

            {/* Description */}
            <p className="font-freight font-medium text-[17px] leading-[26px] text-olive/90 mb-6">
              {dish.desc}
            </p>

            {/* Highlights */}
            {dish.highlights && (
              <div className="flex flex-wrap gap-2 mb-6">
                {dish.highlights.map((tag) => (
                  <span key={tag} className="font-josefin text-[11px] uppercase tracking-wider px-3 py-1 border border-olive/20 text-olive/70">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <Link
            to="/contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 self-start px-8 py-3 bg-rust text-cream font-freight text-[18px] font-semibold rounded transition-all duration-300 hover:bg-rust-dark"
          >
            Reserve a Table <img src={arrowRight} alt="" className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
