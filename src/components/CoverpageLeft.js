import React, { useState, useEffect } from 'react';
import { SectionTitle } from './ui';

const SLIDE_INTERVAL_MS = 5000;

// Slide 0 is the photo band of 5generations.jpeg without its title banner and hashtag strip.
// Phones get a 3:2 crop of each slide, because the wide frame source would be cropped and upscaled there.
const slides = [
  {
    src: '/ImageSlider/5generations-photo.jpg',
    phone: '/ImageSlider/5generations-phone.jpg',
    width: 1600,
    height: 569,
    alt: 'Fellowship members and guests of several generations posing together at an evening meet',
    position: 'object-center',
  },
  {
    src: '/ImageSlider/cover-collage.jpg',
    phone: '/ImageSlider/cover-collage-phone.jpg',
    width: 1060,
    height: 1060,
    alt: 'Students leading the Fellowship. A mosaic of cherished interactions',
    position: 'object-center md:object-[50%_45.5%]',
  },
];

const pillars = ['Celebrate', 'Convene', 'Coach', 'Collaborate', 'Connect'];

const tabs = [
  {
    id: 'value',
    label: 'Value Proposition',
    panel: (
      <div className="space-y-3 text-body text-ink">
        <p className="max-w-[65ch]">
          We unite three generations of stakeholders from Nepal and around the world, combining experience, innovation, and passion to accelerate the fight against undernutrition in Nepal.
        </p>
        <p className="max-w-[65ch]">
          Through this fellowship, we foster meaningful connections, convene diverse perspectives, and promote transformative collaboration.
        </p>
      </div>
    ),
  },
  {
    id: 'vision',
    label: 'Our Vision',
    panel: (
      <div className="space-y-3">
        <p className="max-w-[65ch] font-serif text-sub font-semibold text-green">
          “No Nepali is deprived of right to be free from undernutrition and suffer from ills effect of overnutrition”
        </p>
        <p className="max-w-[65ch] text-body text-muted">
          “Bound by purpose, United for Nutrition: A fellowship to Nourish Generations”
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-ui font-semibold text-green">
          {pillars.map((pillar) => (
            <li key={pillar}>{pillar}</li>
          ))}
        </ul>
      </div>
    ),
  },
];

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CoverpageLeft = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  // The later slides wait for the first one, so they never compete with the first paint.
  const [firstLoaded, setFirstLoaded] = useState(false);

  useEffect(() => {
    if (paused || stopped || prefersReducedMotion()) return undefined;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, stopped]);

  const selectSlide = (index) => {
    setCurrentSlide(index);
    setStopped(true);
  };

  const onTabKeyDown = (event) => {
    const current = tabs.findIndex((tab) => tab.id === activeTab);
    const targets = {
      ArrowLeft: (current + tabs.length - 1) % tabs.length,
      ArrowRight: (current + 1) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    const next = tabs[targets[event.key]].id;
    setActiveTab(next);
    document.getElementById(`about-tab-${next}`).focus();
  };

  return (
    <>
      <SectionTitle as="h1" className="mb-6 lg:mb-8">Nutrition Fellowship for Nepal</SectionTitle>
      <div
        onPointerEnter={(event) => event.pointerType === 'mouse' && setPaused(true)}
        onPointerLeave={(event) => event.pointerType === 'mouse' && setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="relative aspect-[3/2] overflow-hidden md:aspect-[14/5] border border-line bg-surface">
          {slides.map((slide, index) => {
            const active = index === currentSlide;
            const first = index === 0;
            const ready = first || firstLoaded;
            return (
              <picture key={slide.src}>
                <source media="(max-width: 767px)" srcSet={ready ? slide.phone : undefined} />
                <img
                  src={ready ? slide.src : undefined}
                  alt={slide.alt ?? `Slide ${index + 1}`}
                  width={slide.width}
                  height={slide.height}
                  fetchpriority={first ? 'high' : undefined}
                  onLoad={first ? () => setFirstLoaded(true) : undefined}
                  aria-hidden={!active}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${slide.position} ${active ? 'opacity-100' : 'opacity-0'}`}
                />
              </picture>
            );
          })}
        </div>
        <div className="mt-2 flex">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Slide ${index + 1}`}
              aria-current={index === currentSlide || undefined}
              onClick={() => selectSlide(index)}
              className="flex h-11 w-11 items-center"
            >
              <span className={`h-[3px] w-6 transition-colors ${index === currentSlide ? 'bg-accent' : 'bg-line-strong'}`} />
            </button>
          ))}
        </div>
      </div>

      <div id="aboutus" className="mt-4">
        <div role="tablist" aria-label="About Us" onKeyDown={onTabKeyDown} className="flex gap-6 border-b border-line">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`about-tab-${tab.id}`}
              aria-selected={tab.id === activeTab}
              aria-controls={`about-panel-${tab.id}`}
              tabIndex={tab.id === activeTab ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-px h-11 border-b-2 text-base font-semibold transition-colors hover:text-green ${
                tab.id === activeTab ? 'border-accent text-ink' : 'border-transparent text-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="min-h-[140px] pt-4">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              role="tabpanel"
              id={`about-panel-${tab.id}`}
              aria-labelledby={`about-tab-${tab.id}`}
              hidden={tab.id !== activeTab}
            >
              {tab.panel}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CoverpageLeft;
