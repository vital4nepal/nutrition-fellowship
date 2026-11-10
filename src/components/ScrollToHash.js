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
  // The router gives every entry it did not push the key "default", so a section anchor needs the hash in its slot.
  const slot = `${key}${hash}`;
  const positions = useRef(new Map());
  const current = useRef(slot);

  useEffect(() => {
    current.current = slot;
  }, [slot]);

  useEffect(() => {
    // A page link is saved at the click, the last moment before the shorter page clamps the scroll.
    // Back, Forward and a section anchor are saved at popstate, which still sees the old position.
    // Every click on a section anchor reuses the slot "default#id". A click must land on the section, so it forgets
    // the position saved there; Back and Forward still restore, because popstate saves it again on the way out.
    const onClick = (event) => {
      // A modified click opens a new tab or window, so this page goes nowhere and keeps its saved positions.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a[href]');
      if (!link || link.origin !== window.location.origin) return;
      if (link.pathname !== pathname) positions.current.set(current.current, window.scrollY);
      else if (link.hash) positions.current.delete(`default${link.hash}`);
    };
    const onPopState = () => positions.current.set(current.current, window.scrollY);
    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState, true);
    };
  }, [pathname]);

  useEffect(() => {
    let cancelled = false;
    let frame;
    const afterLayout = (action) => {
      document.fonts.ready.then(() => {
        if (cancelled) return;
        frame = requestAnimationFrame(action);
      });
    };
    if (navigationType === 'POP' && positions.current.has(slot)) {
      afterLayout(() => window.scrollTo(0, positions.current.get(slot)));
    } else if (hash) {
      afterLayout(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [pathname, hash, slot, navigationType]);

  return null;
}
