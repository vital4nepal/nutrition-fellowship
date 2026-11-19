import React from 'react';
import { ArrowUpRight, CalendarDays, Clock, MapPin } from 'lucide-react';
import { d4n, email, emailHref } from '../data/site';
import { Section, SectionTitle, SubTitle, textLink } from './ui';

// The session plan from the D4N concept note. `minutes` drives the width of each block on the timeline.
const schedule = [
  { minutes: 15, title: 'South Asian student voice', fill: 'bg-green' },
  { minutes: 25, title: 'From learning to doing', fill: 'bg-meadow' },
  { minutes: 45, title: 'Regional plenary', fill: 'bg-deep' },
  { minutes: 5, title: 'South Asia Call to Action', fill: 'bg-accent' },
];

// The organizers named on the flyer, in its order, with their logos as the flyer shows them.
const partners = [
  { name: 'Ministry of Health and Food Safety, Nepal', src: '/partners/mohfs-nepal.png' },
  { name: 'Bhutan Health Trust Fund', src: '/partners/bhutan-health-trust-fund.png' },
  { name: 'International Food Policy Research Institute (IFPRI)', src: '/partners/ifpri.png' },
  { name: 'IIHS Multiversity', src: '/partners/iihs.png' },
  { name: 'BRAC James P Grant School of Public Health', src: '/partners/brac-jpgsph.png' },
  { name: 'Nutrition Fellowship', src: '/partners/nutrition-fellowship.png' },
];

// The two parts of the Learning Lab, in the owner's words.
const parts = [
  {
    lead: 'Part 1 | What does the nutrition workforce need?',
    text: 'Governments, partners, faculty and students will discuss how to strengthen the nutrition workforce.',
  },
  {
    lead: 'Part 2 | What can partners do together?',
    text: 'Partners will discuss how to strengthen learning including use of technology and through program exposure. The event will build commitment and roadmap to enhance capacity of students to address nutrition policy crisis that region now faces now and beyond 2030.',
  },
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
        <p className="mt-4 max-w-[48ch] font-serif text-sub font-semibold text-ink">{d4n.theme}</p>
        <p className="mt-3 max-w-[60ch] text-body">Delivering for Nutrition Conference 2026 ({d4n.conferenceDates}).</p>

        <div className="mt-4 max-w-[60ch] space-y-4 text-body">
          {parts.map(({ lead, text }) => (
            <p key={lead}>
              <span className="font-semibold text-ink">{lead}</span> {text}
            </p>
          ))}
        </div>

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
        <p className="mt-4 text-meta text-muted">
          For more information, contact us at:{' '}
          <a href={emailHref} className={`font-semibold text-green ${textLink}`}>
            {email}
          </a>
        </p>

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
        {/* One height for every logo, a thin rule between them as on the flyer. */}
        <ul className="mt-4 flex flex-wrap items-center gap-y-5">
          {partners.map(({ name, src }) => (
            <li key={name} className="border-r border-line px-3.5 first:pl-0 last:border-r-0 last:pr-0">
              <img src={src} alt={name} loading="lazy" className="h-11 w-auto object-contain sm:h-14" />
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
