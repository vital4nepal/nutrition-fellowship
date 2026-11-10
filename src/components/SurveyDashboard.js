import React, { useState } from 'react';
import {
  ALL, challenges, countFor, countries, jobConfidence, respondentsFor, sdgOutlook, skills,
} from '../data/pulseSurvey';
import { Section, SectionTitle } from './ui';

const views = [{ id: ALL, label: 'All' }, ...countries];
const TOP_ROWS = 4;

const percent = (count, total) => Math.round((count / total) * 100);

const confidenceFill = {
  'very-confident': 'bg-chart-pos-strong',
  confident: 'bg-chart-pos',
  neutral: 'bg-chart-neutral',
  worried: 'bg-chart-neg',
  'very-worried': 'bg-chart-neg-strong',
};
const sdgFill = { yes: 'bg-chart-pos-strong', no: 'bg-chart-neg-strong', unsure: 'bg-chart-neutral' };

const card = 'border border-line bg-surface p-5';
const cardTitle = 'font-sans text-ui font-semibold text-ink';

/** The most frequent answers as thin bars. Every bar is a share of 100%, so the cards read on one scale. */
function BarCard({ title, rows, view, total }) {
  const ranked = rows
    .map((row) => ({ ...row, count: countFor(row, view) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, TOP_ROWS);
  return (
    <figure className={card}>
      <figcaption className={cardTitle}>{title}</figcaption>
      <ul className="mt-4 space-y-3">
        {ranked.map(({ id, label, count }) => {
          const share = percent(count, total);
          return (
            <li key={id} title={`${count} of ${total} students`}>
              <div className="flex items-baseline justify-between gap-3 text-meta">
                <span className="text-muted">{label}</span>
                <span className="font-semibold tabular-nums text-ink">{share}%</span>
              </div>
              <div className="mt-1 h-1.5 bg-line/60">
                <div
                  className="h-full rounded-r-[4px] bg-green transition-[width] duration-500"
                  style={{ width: `${share}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}

/** One bar split into the share of each answer. The legend carries every value. */
function ShareCard({ title, rows, view, total, fills }) {
  const parts = rows.map((row) => ({ ...row, count: countFor(row, view) }));
  return (
    <figure className={card}>
      <figcaption className={cardTitle}>{title}</figcaption>
      <div aria-hidden="true" className="mt-4 flex h-3 gap-0.5">
        {parts.map(({ id, count }) => (
          <div
            key={id}
            className={`h-full transition-[flex-grow] duration-500 ${fills[id]}`}
            style={{ flexGrow: count, flexBasis: 0 }}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-1.5 text-meta">
        {parts.map(({ id, label, count }) => (
          <li key={id} className="flex items-center gap-2" title={`${count} of ${total} students`}>
            <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 ${fills[id]}`} />
            <span className="text-muted">{label}</span>
            <span className="ml-auto font-semibold tabular-nums text-ink">{percent(count, total)}%</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

const SurveyDashboard = () => {
  const [view, setView] = useState(ALL);
  const total = respondentsFor(view);

  return (
    <Section name="dashboard" id="dashboard">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SectionTitle>Student Pulse Survey</SectionTitle>
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
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BarCard title="Skills they want" rows={skills} view={view} total={total} />
        <BarCard title="Top challenges" rows={challenges} view={view} total={total} />
        <ShareCard title="Confident of a relevant job" rows={jobConfidence} view={view} total={total} fills={confidenceFill} />
        <ShareCard title="Country will reach SDG targets" rows={sdgOutlook} view={view} total={total} fills={sdgFill} />
      </div>
    </Section>
  );
};

export default SurveyDashboard;
