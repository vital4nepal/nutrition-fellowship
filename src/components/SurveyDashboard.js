import React from 'react';
import { Clock, GraduationCap, Languages, Microscope, Wallet } from 'lucide-react';
import { ALL, countFor, respondentsFor, skills, themes } from '../data/pulseSurvey';
import Pie from './Pie';
import { Section, SectionTitle, SubTitle } from './ui';

const TOP_ROWS = 4;
const total = respondentsFor(ALL);

const percent = (count, totalCount) => Math.round((count / totalCount) * 100);

/** The most frequent skills. Equal counts keep the order of the data file. */
const topSkills = skills
  .map((row) => ({ ...row, count: countFor(row, ALL), share: percent(countFor(row, ALL), total) }))
  .sort((a, b) => b.count - a.count)
  .slice(0, TOP_ROWS);

const card = 'flex flex-col border border-t-2 border-line bg-surface p-5';

// One hue for each card: greens for what students want and know, orange for what holds them back.
const hues = {
  skills: { rule: 'border-t-green', text: 'text-green' },
  challenges: { rule: 'border-t-accent', text: 'text-accent', tile: 'border-chart-neg bg-chart-neg/25' },
  policy: { rule: 'border-t-deep', text: 'text-deep', wedge: 'fill-deep' },
  career: { rule: 'border-t-accent', text: 'text-accent', wedge: 'fill-accent' },
};


/** The four most wanted skills and their shares of all students. */
const SkillStats = ({ hue }) => (
  <>
    <ul className="grid flex-1 grid-cols-2 content-evenly gap-x-3 gap-y-8">
      {topSkills.map(({ id, label, count, share }) => (
        <li key={id} title={`${count} of ${total} students`} className="flex flex-col items-center text-center">
          <span className={`font-serif text-[2.5rem] font-semibold leading-none tabular-nums ${hue.text}`}>{share}%</span>
          <span className="mt-2 text-ui font-semibold text-ink">{label}</span>
        </li>
      ))}
    </ul>
    <p className="mt-6 text-meta text-muted">Share of all {total} students</p>
  </>
);

/** Text with **bold** words: the odd parts of the split are the marked words. */
const Marked = ({ text }) =>
  text.split('**').map((part, index) =>
    index % 2 ? <strong key={part} className="font-semibold">{part}</strong> : part,
  );

// One icon for each challenge, in the order of `items` in the data file.
const challengeIcons = [GraduationCap, Clock, Microscope, Languages, Wallet];

const ChallengeList = ({ items, note, hue }) => (
  <>
    <ul className="space-y-3">
      {items.map((item, index) => {
        const Icon = challengeIcons[index];
        return (
          <li key={item} className="flex items-center gap-3 text-ui text-ink">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center border ${hue.tile} ${hue.text}`}>
              <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span>
              <Marked text={item} />
            </span>
          </li>
        );
      })}
    </ul>
    <p className="mt-4 text-ui text-ink">{note}</p>
  </>
);

const StatList = ({ stats, hue }) => (
  <ul className="space-y-5">
    {stats.map(({ id, value, share, text }) => (
      <li key={id} className="flex items-center gap-4">
        {Array.isArray(share) && <Pie share={share} hue={hue} />}
        <p className="text-ui text-ink">
          <strong className={`font-semibold ${hue.text}`}>{value}</strong> {text}
        </p>
      </li>
    ))}
  </ul>
);

const ThemeBody = ({ theme, hue }) => {
  if (theme.kind === 'bars') return <SkillStats hue={hue} />;
  if (theme.kind === 'list') return <ChallengeList items={theme.items} note={theme.note} hue={hue} />;
  return <StatList stats={theme.stats} hue={hue} />;
};

const SurveyDashboard = () => (
  <Section name="dashboard" id="dashboard">
    <SectionTitle>South Asian Student’s Aspirations and Challenges</SectionTitle>
    <p className="mt-3 max-w-[60ch] text-body">
      In the South Asia Pulse Survey, we asked nutrition students what they want to learn, what skills they want to build, what holds them back and how they see their future.{' '}
      <strong className="font-semibold text-ink">{total} students answered.</strong>
    </p>
    <div className="nf-stagger mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {themes.map((theme) => {
        const hue = hues[theme.id];
        return (
          <article key={theme.id} className={`${card} ${hue.rule}`}>
            <SubTitle as="h3" tone={hue.text} className="mb-5 xl:min-h-[3.6rem]">{theme.title}</SubTitle>
            <ThemeBody theme={theme} hue={hue} />
          </article>
        );
      })}
    </div>
  </Section>
);

export default SurveyDashboard;
