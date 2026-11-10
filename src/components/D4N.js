import React from 'react';
import { Section, SectionTitle } from './ui';

// The session plan from the D4N concept note. `minutes` drives the width of each block on the timeline.
const schedule = [
  { minutes: 15, title: 'South Asian student voice', fill: 'bg-green' },
  { minutes: 25, title: 'From learning to doing', fill: 'bg-meadow' },
  { minutes: 45, title: 'Regional plenary', fill: 'bg-deep' },
  { minutes: 5, title: 'South Asia Call to Action', fill: 'bg-accent' },
];

const D4N = () => (
  <Section name="d4n" id="d4n">
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <SectionTitle>D4N Schedule</SectionTitle>
        <p className="mt-4 max-w-[45ch] text-body">
          Students present at the Delivering for Nutrition Conference in Colombo, Sri Lanka, 2 to 4 December 2026.
        </p>
      </div>
      <div className="lg:col-span-7">
        <div aria-hidden="true" className="flex h-2 gap-0.5">
          {schedule.map(({ title, minutes, fill }) => (
            <div key={title} className={fill} style={{ flexGrow: minutes, flexBasis: 0 }} />
          ))}
        </div>
        <ol className="mt-1">
          {schedule.map(({ title, minutes, fill }) => (
            <li key={title} className="flex items-center gap-3 border-b border-line py-3 text-body">
              <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 ${fill}`} />
              <span className="font-semibold text-ink">{title}</span>
              <span className="ml-auto whitespace-nowrap text-meta tabular-nums text-muted">{minutes} min</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </Section>
);

export default D4N;
