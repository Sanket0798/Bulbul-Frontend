import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Shared layout wrapper — renders Navbar and Footer once.
 * All pages nested under this layout get them automatically.
 * Pages that need NO navbar/footer (ComingSoon, 404) are routed outside this layout.
 */
export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait for the page to render, then scroll to the hash element
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-screen">
      <Navbar transparent />
      <Outlet />
      <Footer />
    </div>
  );
}
