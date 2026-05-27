import { useState, useEffect } from 'react';

/**
 * Custom hook to detect mobile viewport
 * @param {number} breakpoint - Width threshold (default: 768)
 * @returns {boolean} Whether viewport is below breakpoint
 */
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
