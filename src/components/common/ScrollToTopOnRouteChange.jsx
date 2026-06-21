import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopOnRouteChange = () => {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);
  const prevHashRef = useRef(hash);

  useEffect(() => {
    const pathnameChanged = prevPathnameRef.current !== pathname;
    const hashChanged = prevHashRef.current !== hash;

    if (pathnameChanged || hashChanged) {
      if (hash) {
        // Wait for DOM to fully render, then scroll to the hash element
        const scrollToHash = () => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        };
        // Use a longer timeout to ensure the new page has rendered
        setTimeout(scrollToHash, 300);
      } else if (pathnameChanged) {
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual';
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
      prevPathnameRef.current = pathname;
      prevHashRef.current = hash;
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTopOnRouteChange;
