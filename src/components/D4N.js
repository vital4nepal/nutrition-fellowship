import React from 'react';
import { Section, SectionTitle, SubTitle } from './ui';

// The session plan from the D4N concept note. `minutes` drives the width of each block on the timeline.
const schedule = [
  {
    minutes: 15,
    title: 'South Asian student voice',
    detail: 'Students present the key findings of the multi-country Pulse Survey.',
    fill: 'bg-green',
  },
  {
    minutes: 25,
    title: 'From learning to doing',
    detail: 'Student teams from Nepal, Bangladesh and Sri Lanka show their own analyses of real nutrition data.',
    fill: 'bg-meadow',
  },
  {
    minutes: 45,
    title: 'Regional plenary',
    detail: 'Leaders from government, academia, research and donors discuss how to support the next generation.',
    fill: 'bg-deep',
  },
  {
    minutes: 5,
    title: 'South Asia Call to Action',
    detail: 'The session closes with a call to action shaped by the survey and the discussion.',
    fill: 'bg-accent',
  },
];

const starts = schedule.map((_, index) => schedule.slice(0, index).reduce((sum, part) => sum + part.minutes, 0));

const presentations = [
  { country: 'Nepal', topic: 'WHA target assessment and what it means for stunting and anemia control' },
  { country: 'Bangladesh', topic: 'Breastfeeding trends, inequalities and program implications' },
  { country: 'Sri Lanka', topic: 'Regional review of iodine deficiency and salt iodization' },
];

const D4N = () => (
  <Section name="d4n" id="d4n">
    <SectionTitle>D4N Cohort</SectionTitle>
    <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <SubTitle>Building a fit-for-purpose nutrition workforce in South Asia</SubTitle>
        <p className="mt-3 max-w-[60ch] text-body">
          A 90-minute special event at the Delivering for Nutrition (D4N) Conference in Colombo, Sri Lanka, 2 to 4 December 2026. Students bring their survey findings and their own analyses to government, academia and donors.
        </p>
        <ul className="mt-6 border-t border-line">
          {presentations.map(({ country, topic }) => (
            <li key={country} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-3 text-ui">
              <span className="font-semibold text-green">{country}</span>
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-7">
        <SubTitle>Schedule</SubTitle>
        <div aria-hidden="true" className="mt-4 flex h-3 gap-0.5">
          {schedule.map(({ title, minutes, fill }) => (
            <div key={title} className={fill} style={{ flexGrow: minutes, flexBasis: 0 }} />
          ))}
        </div>
        <ol className="mt-2">
          {schedule.map(({ title, detail, minutes, fill }, index) => (
            <li key={title} className="grid grid-cols-[7.75rem_1fr] gap-4 border-b border-line py-4">
              <span className="flex items-baseline gap-2 whitespace-nowrap text-ui tabular-nums text-muted">
                <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 ${fill}`} />
                {starts[index]} to {starts[index] + minutes} min
              </span>
              <span>
                <span className="block text-lg font-semibold text-ink">{title}</span>
                <span className="mt-1 block text-ui text-muted">{detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </Section>
);

export default D4N;
