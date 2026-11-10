import React, { useState } from 'react';
import {
  ALL, challenges, countFor, countries, jobConfidence, respondentsFor, sdgOutlook, skills,
} from '../data/pulseSurvey';
import { Section, SectionTitle } from './ui';

const views = [{ id: ALL, label: 'All' }, ...countries];
const TOP_ROWS = 4;

const percent = (count, total) => Math.round((count / total) * 100);

/** Whole percentages that add up to exactly 100: the leftover points go to the largest remainders. */
function sharesOf(counts) {
  const total = counts.reduce((sum, count) => sum + count, 0);
  const exact = counts.map((count) => (count / total) * 100);
  const shares = exact.map(Math.floor);
  const leftover = 100 - shares.reduce((sum, share) => sum + share, 0);
  exact
    .map((value, index) => ({ index, remainder: value - Math.floor(value) }))
    .sort((a, b) => b.remainder - a.remainder)
    .slice(0, leftover)
    .forEach(({ index }) => { shares[index] += 1; });
  return shares;
}

const confidenceFill = {
  'very-confident': 'bg-chart-pos-strong',
  confident: 'bg-chart-pos',
  neutral: 'bg-chart-neutral',
  worried: 'bg-chart-neg',
  'very-worried': 'bg-chart-neg-strong',
};
const sdgFill = { yes: 'bg-chart-pos-strong', no: 'bg-chart-neg-strong', unsure: 'bg-chart-neutral' };

const card = 'flex flex-col border border-line bg-surface p-5';

/** The finding of a card: one large share, then the sentence that says what it counts. Two lines of room keep the charts level. */
const Finding = ({ share, children }) => (
  <figcaption className="sm:min-h-[6.25rem]">
    <span className="block font-serif text-display font-semibold tabular-nums text-green">{share}%</span>
    <span className="mt-1 block text-ui font-semibold text-ink">{children}</span>
  </figcaption>
);

/**
 * The most frequent answers as thin bars, the top one stated as the finding. Every bar is a share of 100%,
 * so the cards read on one scale. Answers with the same count keep the order of the data file.
 */
function BarCard({ finding, rows, view, total }) {
  const ranked = rows
    .map((row) => ({ ...row, count: countFor(row, view), share: percent(countFor(row, view), total) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, TOP_ROWS);
  return (
    <figure className={card}>
      <Finding share={ranked[0].share}>{finding(ranked[0].label.toLowerCase())}</Finding>
      <ul className="mt-5 space-y-3">
        {ranked.map(({ id, label, count, share }, index) => (
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
    </figure>
  );
}

/** One bar split into the share of each answer. The finding adds up the answers in `lead`. */
function ShareCard({ finding, lead, rows, view, total, fills }) {
  const counts = rows.map((row) => countFor(row, view));
  const shares = sharesOf(counts);
  const parts = rows.map((row, index) => ({ ...row, count: counts[index], share: shares[index] }));
  const leadShare = parts.filter(({ id }) => lead.includes(id)).reduce((sum, { share }) => sum + share, 0);
  return (
    <figure className={card}>
      <Finding share={leadShare}>{finding}</Finding>
      <div aria-hidden="true" className="mt-5 flex h-3 gap-0.5">
        {parts.map(({ id, count }) => (
          <div
            key={id}
            className={`h-full transition-[flex-grow] duration-500 ${fills[id]}`}
            style={{ flexGrow: count, flexBasis: 0 }}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-1.5 text-meta">
        {parts.map(({ id, label, count, share }) => (
          <li key={id} className="flex items-center gap-2" title={`${count} of ${total} students`}>
            <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 ${fills[id]}`} />
            <span className="text-muted">{label}</span>
            <span className="ml-auto font-semibold tabular-nums text-ink">{share}%</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

const SurveyDashboard = () => {
  const [view, setView] = useState(ALL);
  const total = respondentsFor(view);
  const where = view === ALL ? '' : ` in ${countries.find((country) => country.id === view).label}`;

  return (
    <Section name="dashboard" id="dashboard">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
        <div>
          <SectionTitle>Student Pulse Survey</SectionTitle>
          <p className="mt-3 max-w-[60ch] text-body">
            We asked nutrition students what they want to learn, what holds them back and how they see their future.{' '}
            <strong className="font-semibold text-ink">
              {total} students{where} answered.
            </strong>
          </p>
        </div>
        <div role="group" aria-label="Country" className="flex flex-wrap gap-1.5">
          {views.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={id === view}
              onClick={() => setView(id)}
              className="min-h-11 border border-line px-3 text-meta font-semibold text-ink transition-colors hover:border-green aria-pressed:border-green aria-pressed:bg-green aria-pressed:text-paper"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="nf-stagger mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <BarCard finding={(skill) => `want training in ${skill}`} rows={skills} view={view} total={total} />
        <BarCard finding={(problem) => `name ${problem} as a challenge`} rows={challenges} view={view} total={total} />
        <ShareCard
          finding="feel confident of a job in nutrition"
          lead={['very-confident', 'confident']}
          rows={jobConfidence}
          view={view}
          total={total}
          fills={confidenceFill}
        />
        <ShareCard
          finding="expect their country to meet the nutrition SDG target"
          lead={['yes']}
          rows={sdgOutlook}
          view={view}
          total={total}
          fills={sdgFill}
        />
      </div>
      <p className="mt-4 text-meta text-muted">
        Students could pick more than one skill and challenge, so those shares do not add up to 100%.
      </p>
    </Section>
  );
};

export default SurveyDashboard;
