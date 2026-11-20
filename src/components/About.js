import { useState } from 'react';
import { Globe, MessageSquareText, UserRound, Users } from 'lucide-react';
import { tickTo, useTicker } from './Ticker';
import { SectionTitle } from './ui';

const ICON_SIZE = 28;

// The figures come from the owner's website updates document.
const facts = [
  { value: '600+', label: 'national and global nutrition stakeholders', icon: <Users size={ICON_SIZE} strokeWidth={1.75} aria-hidden="true" /> },
  { value: '4+', label: 'countries', icon: <Globe size={ICON_SIZE} strokeWidth={1.75} aria-hidden="true" /> },
  {
    value: '2 out of 3',
    label: 'members are students or emerging professionals',
    // Three people, two of them filled: the figure drawn at its real share.
    icon: (
      <span className="flex gap-1.5">
        {[true, true, false].map((filled, index) => (
          <UserRound
            key={index}
            size={ICON_SIZE}
            strokeWidth={1.75}
            className={filled ? 'fill-green text-green' : 'text-line'}
            aria-hidden="true"
          />
        ))}
      </span>
    ),
  },
  {
    value: '500+',
    label: 'students have shared their aspirations, challenges and needs through this platform',
    icon: <MessageSquareText size={ICON_SIZE} strokeWidth={1.75} aria-hidden="true" />,
  },
];

const pillars = ['Celebrate', 'Convene', 'Coach', 'Collaborate', 'Connect'];

const tabs = [
  {
    id: 'vision',
    label: 'Our Vision',
    panel: (
      <div className="space-y-3">
        <p className="max-w-[65ch] font-serif text-sub font-semibold text-green">
          “No child and women is deprived of right to be free from undernutrition and suffer from ills effect of overnutrition”
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
          The Network brings together stakeholders to strengthen the skills and competencies of students and young professionals so they can help address the unfinished issue of under-nutrition as well as emerging nutrition challenges the world is facing. Students and young professionals work with experts, mentors, learn directly from nutrition programs, and build their skills in data analysis, research and evidence generation.
        </p>
        <p className="max-w-[65ch]">
          The Fellowship also gives them a platform to participate in policy discussions using the insights they generate and use their collective voice to improve policies, programs and advocate for actions and accountability on nutrition commitments.
        </p>
      </div>
    ),
  },
];

/** The About Us tabs under the hero, then the reach. The arrow keys, Home and End move between the tabs. */
const About = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [reachRef, progress] = useTicker();

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
        <dl ref={reachRef} className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
          {facts.map(({ value, label, icon }) => {
            // A figure like "500+" counts up from 0. Any other figure, like "2 out of 3", shows as it is.
            const match = /^(\d+)(\+?)$/.exec(value);
            return (
              <div key={label} className="flex flex-col-reverse justify-end bg-paper p-4">
                <dt className="mt-1 text-meta text-muted">{label}</dt>
                <dd className="font-serif text-title-sm font-semibold tabular-nums text-green">
                  <span className="mb-3 flex h-7 items-center">{icon}</span>
                  {match ? (
                    <>
                      <span aria-hidden="true">{tickTo(Number(match[1]), progress)}{match[2]}</span>
                      <span className="sr-only">{value}</span>
                    </>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>
    </div>
  );
};

export default About;
