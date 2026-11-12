import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SWIPE_PX = 50;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const control =
  'absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-paper/40 bg-ink/50 text-paper transition-colors hover:bg-paper hover:text-ink';

/**
 * One large photo, a strip of small ones under it. Arrow keys, the buttons, the strip and a swipe change the photo.
 * Only the photo on show and its two neighbours are in the page, so the next one is ready before it is wanted.
 * A photo shows whole on a dark mat, so a collage or a flyer is never cropped.
 */
function PhotoCarousel({ label, photos }) {
  const [current, setCurrent] = useState(0);
  const strip = useRef(null);
  const swipeStart = useRef(null);
  const total = photos.length;

  const go = (index) => {
    if (total < 2) return;
    const next = (index + total) % total;
    setCurrent(next);
    // Scroll the strip itself. scrollIntoView would also move the page when the strip is below the fold.
    const thumb = strip.current.children[next];
    strip.current.scrollTo({
      left: thumb.offsetLeft - (strip.current.clientWidth - thumb.clientWidth) / 2,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') go(current - 1);
    else if (event.key === 'ArrowRight') go(current + 1);
    else return;
    event.preventDefault();
  };

  const onPointerUp = (event) => {
    if (swipeStart.current === null) return;
    const distance = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(distance) >= SWIPE_PX) go(current + (distance < 0 ? 1 : -1));
  };

  const near = [current - 1, current, current + 1].map((index) => (index + total) % total);

  return (
    <div role="group" aria-roledescription="carousel" aria-label={label}>
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={(event) => {
          if (event.pointerType !== 'mouse') swipeStart.current = event.clientX;
        }}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
        className="relative aspect-[3/2] touch-pan-y touch-pinch-zoom select-none overflow-hidden border border-line bg-ink"
      >
        {[...new Set(near)].map((index) => (
          <img
            key={photos[index].src}
            src={encodeURI(photos[index].src)}
            srcSet={`${encodeURI(photos[index].thumb)} 480w, ${encodeURI(photos[index].src)} 1400w`}
            sizes="(min-width: 1024px) 760px, 100vw"
            alt={index === current ? `${label}, ${index + 1} of ${total}` : ''}
            draggable={false}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {total > 1 && (
          <>
            <button type="button" aria-label="Previous image" onClick={() => go(current - 1)} className={`${control} left-3`}>
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next image" onClick={() => go(current + 1)} className={`${control} right-3`}>
              <ChevronRight size={22} aria-hidden="true" />
            </button>
            <p
              aria-live="polite"
              className="absolute bottom-3 right-3 bg-ink/70 px-2.5 py-1 text-meta tabular-nums text-paper"
            >
              {current + 1} / {total}
            </p>
          </>
        )}
      </div>

      {total > 1 && (
        <ul ref={strip} className="relative mt-3 flex gap-2 overflow-x-auto p-1">
          {photos.map(({ src, thumb }, index) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                aria-label={`Show image ${index + 1}`}
                aria-current={index === current}
                onClick={() => go(index)}
                // A bar marks the current image. The outline is left to keyboard focus.
                className={`block border-b-4 bg-ink transition-opacity ${
                  index === current ? 'border-green' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img loading="lazy" src={thumb} alt="" width={96} height={64} className="h-16 w-24 object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PhotoCarousel;
