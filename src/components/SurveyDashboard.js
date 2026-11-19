import React from 'react';
import { Clock, GraduationCap, Languages, Microscope, Wallet } from 'lucide-react';
import { ALL, countFor, respondentsFor, skills, themes } from '../data/pulseSurvey';
import Pie from './Pie';
import { tickTo, useTicker } from './Ticker';
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
  skills: { rule: 'border-t-green', text: 'text-green', bar: 'bg-green' },
  challenges: { rule: 'border-t-accent', text: 'text-accent', tile: 'border-chart-neg bg-chart-neg/25' },
  policy: { rule: 'border-t-deep', text: 'text-deep', wedge: 'fill-deep' },
  career: { rule: 'border-t-accent', text: 'text-accent', wedge: 'fill-accent', pieSize: 104, stacked: true },
};


// The owner's figure for every student the platform has heard from, the same "500+" as Our Reach on the About page.
// The skill shares below come from the pulse survey alone, so they are shares of its respondents.
const VOICES = 500;

/**
 * The students heard, then the four most wanted skills and their shares of the survey respondents.
 * Every figure and bar counts up together the first time the card is on screen. A screen reader reads the final figures only.
 */
const SkillStats = ({ hue }) => {
  const [ref, progress] = useTicker();
  return (
    <div ref={ref} className="flex flex-1 flex-col">
      <p className="border-b border-line pb-4">
        <span className={`block font-serif text-[3rem] font-semibold leading-none tabular-nums ${hue.text}`} aria-hidden="true">
          {tickTo(VOICES, progress)}+
        </span>
        <span className="sr-only">{VOICES}+</span>
        <span className="mt-2 block text-ui text-ink">students have shared their aspirations, challenges and needs</span>
      </p>
      <ul className="mt-4 grid flex-1 grid-cols-2 content-evenly gap-x-4 gap-y-4">
        {topSkills.map(({ id, label, count, share }) => (
          <li key={id} className="flex flex-col">
            <span className={`font-serif text-[2rem] font-semibold leading-none tabular-nums ${hue.text}`} aria-hidden="true">
              {tickTo(share, progress)}%
            </span>
            <span className="sr-only">{share}% want {label}, {count} of {total} survey respondents</span>
            <span className="mt-1.5 text-ui font-semibold text-ink" aria-hidden="true">{label}</span>
            <span className="mt-2 h-1.5 bg-line" aria-hidden="true">
              <span className={`block h-full ${hue.bar}`} style={{ width: `${share * progress}%` }} />
            </span>
            <span className="mt-1.5 text-meta tabular-nums text-muted" aria-hidden="true">
              {tickTo(count, progress)} of {total}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-meta text-muted">Of {total} survey respondents, who could pick more than one.</p>
    </div>
  );
};

/** Text with **bold** words: the odd parts of the split are the marked words. */
const Marked = ({ text }) =>
  text.split('**').map((part, index) =>
    index % 2 ? <strong key={part} className="font-semibold">{part}</strong> : part,
  );

// One icon for each challenge, in the order of `items` in the data file.
const challengeIcons = [GraduationCap, Clock, Microscope, Languages, Wallet];

// The challenges and stats spread down their card, so a card beside a taller one has no empty space at the bottom.
// A `stacked` card puts its pies above their text, for a card with few stats and room to spare.
const ChallengeList = ({ items, note, hue }) => (
  <>
    <ul className="flex flex-1 flex-col justify-between gap-3">
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
    <p className="mt-4 border-t border-line pt-4 text-ui text-ink">{note}</p>
  </>
);

const StatList = ({ stats, hue }) => (
  <ul className="flex flex-1 flex-col justify-around gap-5">
    {stats.map(({ id, value, share, text }) => (
      <li key={id} className={hue.stacked ? 'flex flex-col items-start gap-3' : 'flex items-center gap-4'}>
        {Array.isArray(share) && <Pie share={share} hue={hue} size={hue.pieSize} />}
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
      In the South Asia Pulse Survey, we asked nutrition students what they want to learn, what skills they want to build, what holds them back and how they see their future.
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
