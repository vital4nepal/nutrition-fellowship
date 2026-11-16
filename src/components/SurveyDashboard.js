import React from 'react';
import { Clock, HeartPulse, Languages, Microscope, Wallet } from 'lucide-react';
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

const RING_SIZE = 76;
const RING_STROKE = 7;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/** A share as a percent of a ring. `share` is a percent, or `[filled, total]`. The label sits in the middle. */
const Ring = ({ share, label }) => {
  const percentOfRing = typeof share === 'number' ? share : (share[0] / share[1]) * 100;
  return (
    <div className="relative shrink-0" style={{ width: RING_SIZE, height: RING_SIZE }}>
      <svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} aria-hidden="true" className="-rotate-90">
        <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_RADIUS} fill="none" strokeWidth={RING_STROKE} className="stroke-line/60" />
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          strokeWidth={RING_STROKE}
          strokeDasharray={`${(percentOfRing / 100) * RING_LENGTH} ${RING_LENGTH}`}
          className="stroke-green"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-serif text-ui font-semibold tabular-nums text-green">
        {label}
      </span>
    </div>
  );
};

/** The four most wanted skills, each as a ring with its share of all students inside. */
const SkillRings = () => (
  <ul className="grid grid-cols-2 gap-x-3 gap-y-5">
    {topSkills.map(({ id, label, count, share }) => (
      <li key={id} title={`${count} of ${total} students`} className="flex flex-col items-center gap-2 text-center">
        <Ring share={share} label={`${share}%`} />
        <span className="text-meta font-semibold text-ink">{label}</span>
      </li>
    ))}
  </ul>
);

/** Text with **bold** words: the odd parts of the split are the marked words. */
const Marked = ({ text }) =>
  text.split('**').map((part, index) =>
    index % 2 ? <strong key={part} className="font-semibold">{part}</strong> : part,
  );

// One icon for each challenge, in the order of `items` in the data file.
const challengeIcons = [Clock, Microscope, Languages, Wallet];

const ChallengeList = ({ items, note }) => (
  <>
    <ul className="space-y-3">
      {items.map((item, index) => {
        const Icon = challengeIcons[index];
        return (
          <li key={item} className="flex items-center gap-3 text-ui text-ink">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-paper text-green">
              <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span>
              <Marked text={item} />
            </span>
          </li>
        );
      })}
    </ul>
    <p className="mt-4 flex items-start gap-3 border-l-2 border-accent bg-paper px-3 py-3 text-ui font-semibold text-ink">
      <HeartPulse size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
      {note}
    </p>
  </>
);

// The figure sits in the ring, so a long figure gets a short form there. The full figure leads the sentence.
const ringLabels = { 'job-confidence': '53%', 'job-status': '4/10' };

const StatList = ({ stats }) => (
  <ul className="space-y-5">
    {stats.map(({ id, value, share, text }) => (
      <li key={id} className="flex items-center gap-4">
        <Ring share={share} label={ringLabels[id] ?? value} />
        <p className="text-ui text-ink">
          <strong className="font-semibold">{value}</strong> {text}
        </p>
      </li>
    ))}
  </ul>
);

const ThemeBody = ({ theme }) => {
  if (theme.kind === 'bars') return <SkillRings />;
  if (theme.kind === 'list') return <ChallengeList items={theme.items} note={theme.note} />;
  return <StatList stats={theme.stats} />;
};

const SurveyDashboard = () => (
  <Section name="dashboard" id="dashboard">
    <SectionTitle>South Asian Student’s Aspirations and Challenges</SectionTitle>
    <p className="mt-3 max-w-[60ch] text-body">
      In the South Asia Pulse Survey, we asked nutrition students what they want to learn, what skills they want to build, what holds them back and how they see their future.{' '}
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
