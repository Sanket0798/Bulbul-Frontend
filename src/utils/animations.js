import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Single source of truth for GSAP + plugin registration.
 * Import { gsap, ScrollTrigger, SplitText } from here instead of registering
 * plugins in every component (registering twice is harmless but noisy).
 */
gsap.registerPlugin(ScrollTrigger, SplitText);

// Media-query strings for use with gsap.matchMedia().
// Heavy motion runs only when the user has NOT asked for reduced motion.
export const NO_PREFERENCE = "(prefers-reduced-motion: no-preference)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export { gsap, ScrollTrigger, SplitText };
