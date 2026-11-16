import React, { useState } from 'react';
import { SectionTitle } from './ui';

// The figures come from the owner's website updates document.
const facts = [
  { value: '600+', label: 'national and global nutrition stakeholders' },
  { value: '4+', label: 'countries' },
  { value: '2 out of 3', label: 'members are students or emerging professionals' },
  { value: '500+', label: 'students have shared their aspirations, challenges and needs through this platform' },
];

const pillars = ['Celebrate', 'Convene', 'Coach', 'Collaborate', 'Connect'];

const tabs = [
  {
    id: 'vision',
    label: 'Our Vision',
    panel: (
      <div className="space-y-3">
        <p className="max-w-[65ch] font-serif text-sub font-semibold text-green">
          “No Nepali is deprived of right to be free from undernutrition and suffer from ills effect of overnutrition”
        </p>
        <p className="max-w-[65ch] text-body text-muted">“Bound by Purpose, United for Nutrition.”</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-ui font-semibold text-green">
          {pillars.map((pillar) => (
            <li key={pillar}>{pillar}</li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: 'value',
    label: 'Value Proposition',
    panel: (
      <div className="space-y-3 text-body text-ink">
        <p className="max-w-[65ch]">
          The Network brings together stakeholders to strengthen the skills and competencies of students and young professionals so they can help address the region’s nutrition polycrisis. Students and young professionals work with mentors, learn directly from nutrition programmes, and build their skills in data analysis and interpreting findings.
        </p>
        <p className="max-w-[65ch]">
          The Fellowship also gives them a platform to participate in policy discussions and use their collective voice to improve policies and programmes and advocate for accountability on nutrition commitments.
        </p>
      </div>
    ),
  },
];

/** The About Us tabs under the hero, then the reach. The arrow keys, Home and End move between the tabs. */
const About = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

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
    <div id="aboutus" className="mt-6">
      <div role="tablist" aria-label="About Us" onKeyDown={onTabKeyDown} className="flex flex-wrap gap-x-6 border-b border-line">
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

      <section className="mt-8 space-y-3">
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
};

export default About;
