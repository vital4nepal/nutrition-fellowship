import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { chapterPages } from '../data/chapterPages';
import { chapters } from '../data/site';
import { CountryMap } from './ChapterMaps';
import { SITE_TITLE } from './ComingSoon';
import NotFound from './NotFound';
import { SectionTitle, SiteLink, SubTitle, textLink } from './ui';

const names = Object.fromEntries(chapters.map(({ id, label }) => [id, label]));

const panel = 'border border-line bg-surface p-5';
const backLink = `inline-flex min-h-11 items-center gap-2 font-semibold text-green ${textLink}`;

/** /chapters/:id. A map of the country with numbered pins, and a list of what each pin stands for. */
function ChapterPage({ id }) {
  const label = names[id];
  const { status, pins } = chapterPages[id];

  return (
    <article>
      <SiteLink href="/" className={backLink}>
        <ArrowLeft size={18} aria-hidden="true" />
        Home
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
