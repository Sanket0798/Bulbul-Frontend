import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Single source of truth for GSAP + plugin registration.
 * Import { gsap, ScrollTrigger, SplitText } from here instead of registering
 * plugins in every component (registering twice is harmless but noisy).
 */
gsap.registerPlugin(ScrollTrigger, SplitText);

// Bidirectional scroll reveals for every non-scrub ScrollTrigger:
//   onEnter      (scroll down into view)  → play
//   onLeaveBack  (scroll back up past it) → reverse
// So animations also run when the user scrolls bottom → top, then replay on the
// way down again. Scrub-based parallax ignores toggleActions, so it's unaffected.
ScrollTrigger.defaults({ toggleActions: "play none none reverse" });

// Media-query strings for use with gsap.matchMedia().
// Heavy motion runs only when the user has NOT asked for reduced motion.
export const NO_PREFERENCE = "(prefers-reduced-motion: no-preference)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Create a line-masked SplitText for a heading. `mask: "lines"` clips each
 * line so a reveal can slide up from behind it.
 * Caller is responsible for calling `.revert()` in cleanup.
 */
export function splitLines(el) {
  return SplitText.create(el, { type: "lines", mask: "lines" });
}

/**
 * Run GSAP setup only after the web fonts have finished loading. SplitText must
 * measure line breaks against the final font, otherwise it splits wrong (and
 * GSAP warns "SplitText called before fonts loaded"). The `build` callback runs
 * inside a nested gsap.context scoped to `scope`, so any tweens/ScrollTriggers
 * it creates — and a cleanup function it returns (e.g. reverting a SplitText) —
 * are cleaned up when the outer context reverts.
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

export { gsap, ScrollTrigger, SplitText };
