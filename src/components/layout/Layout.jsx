import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll, { useLenis } from "@/components/common/SmoothScroll";

function LayoutContent() {
  const { pathname, hash } = useLocation();
  const lenisRef = useLenis();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          if (lenisRef?.current) {
            lenisRef.current.scrollTo(el, { duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 300);
    } else {
      // Reset both Lenis and native scroll
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash, lenisRef]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar transparent />
      <Outlet />
      <Footer />
    </div>
  );
}

/**
 * Shared layout wrapper — renders Navbar and Footer once.
 * All pages nested under this layout get them automatically.
 * Pages that need NO navbar/footer (ComingSoon, 404) are routed outside this layout.
 */
export default function Layout() {
  return (
    <SmoothScroll>
      <LayoutContent />
    </SmoothScroll>
  );
}
