import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { SLIDE_MS, arrowKeys, useSwipe } from './Slideshow';
import { prefersReducedMotion } from './ui';

const button =
    'absolute z-20 flex h-11 w-11 items-center justify-center border border-paper/40 ' +
    'bg-ink/50 text-paper transition-colors hover:bg-paper hover:text-ink';
const control = `${button} top-1/2 -translate-y-1/2`;

/**
 * One large photo, a strip of small ones under it.
 * The photos change every 3 seconds until the visitor pauses them or picks a photo;
 * a visitor who asked for reduced motion starts paused.
 * Arrow keys, the buttons, the strip and a swipe change the photo.
 * Only the photo on show, its two neighbours and the one fading out are in the page.
 * A photo shows whole on a dark mat, so a collage or a flyer is never cropped.
 * A photo with a `caption` shows it under the large photo.
 * The caption line is kept when one photo has none, so the strip does not jump.
 */
function PhotoCarousel({ label, photos }) {
    const [current, setCurrent] = useState(0);
    // The photo that was on show before, kept whole under the new one until the fade covers it.
    const [previous, setPrevious] = useState(0);
    const [stopped, setStopped] = useState(prefersReducedMotion);
    const strip = useRef(null);
    const total = photos.length;
    const hasCaptions = photos.some((photo) => photo.caption);

    const show = (index) => {
        if (total < 2) {
            return;
        }
        const next = (index + total) % total;
        setPrevious(current);
        setCurrent(next);
        // Scroll the strip itself.
        // scrollIntoView would also move the page when the strip is below the fold.
        const thumb = strip.current.children[next];
        strip.current.scrollTo({
            left: thumb.offsetLeft - (strip.current.clientWidth - thumb.clientWidth) / 2,
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        });
    };

    // A visitor's own pick stops the slideshow, as on the home page.
    const go = (index) => {
        setStopped(true);
        show(index);
    };

    // One timer, set again only when the photo changes or the slideshow starts or stops.
    useEffect(() => {
        if (stopped || total < 2) {
            return undefined;
        }
        const timer = setTimeout(() => show(current + 1), SLIDE_MS);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current, stopped, total]);

    const move = (direction) => go(current + direction);
    const swipe = useSwipe(move);

    const near = [previous, current - 1, current, current + 1].map(
        (index) => (index + total) % total
    );

    return (
        // The arrow keys work while focus is on a button or a thumbnail.
        // The photo itself is not a tab stop.
        <div
            role="group"
            aria-roledescription="carousel"
            aria-label={label}
            onKeyDown={arrowKeys(move)}
        >
            <div
                {...swipe}
                className={
                    'relative aspect-[3/2] touch-pan-y touch-pinch-zoom select-none ' +
                    'overflow-hidden border border-line bg-ink'
                }
            >
                {[...new Set(near)].map((index) => (
                    <img
                        key={photos[index].src}
                        src={encodeURI(photos[index].src)}
                        srcSet={photos[index].srcSet}
                        sizes={
                            '(min-width: 1280px) 780px, (min-width: 1024px) 62vw, ' +
                            'calc(100vw - 32px)'
                        }
                        alt={index === current ? `${label}, ${index + 1} of ${total}` : ''}
                        // The first photo is the largest paint of a folder page,
                        // so it loads ahead of the strip.
                        fetchpriority={index === 0 ? 'high' : undefined}
                        draggable={false}
                        // The crossfade of the home page: the new photo fades in on top,
                        // the old one hides once it is covered.
                        className={
                            'absolute inset-0 h-full w-full object-contain transition-opacity ' +
                            'will-change-[opacity] motion-reduce:transition-none ' +
                            (index === current
                                ? 'z-10 opacity-100 duration-[900ms] ease-in-out'
                                : 'opacity-0 duration-0 delay-[900ms] motion-reduce:delay-0')
                        }
                    />
                ))}
                {total > 1 && (
                    <>
                        <button
                            type="button"
                            aria-label="Previous image"
                            onClick={() => move(-1)}
                            className={`${control} left-3`}
                        >
                            <ChevronLeft size={22} aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            aria-label="Next image"
                            onClick={() => move(1)}
                            className={`${control} right-3`}
                        >
                            <ChevronRight size={22} aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            aria-label={stopped ? 'Play slideshow' : 'Pause slideshow'}
                            onClick={() => setStopped(!stopped)}
                            className={`${button} bottom-3 left-3`}
                        >
                            {stopped ? (
                                <Play size={18} aria-hidden="true" />
                            ) : (
                                <Pause size={18} aria-hidden="true" />
                            )}
                        </button>
                        {/*
                         * The count and the caption are announced only after the visitor
                         * takes control, never on each autoplay turn.
                         */}
                        <p
                            aria-live={stopped ? 'polite' : 'off'}
                            className={
                                'absolute bottom-3 right-3 z-20 bg-ink/70 px-2.5 py-1 ' +
                                'text-meta tabular-nums text-paper'
                            }
                        >
                            {current + 1} / {total}
                        </p>
                    </>
                )}
            </div>

            {hasCaptions && (
                <p
                    key={current}
                    aria-live={stopped ? 'polite' : 'off'}
                    className={
                        'mt-2 min-h-[2.625rem] animate-[nf-rise_900ms_ease-in-out_both] ' +
                        'text-meta text-muted sm:min-h-[1.3125rem]'
                    }
                >
                    {photos[current].caption}
                </p>
            )}

            {total > 1 && (
                <ul ref={strip} className="relative mt-3 flex gap-2 overflow-x-auto p-1">
                    {photos.map(({ src, strip: stripSrc }, index) => (
                        <li key={src} className="shrink-0">
                            <button
                                type="button"
                                aria-label={`Show image ${index + 1}`}
                                aria-current={index === current}
                                onClick={() => go(index)}
                                // A bar marks the current image.
                                // The outline is left to keyboard focus.
                                className={
                                    'block border-b-4 bg-ink transition-opacity ' +
                                    (index === current
                                        ? 'border-green'
                                        : 'border-transparent opacity-60 hover:opacity-100')
                                }
                            >
                                <img
                                    loading="lazy"
                                    src={stripSrc}
                                    alt=""
                                    width={96}
                                    height={64}
                                    className="h-16 w-24 object-cover"
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PhotoCarousel;
