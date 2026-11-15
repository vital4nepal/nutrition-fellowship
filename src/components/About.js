import React from 'react';
import { SectionTitle } from './ui';

// The figures come from the owner's website updates document.
const facts = [
  { value: '600+', label: 'national and global nutrition stakeholders' },
  { value: '4+', label: 'countries' },
  { value: '2 out of 3', label: 'members are students or emerging professionals' },
  { value: '500+', label: 'students have shared their aspirations, challenges and needs through this platform' },
];

const pillars = ['Celebrate', 'Convene', 'Coach', 'Collaborate', 'Connect'];

/** The About Us block under the hero: vision and value proposition side by side, then the reach. */
const About = () => (
  <div id="aboutus" className="space-y-8 border-t border-line pt-8 lg:space-y-10 lg:pt-10">
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
    <section className="space-y-3">
      <SectionTitle as="h2" size="sidebar">Our Vision</SectionTitle>
      <p className="max-w-[65ch] font-serif text-sub font-semibold text-green">
        “No Nepali is deprived of right to be free from undernutrition and suffer from ills effect of overnutrition”
      </p>
      <p className="max-w-[65ch] text-body text-muted">“Bound by Purpose, United for Nutrition.”</p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-ui font-semibold text-green">
        {pillars.map((pillar) => (
          <li key={pillar}>{pillar}</li>
        ))}
      </ul>
    </section>

    <section className="space-y-3">
      <SectionTitle as="h2" size="sidebar">Value Proposition / What We Do</SectionTitle>
      <p className="max-w-[65ch] text-body text-ink">
        The Network brings together stakeholders to strengthen the skills and competencies of students and young professionals so they can help address the region’s nutrition polycrisis. Students and young professionals work with mentors, learn directly from nutrition programmes, and build their skills in data analysis and interpreting findings.
      </p>
      <p className="max-w-[65ch] text-body text-ink">
        The Fellowship also gives them a platform to participate in policy discussions and use their collective voice to improve policies and programmes and advocate for accountability on nutrition commitments.
      </p>
    </section>
    </div>

    <section className="space-y-3">
      <SectionTitle as="h2" size="sidebar">Our Reach</SectionTitle>
      <p className="max-w-[65ch] text-body text-ink">
        The Fellowship has expanded beyond Nepal, with growing engagement in Pakistan, Bangladesh and Sri Lanka.
      </p>
      <dl className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
        {facts.map(({ value, label }) => (
          <div key={label} className="flex flex-col-reverse justify-end bg-paper p-4">
            <dt className="mt-1 text-meta text-muted">{label}</dt>
            <dd className="font-serif text-title-sm font-semibold tabular-nums text-green">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  </div>
);

export default About;
