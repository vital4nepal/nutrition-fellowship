import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { chapterPages } from '../data/chapterPages';
import { ALL, countFor, countries, respondentsFor, skills } from '../data/pulseSurvey';
import { chapters } from '../data/site';
import { CountryMap, RegionMap } from './ChapterMaps';
import { SITE_TITLE } from './ComingSoon';
import NotFound from './NotFound';
import Pie from './Pie';
import { SectionTitle, SiteLink, SubTitle, textLink } from './ui';

const TOP_SKILLS = 4;
const total = respondentsFor(ALL);
const biggestCountry = Math.max(...countries.map(({ respondents }) => respondents));
const percent = (count, whole) => Math.round((count / whole) * 100);
const names = Object.fromEntries(chapters.map(({ id, label }) => [id, label]));
const pieHue = { wedge: 'fill-green', rest: 'fill-meadow' };

const panel = 'border border-line bg-surface p-5';
const backLink = `inline-flex min-h-11 items-center gap-2 font-semibold text-green ${textLink}`;

/** One bar with its label and figure. `strong` is the dark bar and the others are light. */
const BarRow = ({ label, figure, width, strong, title }) => (
  <li title={title}>
    <div className="flex items-baseline justify-between gap-3 text-ui">
      <span className={strong ? 'font-semibold text-ink' : 'text-muted'}>{label}</span>
      <span className="font-semibold tabular-nums text-ink">{figure}</span>
    </div>
    <div className="mt-1 h-2 bg-line/60">
      <div className={`h-full ${strong ? 'bg-green' : 'bg-chart-pos'}`} style={{ width: `${width}%` }} />
    </div>
  </li>
);

/** /chapters/:id. A map with pins, the Pulse Survey figures of the country and a map of all four chapters. */
function ChapterPage({ id }) {
  const label = names[id];
  const { status, pins } = chapterPages[id];
  const { respondents } = countries.find((country) => country.id === id);
  const share = percent(respondents, total);

  const countrySkills = skills
    .map((row) => ({ ...row, count: countFor(row, id), share: percent(countFor(row, id), respondents) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, TOP_SKILLS);

  return (
    <article>
      <SiteLink href="/#country-chapter" className={backLink}>
        <ArrowLeft size={18} aria-hidden="true" />
        All chapters
      </SiteLink>
      <SectionTitle as="h1" className="mt-4">{label} Chapter</SectionTitle>
      <p className="mt-3 max-w-[60ch] text-body">{status}</p>

      <div className={`${panel} mt-8 grid gap-8 lg:grid-cols-2 lg:p-6`}>
        <CountryMap id={id} label={label} />
        <div>
          <SubTitle as="h2" tone="text-green">Where the Fellowship works</SubTitle>
          <ol className="mt-4 space-y-5">
            {pins.map(({ city, lines, link }, index) => (
              <li key={city} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent font-semibold text-paper" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sub text-ink">{city}</h3>
                  {lines.map((line) => (
                    <p key={line} className="mt-1 text-body">{line}</p>
                  ))}
                  {link && (
                    <SiteLink href={link.href} className={`mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-green ${textLink}`}>
                      {link.label}
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </SiteLink>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <SubTitle as="h2" tone="text-green" className="mb-4 mt-12">Students in {label} who answered the Pulse Survey</SubTitle>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className={`${panel} flex items-center gap-5`}>
          <Pie share={share} hue={pieHue} />
          <p>
            <span className="block font-serif text-display font-semibold tabular-nums text-green">{respondents}</span>
            <span className="block text-ui font-semibold text-ink">students answered, {share}% of all {total}</span>
          </p>
        </div>
        <div className={panel}>
          <h3 className="mb-4 text-sub text-ink">Answers by country</h3>
          <ul className="space-y-3">
            {countries.map((country) => (
              <BarRow
                key={country.id}
                label={country.label}
                figure={country.respondents}
                width={percent(country.respondents, biggestCountry)}
                strong={country.id === id}
              />
            ))}
          </ul>
        </div>
        <div className={`${panel} md:col-span-2 lg:col-span-1`}>
          <h3 className="mb-4 text-sub text-ink">Skills students here want to build</h3>
          <ul className="space-y-3">
            {countrySkills.map(({ id: skillId, label: skillLabel, count, share: skillShare }, index) => (
              <BarRow
                key={skillId}
                label={skillLabel}
                figure={`${skillShare}%`}
                width={skillShare}
                strong={index === 0}
                title={`${count} of ${respondents} students`}
              />
            ))}
          </ul>
        </div>
      </div>

      <SubTitle as="h2" tone="text-green" className="mb-4 mt-12">The four chapter countries</SubTitle>
      <div className={`${panel} lg:p-6`}>
        <div className="mx-auto max-w-xl">
          <RegionMap
            currentId={id}
            names={names}
            labels={Object.fromEntries(countries.map((country) => [country.id, `${country.label} ${country.respondents}`]))}
          />
        </div>
        <p className="mt-3 text-center text-meta text-muted">
          The number beside each pin is how many students answered the Pulse Survey. Select a country to open its page.
        </p>
      </div>
    </article>
  );
}

/** The route element: it checks the id, sets the page title and shows the chapter. */
export default function ChapterRoute() {
  const { id } = useParams();
  const known = id in chapterPages;
  useEffect(() => {
    if (!known) return undefined;
    document.title = `${names[id]} Chapter | ${SITE_TITLE}`;
    return () => {
      document.title = SITE_TITLE;
    };
  }, [id, known]);

  return known ? <ChapterPage id={id} /> : <NotFound />;
}
