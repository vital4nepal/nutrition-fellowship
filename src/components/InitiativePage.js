import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { initiatives } from '../data/initiatives';
import { chapters } from '../data/site';
import ComingSoon, { SITE_TITLE } from './ComingSoon';
import NotFound from './NotFound';
import { SectionTitle, SubTitle, textLink } from './ui';

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

  const { intro, photos, goals, steps, link } = initiative.page;
  return (
    <article>
      <Link to="/#initiatives" className={backLink}>
        <ArrowLeft size={18} aria-hidden="true" />
        Projects and Initiatives
      </Link>
      <SectionTitle as="h1" className="mt-4 animate-rise">{initiative.title}</SectionTitle>
      <p className="mt-4 max-w-[60ch] animate-rise text-sub text-ink [animation-delay:100ms]">{intro}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {photos.map(({ src, caption }, index) => (
          <figure key={src} className="animate-rise" style={{ animationDelay: `${200 + index * 120}ms` }}>
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

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <section className="lg:col-span-5">
          <SubTitle>What students learn</SubTitle>
          <ul className="nf-stagger mt-4 space-y-3 text-body">
            {goals.map((goal) => (
              <li key={goal} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-accent" />
                {goal}
              </li>
            ))}
          </ul>
        </section>
        <section className="lg:col-span-7">
          <SubTitle>How a Data Camp runs</SubTitle>
          <ol className="nf-stagger mt-4 border-t border-line">
            {steps.map(({ title, text }, index) => (
              <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-5">
                <span className="font-serif text-title-sm font-semibold tabular-nums text-green">{index + 1}</span>
                <div>
                  <p className="font-semibold text-ink">{title}</p>
                  <p className="mt-1 text-body text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <Link to={link.href} className={`mt-12 ${backLink}`}>
        {link.label}
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </article>
  );
}

/** /chapters/:id. Nepal's content lives on the home page, so /chapters/nepal goes there. The others say "Coming soon". */
export function ChapterPage() {
  const { id } = useParams();
  const chapter = chapters.find((item) => item.id === id);
  if (chapter && !chapter.href.startsWith('/chapters/')) return <Navigate to={chapter.href} replace />;
  if (!chapter) return <NotFound />;
  return (
    <ComingSoon title={`${chapter.label} Chapter`}>
      The {chapter.label} chapter is coming soon. Students in {chapter.label} already answered the Pulse Survey.
    </ComingSoon>
  );
}
