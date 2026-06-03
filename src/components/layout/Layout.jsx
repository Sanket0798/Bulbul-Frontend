import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Shared layout wrapper — renders Navbar and Footer once.
 * All pages nested under this layout get them automatically.
 * Pages that need NO navbar/footer (ComingSoon, 404) are routed outside this layout.
 */
export default function Layout() {
  return (
    <div className="min-h-screen">
      <Navbar transparent />
      <Outlet />
      <Footer />
    </div>
  );
}
