import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Database, Flag, Gauge, Map as MapIcon, PenLine, Presentation, Table2, Target } from 'lucide-react';
import { initiatives } from '../data/initiatives';
import ComingSoon, { SITE_TITLE } from './ComingSoon';
import { resources } from '../data/resources';
import { DocumentList } from './ContentPage';
import PhotoCarousel from './PhotoCarousel';
import NotFound from './NotFound';
import { SectionTitle } from './ui';

// One icon for each goal and each step, in the order of `goals` and `steps` in the data file.
const goalIcons = [Database, Gauge, Flag, Target, PenLine];
const stepIcons = [MapIcon, Table2, BookOpen, Presentation];

// The square tinted tile of the survey Challenges card: orange for what students learn, green for the steps.
const tile = 'flex h-10 w-10 shrink-0 items-center justify-center border';
const learnTile = `${tile} border-chart-neg bg-chart-neg/25 text-accent`;
const stepTile = `${tile} border-chart-pos bg-chart-pos/20 text-green`;

const Icon = ({ icon: Glyph }) => (Glyph ? <Glyph size={20} strokeWidth={1.75} aria-hidden="true" /> : null);

/** A section title on this page, one size down from the page title, the same as the Documents title. */
const PartTitle = ({ id, children }) => (
  <SectionTitle as="h2" size="sidebar" className="lg:text-title-sm">
    <span id={id}>{children}</span>
  </SectionTitle>
);

/** /initiatives/:id. An initiative with no `page` yet shows "Coming soon". An unknown id shows the 404 page. */
export function InitiativePage() {
  const { id } = useParams();
  const initiative = initiatives.find((item) => item.id === id);

  useEffect(() => {
    if (!initiative?.page) return undefined;
    document.title = `${initiative.title} | ${SITE_TITLE}`;
    return () => {
      document.title = SITE_TITLE;
    };
  }, [initiative]);

  if (!initiative) return <NotFound />;
  if (!initiative.page) return <ComingSoon title={initiative.title} />;

  const { subtitle, intro, photos, goals, steps, resourceId } = initiative.page;
  const resource = resources.find((item) => item.id === resourceId);
  return (
    <article className="text-ui">
      <SectionTitle as="h1" className="max-w-[20ch] !leading-[1.1] lg:text-[3rem]">{initiative.title}</SectionTitle>
      <p className="mt-3 max-w-[60ch] text-body font-medium text-muted">{subtitle}</p>
      <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink">{intro}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {photos.map(({ src, caption }) => (
          <figure key={src}>
            <img
              src={src}
              srcSet={`${src.replace('.jpg', '-800.jpg')} 800w, ${src} 1600w`}
              sizes="(min-width: 640px) 50vw, 100vw"
              alt=""
              className="aspect-[16/10] w-full border border-line object-cover"
            />
            <figcaption className="mt-2 text-meta text-muted">{caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <section className="lg:col-span-5">
          <PartTitle>What students learn</PartTitle>
          <ul className="mt-5 space-y-3">
            {goals.map((goal, index) => (
              <li key={goal} className="flex items-center gap-3 text-ink">
                <span className={learnTile}>
                  <Icon icon={goalIcons[index]} />
                </span>
                {goal}
              </li>
            ))}
          </ul>
        </section>
        <section className="lg:col-span-7">
          <PartTitle>How a Data Camp runs</PartTitle>
          <ol className="mt-5 border-t border-line">
            {steps.map(({ title, text }, index) => (
              <li key={title} className="flex gap-4 border-b border-line py-4">
                <span className={stepTile}>
                  <Icon icon={stepIcons[index]} />
                </span>
                <div>
                  <p className="text-meta font-semibold tabular-nums text-green">Step {index + 1}</p>
                  <p className="font-semibold text-ink">{title}</p>
                  <p className="mt-1 text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {resource && (
        // On a wide screen the documents sit beside the photos. On a narrow one they follow them.
        <div className="mt-14 grid gap-12 border-t border-line pt-10 lg:grid-cols-12">
          <section className="min-w-0 lg:col-span-8" aria-labelledby="data-camp-photos">
            <PartTitle id="data-camp-photos">Data Camp photos</PartTitle>
            <div className="mt-4">
              <PhotoCarousel label="Data Camp photos" photos={resource.photos} />
            </div>
          </section>
          <div className="min-w-0 lg:col-span-4">
            <DocumentList documents={resource.documents} beside />
          </div>
        </div>
      )}
    </article>
  );
}
