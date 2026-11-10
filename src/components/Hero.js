import React, { useEffect, useState } from 'react';
import { ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { ALL, countries, respondentsFor } from '../data/pulseSurvey';
import { container } from './ui';

const SLIDE_INTERVAL_MS = 6000;

// Every photo is 1600px wide and fills the frame. `focus` keeps the faces inside the crop on a phone.
const slides = [
  { src: '/hero/second-meet.jpg', caption: 'The second Nutrition Fellowship meet, January 2025', focus: '50% 40%' },
  { src: '/hero/data-camp-cafodat.jpg', caption: 'Nutrition Data Camp at CAFODAT College, January 2025', focus: '55% 60%' },
  { src: '/hero/canva-workshop.jpg', caption: 'Canva workshop for students of different colleges, February 2025', focus: '50% 50%' },
  { src: '/hero/data-camp-mmihs.jpg', caption: 'Nutrition Data Camp at MMIHS, January 2025', focus: '50% 50%' },
  { src: '/hero/strategic-planning.jpg', caption: 'Strategic planning for the Fellowship meet, December 2024', focus: '50% 55%' },
];

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const arrowButton =
  'flex h-11 w-11 items-center justify-center border border-paper/40 text-paper transition-colors hover:bg-paper hover:text-ink';

function Slideshow() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  // The later photos wait for the first one, so they never compete with the first paint.
  const [firstLoaded, setFirstLoaded] = useState(false);

  useEffect(() => {
    if (paused || stopped || prefersReducedMotion()) return undefined;
    const timer = setInterval(() => setCurrent((index) => (index + 1) % slides.length), SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, stopped]);

  const step = (offset) => {
    setCurrent((index) => (index + offset + slides.length) % slides.length);
    setStopped(true);
  };

  return (
    <figure
      className="relative aspect-[4/3] overflow-hidden bg-ink sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[30rem]"
      onPointerEnter={(event) => event.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, index) => {
        const first = index === 0;
        return (
          <img
            key={slide.src}
            src={first || firstLoaded ? slide.src : undefined}
            alt=""
            fetchpriority={first ? 'high' : undefined}
            onLoad={first ? () => setFirstLoaded(true) : undefined}
            style={{ objectPosition: slide.focus }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        );
      })}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6">
        <p aria-live="polite" className="max-w-[32ch] font-serif text-base font-semibold leading-snug text-paper sm:text-sub">
          {slides[current].caption}
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-meta tabular-nums text-paper/80 sm:block">
            {current + 1} / {slides.length}
          </span>
          <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className={arrowButton}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next photo" onClick={() => step(1)} className={arrowButton}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </figcaption>
    </figure>
  );
}

const countryList = `${countries.slice(0, -1).map((country) => country.label).join(', ')} and ${countries.at(-1).label}`;
const cardLink =
  'inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 transition-colors hover:underline';

const Hero = () => (
  <section data-section="hero" className={`${container} pb-12 pt-8 lg:pb-16 lg:pt-12`}>
    <h1 className="text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.05] tracking-[-0.02em] text-green">
      Nutrition Fellowship
    </h1>
    <div className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <Slideshow />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
        <article className="flex flex-col border border-line bg-surface p-6">
          <h2 className="text-sub text-green">Student Pulse Survey</h2>
          <p className="mt-3 text-body">
            <strong className="font-serif text-[2.75rem] font-semibold leading-none text-ink">
              {respondentsFor(ALL)}
            </strong>{' '}
            students in {countryList} told us what they need to grow as nutrition professionals.
          </p>
          <a href="/#dashboard" className={`${cardLink} mt-auto pt-4 text-green`}>
            See the results
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </article>
        <article className="flex flex-col bg-deep p-6 text-paper">
          <h2 className="text-sub">D4N Cohort</h2>
          <p className="mt-3 text-body text-paper/90">
            A student session at the Delivering for Nutrition Conference in Colombo, Sri Lanka, 2 to 4 December 2026.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-4">
            {/* No registration link exists yet, so the button is disabled instead of pointing nowhere. */}
            <button
              type="button"
              disabled
              className="inline-flex min-h-11 cursor-not-allowed items-center bg-accent px-6 font-semibold text-paper"
            >
              Register
            </button>
            <a href="/#d4n" className={cardLink}>
              Schedule
              <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
);

export default Hero;
