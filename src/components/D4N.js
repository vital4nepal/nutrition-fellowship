import React from 'react';
import { ArrowUpRight, CalendarDays, Clock, MapPin } from 'lucide-react';
import { d4n } from '../data/site';
import { Section, SectionTitle, SubTitle } from './ui';

// The session plan from the D4N concept note. `minutes` drives the width of each block on the timeline.
const schedule = [
  { minutes: 15, title: 'South Asian student voice', fill: 'bg-green' },
  { minutes: 25, title: 'From learning to doing', fill: 'bg-meadow' },
  { minutes: 45, title: 'Regional plenary', fill: 'bg-deep' },
  { minutes: 5, title: 'South Asia Call to Action', fill: 'bg-accent' },
];

// The organizers named on the flyer, in its order.
const partners = [
  'Ministry of Health and Food Safety, Nepal',
  'Bhutan Health Trust Fund',
  'International Food Policy Research Institute (IFPRI)',
  'IIHS Multiversity',
  'BRAC James P Grant School of Public Health',
  'Nutrition Fellowship',
];

const facts = [
  { icon: CalendarDays, text: d4n.labDate },
  { icon: Clock, text: d4n.labTime },
  { icon: MapPin, text: `Hybrid, ${d4n.venue}` },
];

const D4N = () => (
  <Section name="d4n" id="d4n">
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <SectionTitle>D4N 2026 Learning Lab</SectionTitle>
        <p className="mt-4 max-w-[48ch] font-serif text-sub font-semibold text-ink">
          What does your generation need to address evolving nutrition challenges?
        </p>
        <p className="mt-3 max-w-[60ch] text-body">
          A session on a workforce fit to deliver for nutrition in South Asia, at {d4n.conference} (
          {d4n.conferenceDates}). Students bring insights from the regional Pulse Survey and discuss skills, practical
          learning and careers.
        </p>

        <ul className="mt-6 space-y-2 text-body">
          {facts.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <Icon size={20} aria-hidden="true" className="shrink-0 text-green" />
              {text}
            </li>
          ))}
        </ul>

        <a
          href={d4n.registerHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-11 items-center gap-2 bg-accent px-6 font-semibold text-paper transition-colors hover:bg-deep"
        >
          Register
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>

        <SubTitle className="mt-12">Session plan</SubTitle>
        <div aria-hidden="true" className="mt-4 flex h-2 gap-0.5">
          {schedule.map(({ title, minutes, fill }) => (
            <div key={title} className={fill} style={{ flexGrow: minutes, flexBasis: 0 }} />
          ))}
        </div>
        <ol className="nf-stagger mt-1">
          {schedule.map(({ title, minutes, fill }) => (
            <li key={title} className="flex items-center gap-3 border-b border-line py-3 text-body">
              <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 ${fill}`} />
              <span className="font-semibold text-ink">{title}</span>
              <span className="ml-auto whitespace-nowrap text-meta tabular-nums text-muted">{minutes} min</span>
            </li>
          ))}
        </ol>

        <SubTitle className="mt-12">Organized with</SubTitle>
        <ul className="mt-3 flex flex-wrap gap-2 text-meta">
          {partners.map((partner) => (
            <li key={partner} className="border border-line px-3 py-1.5 text-ink">
              {partner}
            </li>
          ))}
        </ul>
      </div>

      <figure className="lg:col-span-5">
        <a href="/d4n-2026-learning-lab.jpg" target="_blank" rel="noopener noreferrer" className="group block">
          <img
            src="/d4n-2026-learning-lab.jpg"
            alt={`D4N 2026 Learning Lab flyer: ${d4n.labDate}, ${d4n.labTime}, ${d4n.venue}.`}
            width={800}
            height={1000}
            loading="lazy"
            className="w-full border border-line transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </a>
        <figcaption className="mt-2 text-meta text-muted">The event flyer. Select it to open the full size.</figcaption>
      </figure>
    </div>
  </Section>
);

export default D4N;
