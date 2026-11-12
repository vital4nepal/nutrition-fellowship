import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { contentsLabel, resources } from '../data/resources';
import { SITE_TITLE } from './ComingSoon';
import { SectionTitle, groupTitleLink, textLink } from './ui';

const TITLE = 'Resources';

/** /resources. One card for each folder in data/resources.js. A card opens the page of its folder. */
function ResourcesPage() {
  useEffect(() => {
    document.title = `${TITLE} | ${SITE_TITLE}`;
    return () => {
      document.title = SITE_TITLE;
    };
  }, []);

  return (
    <>
      <Link to="/" className={`inline-flex min-h-11 items-center gap-2 font-semibold text-green ${textLink}`}>
        <ArrowLeft size={18} aria-hidden="true" />
        Back to home
      </Link>
      <SectionTitle as="h1" className="mt-4 animate-rise">{TITLE}</SectionTitle>
      <p className="mt-4 max-w-[60ch] animate-rise text-sub text-ink [animation-delay:100ms]">
        Documents and photos from our meetings and programs.
      </p>

      <ul className="nf-stagger mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <li key={resource.id}>
            <Link
              to={`/resources/${resource.id}`}
              className="group flex h-full flex-col border border-line bg-surface transition-colors hover:border-green"
            >
              <div className="aspect-[3/2] overflow-hidden border-b border-line bg-ink">
                <img
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : undefined}
                  src={resource.cover.thumb}
                  srcSet={`${resource.cover.thumb} 480w, ${resource.cover.src} 1400w`}
                  sizes="(min-width: 768px) 560px, 100vw"
                  alt=""
                  width={480}
                  height={320}
                  style={{ objectPosition: resource.coverFocus }}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className={`text-sub text-green ${groupTitleLink}`}>{resource.title}</h2>
                {resource.date && <p className="mt-1 text-meta tabular-nums text-muted">{resource.date}</p>}
                <p className="mt-3 text-body text-ink">{resource.description}</p>
                <p className="mt-auto flex items-center justify-between gap-4 pt-5 text-meta font-semibold text-green">
                  {contentsLabel(resource)}
                  <ArrowRight size={20} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ResourcesPage;
