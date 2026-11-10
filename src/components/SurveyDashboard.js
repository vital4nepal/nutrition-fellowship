import React, { useState } from 'react';
import {
  ALL, challenges, countFor, countries, jobConfidence, profile, respondentsFor, sdgOutlook, skills,
} from '../data/pulseSurvey';
import { container } from './ui';

const views = [{ id: ALL, label: 'All countries' }, ...countries];
const TOP_ROWS = 6;

const percent = (count, total) => Math.round((count / total) * 100);

const confidenceFill = {
  'very-confident': 'bg-chart-pos-strong',
  confident: 'bg-chart-pos',
  neutral: 'bg-chart-neutral',
  worried: 'bg-chart-neg',
  'very-worried': 'bg-chart-neg-strong',
};
const sdgFill = { yes: 'bg-chart-pos-strong', no: 'bg-chart-neg-strong', unsure: 'bg-chart-neutral' };

const chartTitle = 'font-serif text-xl font-semibold text-paper';

/** The six most frequent answers as horizontal bars. Every bar is a share of 100%, so both charts read on one scale. */
function BarChart({ title, rows, view, total }) {
  const ranked = rows
    .map((row) => ({ ...row, count: countFor(row, view) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, TOP_ROWS);
  return (
    <figure>
      <figcaption className={chartTitle}>{title}</figcaption>
      <ul className="mt-5 space-y-4">
        {ranked.map(({ id, label, count }) => {
          const share = percent(count, total);
          return (
            <li key={id} title={`${count} of ${total} students`}>
              <div className="flex items-baseline justify-between gap-4 text-ui">
                <span className="text-paper/90">{label}</span>
                <span className="font-semibold tabular-nums text-paper">{share}%</span>
              </div>
              <div className="mt-1.5 h-2.5 bg-paper/10">
                <div
                  className="h-full rounded-r-[4px] bg-meadow transition-[width] duration-500"
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

/** One bar split into the share of each answer. The legend carries every value, so no segment needs a label to be read. */
function ShareBar({ title, rows, view, total, fills }) {
  const parts = rows.map((row) => ({ ...row, count: countFor(row, view) }));
  return (
    <figure>
      <figcaption className={chartTitle}>{title}</figcaption>
      <div aria-hidden="true" className="mt-5 flex h-6 gap-0.5">
        {parts.map(({ id, count }) => (
          <div
            key={id}
            className={`h-full transition-[flex-grow] duration-500 ${fills[id]}`}
            style={{ flexGrow: count, flexBasis: 0 }}
          />
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-ui">
        {parts.map(({ id, label, count }) => (
          <li key={id} className="flex items-center gap-2" title={`${count} of ${total} students`}>
            <span aria-hidden="true" className={`h-3 w-3 shrink-0 ${fills[id]}`} />
            <span className="text-paper/90">{label}</span>
            <span className="font-semibold tabular-nums text-paper">{percent(count, total)}%</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

function Headline({ share, children }) {
  return (
    <li className="border-t border-paper/25 pt-4">
      <p className="flex items-center gap-4 text-body leading-snug text-paper/90">
        <strong className="font-serif text-[3.25rem] font-semibold leading-none tabular-nums text-paper">{share}%</strong>
        <span className="max-w-[20ch]">{children}</span>
      </p>
    </li>
  );
}

const SurveyDashboard = () => {
  const [view, setView] = useState(ALL);
  const total = respondentsFor(view);
  const count = (rows, id) => countFor(rows.find((row) => row.id === id), view);
  const workShare = percent(count(profile, 'seeking') + count(profile, 'working'), total);
  const confidentShare = percent(count(jobConfidence, 'very-confident') + count(jobConfidence, 'confident'), total);
  const researchShare = percent(count(skills, 'research'), total);

  return (
    <section data-section="dashboard" id="dashboard" className="bg-deep text-paper">
      <div className={`${container} py-14 lg:py-20`}>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <h2 className="max-w-[18ch] text-title-sm text-paper lg:text-display">
            What {total} nutrition students told us
          </h2>
          <div role="group" aria-label="Country" className="flex flex-wrap gap-2">
            {views.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                aria-pressed={id === view}
                onClick={() => setView(id)}
                className="min-h-11 border border-paper/40 px-4 text-ui font-semibold text-paper transition-colors hover:border-paper aria-pressed:border-meadow aria-pressed:bg-meadow aria-pressed:text-deep"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          <Headline share={workShare}>work or look for work while they study</Headline>
          <Headline share={confidentShare}>feel confident about finding a relevant job</Headline>
          <Headline share={researchShare}>want stronger research skills</Headline>
        </ul>

        <div className="mt-12 grid gap-x-16 gap-y-12 lg:grid-cols-2">
          <BarChart title="Skills students want to strengthen" rows={skills} view={view} total={total} />
          <BarChart title="Challenges students name most" rows={challenges} view={view} total={total} />
          <ShareBar
            title="How confident are you about finding a relevant job?"
            rows={jobConfidence}
            view={view}
            total={total}
            fills={confidenceFill}
          />
          <ShareBar
            title="Will your country reach its nutrition SDG targets?"
            rows={sdgOutlook}
            view={view}
            total={total}
            fills={sdgFill}
          />
        </div>

        <p className="mt-12 border-t border-paper/25 pt-4 text-meta text-paper/75">
          Source: Nutrition Student Pulse Survey. A student could choose several skills and name several challenges.
        </p>
      </div>
    </section>
  );
};

export default SurveyDashboard;
