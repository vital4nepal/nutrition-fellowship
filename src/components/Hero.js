import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { ALL, countries, respondentsFor } from '../data/pulseSurvey';
import About from './About';
import CoverpageRight from './CoverpageRight';
import { SectionTitle, container } from './ui';

const SLIDE_INTERVAL_MS = 6000;

// Each photo has a 1600px file and an 800px file for phones. `focus` keeps the faces inside the crop.
// The newest event comes first.
const slides = [
  {
    name: 'vitamin-a',
    caption: 'Vitamin A and deworming campaign, November 2026',
    // One large tile on the left, three stacked on the right. `focus` keeps the faces inside each crop.
    collage: [
      { src: '/hero/vita-2.jpg', focus: '55% 45%', area: 'col-span-2 row-span-3' },
      { src: '/hero/vita-1.jpg', focus: '50% 40%', area: '' },
      { src: '/hero/vita-3.jpg', focus: '50% 60%', area: '' },
      { src: '/hero/vita-4.jpg', focus: '50% 35%', area: '' },
    ],
  },
  { name: 'second-meet', caption: 'Second Fellowship meet, January 2025', focus: '50% 40%' },
  { name: 'data-camp-cafodat', caption: 'Data Camp at CAFODAT College, January 2025', focus: '55% 60%' },
  { name: 'canva-workshop', caption: 'Canva workshop, February 2025', focus: '50% 50%' },
  { name: 'data-camp-mmihs', caption: 'Data Camp at MMIHS, January 2025', focus: '50% 50%' },
];

/**
 * The four campaign photos of one slide. Each time the slide shows, the tiles settle in one after another.
 * `round` changes only when the slide comes back, so the tiles replay on entry and stay put while it fades out.
 */
function Collage({ tiles, showing, wanted, onSettle }) {
  const [round, setRound] = useState(0);
  const wasShowing = useRef(showing);
  useEffect(() => {
    if (showing && !wasShowing.current) setRound((count) => count + 1);
    wasShowing.current = showing;
  }, [showing]);

  return (
    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 bg-ink">
      {tiles.map(({ src, focus, area }, index) => (
        <img
          key={`${src}-${round}`}
          src={wanted ? src : undefined}
          alt=""
          fetchpriority={index === 0 ? 'high' : undefined}
          onLoad={index === 0 ? onSettle : undefined}
          onError={index === 0 ? onSettle : undefined}
          style={{ objectPosition: focus, animationDelay: `${index * 140}ms` }}
          className={`h-full w-full animate-tile object-cover ${area}`}
        />
      ))}
    </div>
  );
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const control =
  'flex h-11 w-10 items-center justify-center border border-paper/40 text-paper transition-colors hover:bg-paper hover:text-ink';

function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  // A visitor who asks for reduced motion starts with the slideshow stopped. Play still works for them.
  const [stopped, setStopped] = useState(prefersReducedMotion);
  // The photos that loaded or failed, by index: a browser fires `load` again when it swaps to a larger file.
  // The later photos wait for the first one, and autoplay waits for all of them, so no fade lands on an empty frame.
  const [settled, setSettled] = useState(() => new Set());
  const settle = (index) => setSettled((done) => (done.has(index) ? done : new Set(done).add(index)));
  const autoplaying = settled.size === slides.length && !hovered && !stopped;

  useEffect(() => {
    if (!autoplaying) return undefined;
    const timer = setInterval(() => setCurrent((index) => (index + 1) % slides.length), SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [autoplaying]);

  const step = (offset) => {
    setCurrent((index) => (index + offset + slides.length) % slides.length);
    setStopped(true);
  };

  return (
    <figure
      className="relative aspect-[4/3] overflow-hidden border border-line bg-ink sm:aspect-[16/9]"
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setHovered(false)}
    >
      {slides.map(({ name, collage }, index) => {
        const first = index === 0;
        const wanted = first || settled.has(0);
        if (collage) {
          return (
            <div
              key={name}
              className={`transition-opacity duration-700 ${index === current ? 'opacity-100' : 'opacity-0'}`}
            >
              <Collage tiles={collage} showing={index === current} wanted={wanted} onSettle={() => settle(index)} />
            </div>
          );
        }
        return (
          <img
            key={name}
            src={wanted ? `/hero/${name}.jpg` : undefined}
            srcSet={wanted ? `/hero/${name}-800.jpg 800w, /hero/${name}.jpg 1600w` : undefined}
            sizes="(min-width: 1024px) 800px, 100vw"
            alt=""
            fetchpriority={first ? 'high' : undefined}
            onLoad={() => settle(index)}
            onError={() => settle(index)}
            style={{ objectPosition: slides[index].focus }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        );
      })}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6">
        {/* The caption is announced only after the visitor takes control, never on each autoplay turn. */}
        <p
          aria-live={stopped ? 'polite' : 'off'}
          className="max-w-[32ch] font-serif text-base font-semibold leading-snug text-paper sm:text-sub"
        >
          {slides[current].caption}
        </p>
        <div className="flex shrink-0 items-center gap-1.5">
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

const lastCountry = countries[countries.length - 1].label;
const countryList = `${countries.slice(0, -1).map((country) => country.label).join(', ')} and ${lastCountry}`;
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
          <p className="mt-3 text-body">
            <strong className="font-semibold text-ink">{respondentsFor(ALL)} students</strong> in {countryList} answered.
          </p>
          <a href="/#dashboard" className={`${cardLink} mt-auto pt-4 text-green`}>
            See the results
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </article>
        <article className="flex flex-col bg-deep p-6 text-paper">
          <h2 className="text-sub">D4N Cohort</h2>
          <p className="mt-3 text-body text-paper/90">
            Delivering for Nutrition Conference, Colombo, 2 to 4 December 2026.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-4">
            {/* No registration link exists yet, so the button is disabled instead of pointing nowhere. */}
            <button
              type="button"
              disabled
              className="inline-flex min-h-11 cursor-not-allowed items-center bg-accent px-6 font-semibold text-paper opacity-70"
            >
              Register
            </button>
            <a href="/#d4n" className={cardLink}>
              Schedule
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
