import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * A deep link such as /#documents lands on its section. The browser jumps before React renders it, so it misses.
 * A link to another page opens that page at its top. Back and Forward return to the position the page was left at,
 * because the browser restores it before the taller page has rendered.
 */
export default function ScrollToHash() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());

  useEffect(() => {
    // A click is the last moment before a link leaves the page. A scroll event comes too late: the shorter page clamps it.
    const remember = () => positions.current.set(key, window.scrollY);
    document.addEventListener('click', remember, true);
    return () => document.removeEventListener('click', remember, true);
  }, [key]);

  useEffect(() => {
    let cancelled = false;
    let frame;
    const afterLayout = (action) => {
      document.fonts.ready.then(() => {
        if (cancelled) return;
        frame = requestAnimationFrame(action);
      });
    };
    if (navigationType === 'POP' && positions.current.has(key)) {
      afterLayout(() => window.scrollTo(0, positions.current.get(key)));
    } else if (hash) {
      afterLayout(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [pathname, hash, key, navigationType]);

  return null;
}
