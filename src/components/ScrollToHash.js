import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** A deep link such as /#documents lands on its section. The browser jumps before React renders it, so it misses. */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;
    let cancelled = false;
    let frame;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [pathname, hash]);

  return null;
}
