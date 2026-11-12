import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { resources } from '../data/resources';
import { SITE_TITLE } from './ComingSoon';
import { SectionTitle, groupTitleLink, textLink } from './ui';

const TITLE = 'Resources';

/** /resources. One card for each Drive folder in data/resources.js. */
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
        Documents, photos and slides from our meetings and programs. Each link opens a folder on Google Drive.
      </p>

      <ul className="nf-stagger mt-10 border-t border-line">
        {resources.map(({ id, title, description, image, href }) => (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid min-h-[96px] grid-cols-[72px_1fr_auto] items-center gap-4 border-b border-line py-4 md:grid-cols-[112px_1fr_auto] md:gap-6"
            >
              <img
                loading="lazy"
                src={image}
                alt=""
                width={112}
                height={80}
                className="h-[54px] w-[72px] object-cover md:h-20 md:w-28"
              />
              <span className="min-w-0">
                <span className={`block text-base font-semibold text-ink lg:text-body ${groupTitleLink}`}>{title}</span>
                <span className="mt-1 block text-meta text-muted">{description}</span>
              </span>
              <span className="flex items-center gap-1 text-meta font-semibold text-green">
                <span className="hidden sm:inline">Open in Drive</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ResourcesPage;
