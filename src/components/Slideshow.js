import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { prefersReducedMotion } from './ui';

// Every slide shows for the same time, counted from the start of its fade in.
export const SLIDE_MS = 3000;
const FADE_MS = 900;
const SWIPE_PX = 50;

const control =
  'flex h-11 w-10 items-center justify-center border border-paper/40 text-paper transition-colors hover:bg-paper hover:text-ink';

/** The handler of a carousel: an arrow key calls `step(-1)` or `step(1)`. */
export const arrowKeys = (step) => (event) => {
  const direction = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
  // Alt or Cmd plus an arrow is the browser's Back and Forward.
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !direction) {
    return;
  }
  step(direction);
  event.preventDefault();
};

/** The pointer handlers of a carousel: a touch or pen swipe calls `step(1)` or `step(-1)`. A mouse drag does not. */
export function useSwipe(step) {
  const swipeStart = useRef(null);
  return {
    onPointerDown: (event) => {
      if (event.pointerType !== 'mouse') {
        swipeStart.current = event.clientX;
      }
    },
    onPointerUp: (event) => {
      if (swipeStart.current === null) {
        return;
      }
      const distance = event.clientX - swipeStart.current;
      swipeStart.current = null;
      if (Math.abs(distance) >= SWIPE_PX) {
        step(distance < 0 ? 1 : -1);
      }
    },
    onPointerCancel: () => {
      swipeStart.current = null;
    },
  };
}

/**
 * The slideshow of the home page: one frame, a caption over a dark gradient at the bottom, the count, Pause,
 * Previous and Next. Every slide shows for 3 seconds and crossfades into the next.
 * `renderSlide(slide, state)` draws one slide. `state` has `layer`, the classes that place and fade it,
 * `visible`, `wanted` (false until the first slide is on screen, so the first one loads first), `playable`
 * (false for a visitor who asked for reduced motion and has not pressed Play) and `settle`, to call once it
 * loaded or failed. Each slide needs a `caption`. `gestures` adds the arrow keys and a swipe.
 */
function Slideshow({ label, slides, renderSlide, gestures = false }) {
  const [current, setCurrent] = useState(0);
  const lastAdvance = useRef(-Infinity);
  // A visitor who asks for reduced motion starts with the slideshow stopped. Play still works for them.
  const [calm] = useState(prefersReducedMotion);
  const [stopped, setStopped] = useState(calm);
  // The slides that loaded or failed, by index: a browser fires `load` again when it swaps to a larger file.
  // The later slides wait for the first one, so it loads first. They then load in the background while it shows.
  const [settled, setSettled] = useState(() => new Set());
  // The clock starts once the first slide is on screen and then never waits on a load or a video event,
  // so every slide gets the same time. A slide that is still loading shows its poster or the dark frame.
  const autoplaying = settled.has(0) && !stopped;

  // One timer, set again only when the slide changes or the slideshow starts or stops.
  useEffect(() => {
    if (!autoplaying) {
      return undefined;
    }
    const timer = setTimeout(() => {
      lastAdvance.current = performance.now();
      setCurrent((index) => (index + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [autoplaying, current, slides.length]);

  // A visitor's own step stops the slideshow. A step during a fade waits, so the fades never pile up.
  const step = (offset) => {
    const now = performance.now();
    if (!calm && now - lastAdvance.current < FADE_MS) {
      return;
    }
    lastAdvance.current = now;
    setCurrent((index) => (index + offset + slides.length) % slides.length);
    setStopped(true);
  };

  const swipe = useSwipe(step);

  const gestureProps = gestures
    ? {
        role: 'group',
        'aria-roledescription': 'carousel',
        'aria-label': label,
        onKeyDown: arrowKeys(step),
        ...swipe,
      }
    : {};

  return (
    <figure
      {...gestureProps}
      className={`relative aspect-[4/3] overflow-hidden border border-line bg-ink sm:aspect-[16/9] ${gestures ? 'touch-pan-y touch-pinch-zoom' : ''}`}
    >
      {slides.map((slide, index) => {
        const visible = index === current;
        // A crossfade: the incoming slide fades in on top while the outgoing one stays whole underneath,
        // then the outgoing one hides once it is covered. The frame never shows through halfway.
        const transition = visible
          ? 'z-10 opacity-100 duration-[900ms] ease-in-out'
          : 'opacity-0 duration-0 delay-[900ms] motion-reduce:delay-0';
        return renderSlide(slide, {
          layer: `absolute inset-0 transition-opacity will-change-[opacity] motion-reduce:transition-none ${transition}`,
          visible,
          wanted: index === 0 || settled.has(0),
          playable: !calm || !stopped,
          settle: () => setSettled((done) => (done.has(index) ? done : new Set(done).add(index))),
        });
      })}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-3/4 bg-gradient-to-t from-ink/90 via-ink/60 to-transparent sm:h-1/2 sm:via-transparent" />
      {/* On a phone the buttons take their own row, so a long caption keeps the full width. */}
      <figcaption className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-2 p-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:p-6">
        {/* The caption is announced only after the visitor takes control, never on each autoplay turn. */}
        <p
          aria-live={stopped ? 'polite' : 'off'}
          className="max-w-[46ch] font-serif text-meta font-semibold leading-snug text-paper sm:text-base lg:text-sub"
        >
          {slides[current].caption}
        </p>
        <div className="flex shrink-0 items-center gap-1.5 self-end">
          <span className="mr-1 hidden text-meta tabular-nums text-paper/80 sm:block">
            {current + 1} / {slides.length}
          </span>
          <button
            type="button"
            aria-label={stopped ? 'Play slideshow' : 'Pause slideshow'}
            onClick={() => setStopped(!stopped)}
            className={control}
          >
            {stopped ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
          </button>
          <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className={control}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next photo" onClick={() => step(1)} className={control}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </figcaption>
    </figure>
  );
}

/**
 * Photos with captions in the home page slideshow. A photo has `src` (1400px), `thumb` (480px), `caption`
 * and an optional `focus` that keeps the faces inside the crop.
 */
export function PhotoSlideshow({ label, photos }) {
  return (
    <Slideshow
      label={label}
      slides={photos}
      gestures
      renderSlide={({ src, thumb, focus }, { layer, wanted, settle }) => (
        <img
          key={src}
          src={wanted ? encodeURI(src) : undefined}
          srcSet={wanted ? `${encodeURI(thumb)} 480w, ${encodeURI(src)} 1400w` : undefined}
          sizes="(min-width: 1024px) 800px, 100vw"
          alt=""
          draggable={false}
          onLoad={settle}
          onError={settle}
          style={{ objectPosition: focus }}
          className={`${layer} h-full w-full select-none object-cover`}
        />
      )}
    />
  );
}

export default Slideshow;
