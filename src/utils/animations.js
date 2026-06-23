import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single source of truth for GSAP + plugin registration.
 * Import { gsap, ScrollTrigger } from here instead of registering
 * plugins in every component (registering twice is harmless but noisy).
 */
gsap.registerPlugin(ScrollTrigger);

// Bidirectional scroll reveals for every non-scrub ScrollTrigger:
//   onEnter       (scroll down into view)    → play
//   onLeave       (scroll past it going down) → stay visible (none)
//   onEnterBack   (scroll back into view)    → stay visible (none)
//   onLeaveBack   (scroll back up past it)   → reverse
// Animations play on scroll down and reverse only when scrolling back up past them.
ScrollTrigger.defaults({ toggleActions: "play none none reverse" });

// Prevent gsap.from() from immediately rendering the "from" state
// which can cause content to flash invisible before ScrollTrigger fires.
gsap.defaults({ overwrite: "auto" });

// Media-query strings for use with gsap.matchMedia().
// Heavy motion runs only when the user has NOT asked for reduced motion.
export const NO_PREFERENCE = "(prefers-reduced-motion: no-preference)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Run GSAP setup only after the web fonts have finished loading.
 * The `build` callback runs inside a nested gsap.context scoped to `scope`,
 * so any tweens/ScrollTriggers it creates are cleaned up when the outer
 * context reverts.
 *
 * @param {HTMLElement|React.RefObject} scope  context scope for the animations
 * @param {() => (void | (() => void))} build  creates the animations
 * @returns {() => void} cleanup to return from the matchMedia/effect callback
 */
export function afterFonts(scope, build) {
  let cancelled = false;
  let inner;
  const run = () => { if (!cancelled) inner = gsap.context(build, scope); };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(run);
  } else {
    run();
  }

  return () => { cancelled = true; if (inner) inner.revert(); };
}

/**
 * Compatibility wrapper — previously used SplitText to split headings into
 * masked lines for reveals. Now simply returns the element itself.
 * 
 * Consuming code does: gsap.from(heading.lines, { yPercent: 120 })
 * Without a mask, yPercent:120 just moves the block off-screen. Since
 * ScrollTrigger's toggleActions "play none none reverse" ensures animations
 * fire on scroll, the element animates into view when triggered.
 */
export function splitLines(el) {
  return { lines: el ? [el] : [], revert: () => {} };
}

export { gsap, ScrollTrigger };
