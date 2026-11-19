import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { initiatives } from '../data/initiatives';
import ComingSoon, { SITE_TITLE } from './ComingSoon';
import { resources } from '../data/resources';
import { DocumentList } from './ContentPage';
import PhotoCarousel from './PhotoCarousel';
import NotFound from './NotFound';
import { SectionTitle, textLink } from './ui';

const backLink = `inline-flex min-h-11 items-center gap-2 font-semibold text-green ${textLink}`;

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
      <Link to="/#initiatives" className={backLink}>
        <ArrowLeft size={18} aria-hidden="true" />
        Projects and Initiatives
      </Link>
      <SectionTitle as="h1" size="sidebar" className="mt-4 lg:text-title-sm">{initiative.title}</SectionTitle>
      <p className="mt-2 max-w-[65ch] font-semibold text-green">{subtitle}</p>
      <p className="mt-3 max-w-[65ch] text-ink">{intro}</p>

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

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <section className="lg:col-span-5">
          <h2 className="text-lg">What students learn</h2>
          <ul className="mt-3 space-y-2">
            {goals.map((goal) => (
              <li key={goal} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-accent" />
                {goal}
              </li>
            ))}
          </ul>
        </section>
        <section className="lg:col-span-7">
          <h2 className="text-lg">How a Data Camp runs</h2>
          <ol className="mt-3 border-t border-line">
            {steps.map(({ title, text }, index) => (
              <li key={title} className="grid grid-cols-[1.5rem_1fr] gap-x-3 border-b border-line py-3">
                <span className="font-serif text-lg font-semibold tabular-nums text-green">{index + 1}</span>
                <div>
                  <p className="font-semibold text-ink">{title}</p>
                  <p className="mt-1 text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {resource && (
        <>
          <section className="mt-10 border-t border-line pt-6" aria-labelledby="data-camp-photos">
            <h2 id="data-camp-photos" className="mb-4 text-lg">Data Camp photos</h2>
            <div className="max-w-3xl">
              <PhotoCarousel label="Data Camp photos" photos={resource.photos} />
            </div>
          </section>
          <DocumentList documents={resource.documents} />
        </>
      )}
    </article>
  );
}
