import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook that splits text into individual characters/words and animates them.
 * 
 * @param {Object} options
 * @param {"chars"|"words"} options.type - Split by characters or words
 * @param {string} options.animation - Animation preset: "fadeUp", "rotateIn", "blurIn", "wave"
 * @param {number} options.stagger - Stagger delay between elements (default: 0.03)
 * @param {number} options.duration - Animation duration (default: 0.8)
 * @param {string} options.start - ScrollTrigger start position (default: "top 80%")
 */
export function useTextSplit({
  type = "chars",
  animation = "fadeUp",
  stagger = 0.03,
  duration = 0.8,
  start = "top 80%",
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Split text into spans
    const text = el.textContent;
    const items = type === "chars" ? text.split("") : text.split(" ");

    el.innerHTML = items
      .map((item) => {
        const display = type === "chars"
          ? (item === " " ? "&nbsp;" : item)
          : item;
        return `<span class="split-item" style="display:inline-block;will-change:transform,opacity,filter;">${display}</span>`;
      })
      .join(type === "words" ? '<span style="display:inline-block;">&nbsp;</span>' : "");

    const splitItems = el.querySelectorAll(".split-item");

    // Animation presets
    const animations = {
      fadeUp: {
        from: { opacity: 0, y: 30, rotateX: -40 },
        to: { opacity: 1, y: 0, rotateX: 0 },
      },
      rotateIn: {
        from: { opacity: 0, rotateZ: gsap.utils.wrap([-8, 8, -5, 5]), scale: 0.7, y: 20 },
        to: { opacity: 1, rotateZ: 0, scale: 1, y: 0 },
      },
      blurIn: {
        from: { opacity: 0, filter: "blur(8px)", y: 15 },
        to: { opacity: 1, filter: "blur(0px)", y: 0 },
      },
      wave: {
        from: { opacity: 0, y: 40, scaleY: 0.3 },
        to: { opacity: 1, y: 0, scaleY: 1 },
      },
    };

    const preset = animations[animation] || animations.fadeUp;

    gsap.fromTo(splitItems, preset.from, {
      ...preset.to,
      stagger,
      duration,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play reverse play reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
      // Restore original text
      el.textContent = text;
    };
  }, [type, animation, stagger, duration, start]);

  return ref;
}
