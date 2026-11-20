import { useLayoutEffect, useRef, useState } from 'react';

const TICK_MS = 1400;
const THRESHOLD = 0.35;

/** Fast at first, then slowing into the final value. */
const easeOut = (t) => 1 - (1 - t) ** 3;

const wantsStill = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * The progress of a count-up, from 0 to 1, that starts the first time the element with `ref` is on screen.
 * Every figure inside the element reads the same progress, so they tick together and land together.
 * Without IntersectionObserver, with reduced motion or when printing, the progress is 1 and the final figures show.
 */
export function useTicker(duration = TICK_MS) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(1);

  // A layout effect sets the start before the first paint, so a figure never flashes its final value and then drops to 0.
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window) || wantsStill()) return undefined;
    setProgress(0);
    let frame;
    const finish = () => {
      cancelAnimationFrame(frame);
      setProgress(1);
    };
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        setProgress(easeOut(t));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: THRESHOLD });
    observer.observe(node);
    window.addEventListener('beforeprint', finish);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('beforeprint', finish);
    };
  }, [duration]);

  return [ref, progress];
}

/** `value` at `progress` of the way up from 0, as a whole number. */
export const tickTo = (value, progress) => Math.round(value * progress);
