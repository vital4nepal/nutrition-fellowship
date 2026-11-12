import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Download } from 'lucide-react';
import { resources } from '../data/resources';
import { SITE_TITLE } from './ComingSoon';
import { SectionTitle, SubTitle, groupTitleLink, textLink } from './ui';

const TITLE = 'Resources';

function Documents({ documents }) {
  return (
    <ul className="mt-6 border-t border-line">
      {documents.map(({ title, file, kind, size }) => (
        <li key={file}>
          <a
            href={file}
            download
            className="group flex min-h-14 items-center justify-between gap-4 border-b border-line py-3"
          >
            <span className={`text-base font-semibold text-ink lg:text-body ${groupTitleLink}`}>{title}</span>
            <span className="flex shrink-0 items-center gap-2 text-meta tabular-nums text-muted">
              {kind}, {size}
              <Download size={18} aria-hidden="true" className="text-green" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function Photos({ title, photos }) {
  return (
    <>
      <SubTitle className="mt-10">Photos</SubTitle>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {photos.map(({ src, thumb }, index) => (
          <li key={src}>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open photo ${index + 1} of ${photos.length}, ${title}`}
              className="block bg-surface"
            >
              <img
                loading="lazy"
                src={thumb}
                alt=""
                width={480}
                height={320}
                className="aspect-[3/2] w-full object-cover transition-opacity hover:opacity-90"
              />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

/** /resources. The files of each Drive folder in data/resources.js: documents to download and a photo grid. */
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

      {resources.map(({ id, title, description, driveHref, documents, photos }) => (
        <section key={id} id={id} className="mt-14 scroll-mt-[calc(var(--nf-header-h)+16px)] border-t border-line pt-10">
          <SectionTitle size="sidebar" className="lg:text-title-sm">{title}</SectionTitle>
          <p className="mt-2 max-w-[60ch] text-body text-muted">{description}</p>
          <Documents documents={documents} />
          <Photos title={title} photos={photos} />
          <a
            href={driveHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-green ${textLink}`}
          >
            More files in Google Drive
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </section>
      ))}
    </>
  );
}

export default ResourcesPage;
