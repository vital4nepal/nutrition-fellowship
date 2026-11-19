import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { d4n } from '../data/site';
import About from './About';
import CoverpageRight from './CoverpageRight';
import { SectionTitle, container } from './ui';

const PHOTO_INTERVAL_MS = 2000;
const CLIP_INTERVAL_MS = 6000;
const FADE_MS = 500;

// The newest event comes first. A photo has a 1600px file and an 800px file for phones.
// A photo with a `width` has a large file of that width instead of 1600px.
// A `clip` slide is a muted 5 second video (`.webm` and `.mp4`) with a poster of the same name.
// A collage tile has a large file and a `-500` file, 1000px and 500px wide.
// `focus` keeps the faces inside the crop.
// Below 1024px the frame is the screen minus the 2rem page padding, split into thirds.
const BIG_TILE = '(min-width: 1024px) 540px, calc((100vw - 2rem) * 2 / 3)';
const SMALL_TILE = '(min-width: 1024px) 270px, calc((100vw - 2rem) / 3)';
const slides = [
  {
    name: 'vitamin-a',
    caption: 'National Vitamin A Supplementation- Monitoring by Students in Nepal, November 2026',
    // One large tile on the left, three stacked on the right.
    collage: [
      { name: 'vita-2', focus: '55% 45%', area: 'col-span-2 row-span-3', sizes: BIG_TILE },
      { name: 'vita-1', focus: '50% 40%', area: '', sizes: SMALL_TILE },
      { name: 'vita-5', focus: '50% 45%', area: '', sizes: SMALL_TILE },
      { name: 'vita-6', focus: '45% 55%', area: '', sizes: SMALL_TILE },
    ],
  },
  { name: 'strategy-meeting', caption: 'Strategy meeting with JPG-SPH, BRAC University', focus: '50% 25%', width: 1280 },
  { name: 'brac-bangladesh-camp', caption: 'WHA assessment camp in Bangladesh University of Health Sciences', clip: true },
  { name: 'second-meet', caption: 'Second Fellowship meet, January 2025', focus: '50% 40%' },
  { name: 'canva-workshop', caption: 'Canva workshop, February 2025', focus: '50% 50%' },
  {
    name: 'primeasia-bia-training',
    caption: 'Students were trained on Bioelectrical Impedance Analysis (BIA) device to assess overall body composition in Primeasia University',
    portrait: true,
  },
];

// Stagger the four campaign photos when they first load. Keep them ready for later fades.
function Collage({ tiles, wanted, onSettle }) {
  const [loaded, setLoaded] = useState(() => new Set());
  const markLoaded = (index) => setLoaded((done) => (done.has(index) ? done : new Set(done).add(index)));

  return (
    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 bg-ink">
      {tiles.map(({ name, focus, area, sizes }, index) => {
        const done = () => {
          markLoaded(index);
          if (index === 0) onSettle();
        };
        return (
          <img
            key={name}
            src={wanted ? `/hero/${name}.jpg` : undefined}
            srcSet={wanted ? `/hero/${name}-500.jpg 500w, /hero/${name}.jpg 1000w` : undefined}
            sizes={sizes}
            alt=""
            fetchpriority={index === 0 ? 'high' : 'low'}
            onLoad={done}
            onError={done}
            style={{ objectPosition: focus, animationDelay: `${index * 140}ms` }}
            className={`h-full w-full object-cover ${area} ${loaded.has(index) ? 'animate-tile' : 'opacity-0'}`}
          />
        );
      })}
    </div>
  );
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * A muted clip that plays from the start each time its slide shows. Until the clip loads, the poster shows.
 * `playable` is false for a visitor who asked for reduced motion and has not pressed Play: they see the poster.
 * The last source reports an error when the browser plays neither format, so the slideshow never waits for it.
 */
function Clip({ name, visible, wanted, playable, onSettle, className }) {
  const video = useRef(null);
  useEffect(() => {
    const element = video.current;
    if (visible && playable) {
      element.currentTime = 0;
      element.play().catch(() => {});
    } else {
      element.pause();
    }
  }, [visible, playable]);

  return (
    <video
      ref={video}
      muted
      loop
      playsInline
      preload={wanted ? 'auto' : 'none'}
      poster={wanted ? `/hero/${name}.jpg` : undefined}
      onLoadedData={onSettle}
      className={className}
    >
      {wanted && (
        <>
          <source src={`/hero/${name}.webm`} type="video/webm" />
          <source src={`/hero/${name}.mp4`} type="video/mp4" onError={onSettle} />
        </>
      )}
    </video>
  );
}

const control =
  'flex h-11 w-10 items-center justify-center border border-paper/40 text-paper transition-colors hover:bg-paper hover:text-ink';

function Slideshow() {
  const [current, setCurrent] = useState(0);
  const lastAdvance = useRef(-Infinity);
  const [hovered, setHovered] = useState(false);
  // A visitor who asks for reduced motion starts with the slideshow stopped. Play still works for them.
  const [calm] = useState(prefersReducedMotion);
  const [stopped, setStopped] = useState(calm);
  // The photos that loaded or failed, by index: a browser fires `load` again when it swaps to a larger file.
  // The later photos wait for the first one, and autoplay waits for all of them, so no fade lands on an empty frame.
  const [settled, setSettled] = useState(() => new Set());
  const settle = (index) => setSettled((done) => (done.has(index) ? done : new Set(done).add(index)));
  const autoplaying = settled.size === slides.length && !hovered && !stopped;

  useEffect(() => {
    if (!autoplaying) return undefined;
    const delay = slides[current].clip ? CLIP_INTERVAL_MS : PHOTO_INTERVAL_MS;
    const timer = setTimeout(() => {
      lastAdvance.current = performance.now();
      setCurrent((index) => (index + 1) % slides.length);
    }, delay);
    return () => clearTimeout(timer);
  }, [autoplaying, current]);

  const step = (offset) => {
    const now = performance.now();
    if (!calm && now - lastAdvance.current < FADE_MS) return;
    lastAdvance.current = now;
    setCurrent((index) => (index + offset + slides.length) % slides.length);
    setStopped(true);
  };

  return (
    <figure
      className="relative aspect-[4/3] overflow-hidden border border-line bg-ink sm:aspect-[16/9]"
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setHovered(false)}
    >
      {slides.map(({ name, collage, clip, portrait, width = 1600 }, index) => {
        const first = index === 0;
        const wanted = first || settled.has(0);
        // Keep the outgoing slide opaque underneath the incoming slide until the fade ends.
        const transition = index === current
          ? 'z-10 opacity-100 duration-500 ease-in-out'
          : 'opacity-0 duration-0 delay-500 motion-reduce:delay-0';
        const layer = `absolute inset-0 transition-opacity motion-reduce:transition-none ${transition}`;
        if (clip) {
          return (
            <Clip
              key={name}
              name={name}
              visible={index === current}
              wanted={wanted}
              playable={!calm || !stopped}
              onSettle={() => settle(index)}
              className={`${layer} h-full w-full object-cover`}
            />
          );
        }
        if (collage) {
          return (
            <div
              key={name}
              className={layer}
            >
              <Collage tiles={collage} wanted={wanted} onSettle={() => settle(index)} />
            </div>
          );
        }
        return (
          <img
            key={name}
            src={wanted ? `/hero/${name}.jpg` : undefined}
            srcSet={wanted && !portrait ? `/hero/${name}-800.jpg 800w, /hero/${name}.jpg ${width}w` : undefined}
            sizes="(min-width: 1024px) 800px, 100vw"
            alt=""
            onLoad={() => settle(index)}
            onError={() => settle(index)}
            style={{ objectPosition: slides[index].focus }}
            className={`${layer} h-full w-full ${portrait ? 'bg-ink object-contain' : 'object-cover'}`}
          />
        );
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

const cardLink =
  'inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 transition-colors hover:underline';

const Hero = () => (
  <section data-section="hero" className={`${container} pb-12 pt-6 lg:pb-16 lg:pt-8`}>
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-8">
        <SectionTitle as="h1" className="mb-6 animate-rise lg:mb-8">Nutrition Fellowship</SectionTitle>
        <div className="animate-rise [animation-delay:120ms]">
          <Slideshow />
        </div>
        <About />
      </div>
      <div className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:border-l lg:border-line lg:pl-8 [&>*]:animate-rise [&>*:nth-child(2)]:[animation-delay:200ms] [&>*:nth-child(3)]:[animation-delay:320ms] [&>*:nth-child(1)]:[animation-delay:80ms]">
        <article className="flex flex-col border border-line bg-surface p-6">
          <h2 className="text-sub text-green">Student Pulse Survey</h2>
          <p className="mt-3 text-body">Voice and Appeals of nutrition students in South Asia</p>
          <a href="/#dashboard" className={`${cardLink} pt-2 text-green`}>
            See the results
            <ArrowDown size={18} aria-hidden="true" />
          </a>
          <p className="mt-auto pt-2 text-body">Pulse survey to understand aspirations, challenges and needs.</p>
        </article>
        <article className="flex flex-col bg-deep p-6 text-paper [&_:focus-visible]:outline-paper">
          <h2 className="text-sub">D4N 2026 Learning Lab</h2>
          <p className="mt-3 text-body text-paper/90">{d4n.theme}</p>
          <p className="mt-2 text-body text-paper/90">
            {d4n.labDate}, {d4n.labTime}. Hybrid, at the {d4n.venue}.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-4">
            <a
              href={d4n.registerHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 bg-accent px-6 font-semibold text-paper transition-colors hover:bg-paper hover:text-deep"
            >
              Register
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href="/#d4n" className={cardLink}>
              Details
              <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
        </article>
        <div id="highlights" className="mt-4 sm:col-span-2 lg:col-span-1">
          <CoverpageRight />
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
