import React from 'react';
import { ALL, countFor, respondentsFor, skills, themes } from '../data/pulseSurvey';
import { Section, SectionTitle, SubTitle } from './ui';

const TOP_ROWS = 4;
const total = respondentsFor(ALL);

const percent = (count, totalCount) => Math.round((count / totalCount) * 100);

/** The most frequent skills. Every bar is a share of all students, and equal counts keep the order of the data file. */
const topSkills = skills
  .map((row) => ({ ...row, count: countFor(row, ALL), share: percent(countFor(row, ALL), total) }))
  .sort((a, b) => b.count - a.count)
  .slice(0, TOP_ROWS);

const card = 'flex flex-col border border-line bg-surface p-5';

/** One finding: a large figure, then the sentence that says what it counts. */
const Stat = ({ value, children }) => (
  <p>
    <span className="block font-serif text-display font-semibold tabular-nums text-green">{value}</span>
    <span className="mt-1 block text-ui font-semibold text-ink">{children}</span>
  </p>
);

const SkillBars = () => (
  <>
    <Stat value={`${topSkills[0].share}%`}>want training in {topSkills[0].label.toLowerCase()}</Stat>
    <ul className="mt-5 space-y-3">
      {topSkills.map(({ id, label, count, share }, index) => (
        <li key={id} title={`${count} of ${total} students`}>
          <div className="flex items-baseline justify-between gap-3 text-meta">
            <span className={index === 0 ? 'font-semibold text-ink' : 'text-muted'}>{label}</span>
            <span className="font-semibold tabular-nums text-ink">{share}%</span>
          </div>
          <div className="mt-1 h-1.5 bg-line/60">
            <div
              className={`h-full transition-[width] duration-500 ${index === 0 ? 'bg-green' : 'bg-chart-pos'}`}
              style={{ width: `${share}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  </>
);

const ChallengeList = ({ items, note }) => (
  <>
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <li key={item} className="py-3 text-ui text-ink">{item}</li>
      ))}
    </ul>
    <p className="mt-4 text-ui font-semibold text-ink">{note}</p>
  </>
);

const StatList = ({ stats }) => (
  <ul className="space-y-5">
    {stats.map(({ id, value, text }) => (
      <li key={id}>
        <Stat value={value}>{text}</Stat>
      </li>
    ))}
  </ul>
);

const ThemeBody = ({ theme }) => {
  if (theme.kind === 'bars') return <SkillBars />;
  if (theme.kind === 'list') return <ChallengeList items={theme.items} note={theme.note} />;
  return <StatList stats={theme.stats} />;
};

const SurveyDashboard = () => (
  <Section name="dashboard" id="dashboard">
    <SectionTitle>What challenges students face</SectionTitle>
    <p className="mt-3 max-w-[60ch] text-body">
      In the South Asia Pulse Survey, we asked nutrition students what they want to learn, what holds them back and how they see their future.{' '}
      <strong className="font-semibold text-ink">{total} students answered.</strong>
    </p>
    <div className="nf-stagger mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {themes.map((theme) => (
        <article key={theme.id} className={card}>
          <SubTitle as="h3" tone="text-green" className="mb-5 xl:min-h-[3.6rem]">{theme.title}</SubTitle>
          <ThemeBody theme={theme} />
        </article>
      ))}
    </div>
    <p className="mt-4 text-meta text-muted">
      Students could pick more than one skill, so the shares in the skills card do not add up to 100%.
    </p>
  </Section>
);

export default SurveyDashboard;
