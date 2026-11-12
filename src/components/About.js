import React, { useState } from 'react';
import { ALL, countries, respondentsFor } from '../data/pulseSurvey';

// The member figure is from the D4N concept note. The other figures come from the survey data.
const facts = [
  { value: '400+', label: 'members and stakeholders in Nepal' },
  { value: String(respondentsFor(ALL)), label: 'students answered the Pulse Survey' },
  { value: String(countries.length), label: 'countries in the student network' },
  { value: '3', label: 'generations of nutrition leaders' },
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
];

/** The About Us tabs under the slideshow. The arrow keys, Home and End move between the tabs. */
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
      <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
        {facts.map(({ value, label }) => (
          <div key={label} className="flex flex-col-reverse bg-paper p-4">
            <dt className="mt-1 text-meta text-muted">{label}</dt>
            <dd className="font-serif text-title-sm font-semibold tabular-nums text-green">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default About;
