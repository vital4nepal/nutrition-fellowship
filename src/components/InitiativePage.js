import { useParams } from 'react-router-dom';
import { BookOpen, Database, Flag, Gauge, Map as MapIcon, PenLine, Presentation, Table2, Target } from 'lucide-react';
import { initiatives } from '../data/initiatives';
import ComingSoon from './ComingSoon';
import { resources } from '../data/resources';
import { DocumentList } from './ContentPage';
import { PhotoSlideshow } from './Slideshow';
import NotFound from './NotFound';
import { SectionTitle, useDocumentTitle } from './ui';

// One icon for each goal and each step, in the order of `goals` and `steps` in the data file.
const goalIcons = [Database, Gauge, Flag, Target, PenLine];
const stepIcons = [MapIcon, Table2, BookOpen, Presentation];

// The two lists are one pair: the same bare green icons, the same rules and the same row rhythm.
// The icon sits level with the first line of its text.
const tile = 'mt-px shrink-0 text-green';
const list = 'mt-5 border-t border-line';
const row = 'flex items-start gap-4 border-b border-line py-4';

const Icon = ({ icon: Glyph }) => <Glyph size={22} strokeWidth={1.75} aria-hidden="true" />;

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

  useDocumentTitle(initiative?.page && initiative.title);

  if (!initiative) {
    return <NotFound />;
  }
  if (!initiative.page) {
    return <ComingSoon title={initiative.title} />;
  }

  const { subtitle, intro, photos, goals, steps, resourceId } = initiative.page;
  const resource = resources.find((item) => item.id === resourceId);
  return (
    <article className="text-ui">
      <SectionTitle as="h1" className="max-w-[20ch] !leading-[1.1] lg:!text-[3rem]">{initiative.title}</SectionTitle>
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
          <ul className={list}>
            {goals.map((goal, index) => (
              <li key={goal} className={row}>
                <span className={tile}>
                  <Icon icon={goalIcons[index]} />
                </span>
                <span className="text-ink">{goal}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="lg:col-span-7">
          <PartTitle>How a Data Camp runs</PartTitle>
          <ol className={list}>
            {steps.map(({ title, text }, index) => (
              <li key={title} className={row}>
                <span className={tile}>
                  <Icon icon={stepIcons[index]} />
                </span>
                <div>
                  <p className="font-semibold leading-6 text-ink">
                    <span className="mr-1.5 tabular-nums text-green">{index + 1}.</span>
                    {title}
                  </p>
                  <p className="mt-1 text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* On a wide screen the documents sit beside the photos. On a narrow one they follow them. */}
      <div className="mt-14 grid gap-12 border-t border-line pt-10 lg:grid-cols-12">
        <section className="min-w-0 lg:col-span-8" aria-labelledby="data-camp-photos">
          <PartTitle id="data-camp-photos">Data Camp photos</PartTitle>
          <div className="mt-4">
            <PhotoSlideshow label="Data Camp photos" photos={resource.photos} />
          </div>
        </section>
        <div className="min-w-0 lg:col-span-4">
          <DocumentList documents={resource.documents} beside />
        </div>
      </div>
    </article>
  );
}
