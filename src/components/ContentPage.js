import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Download } from 'lucide-react';
import { SITE_TITLE } from './ComingSoon';
import PhotoCarousel from './PhotoCarousel';
import { SectionTitle, SiteLink, SubTitle, groupTitleLink, textLink } from './ui';

const link = `inline-flex min-h-11 items-center gap-2 font-semibold text-green ${textLink}`;

/**
 * The page of one resource folder or one event: images in a carousel, a summary beside it, then the documents as cards.
 * `links` end the page. An address that starts with "/" is a site page, any other is an outside link.
 */
function ContentPage({
  section,
  backTo,
  title,
  date,
  summary,
  pointsTitle,
  points = [],
  images,
  imageKind = 'photo',
  documents = [],
  links = [],
}) {
  useEffect(() => {
    document.title = `${title} | ${section} | ${SITE_TITLE}`;
    return () => {
      document.title = SITE_TITLE;
    };
  }, [title, section]);

  return (
    <article>
      <Link to={backTo.to} className={link}>
        <ArrowLeft size={18} aria-hidden="true" />
        {backTo.label}
      </Link>
      <SectionTitle as="h1" className="mt-4 animate-rise">{title}</SectionTitle>
      {date && <p className="mt-2 animate-rise text-body tabular-nums text-muted [animation-delay:60ms]">{date}</p>}

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* min-w-0: a grid item grows to its content, and the thumbnail strip is wider than the screen. */}
        <div className="min-w-0 animate-rise [animation-delay:120ms] lg:col-span-8">
          <PhotoCarousel label={`${title}, ${imageKind}s`} photos={images} />
        </div>
        <div className="min-w-0 animate-rise [animation-delay:200ms] lg:col-span-4">
          <p className="text-body text-ink">{summary ?? 'More photos and documents are coming soon.'}</p>
          {points.length > 0 && (
            <>
              <SubTitle as="h2" className="mt-8">{pointsTitle}</SubTitle>
              <ul className="mt-4 space-y-3 text-body">
                {points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {documents.length > 0 && (
        <section className="mt-16 border-t border-line pt-10" aria-label="Documents">
          <SectionTitle as="h2" size="sidebar">Documents</SectionTitle>
          <ul className="nf-stagger mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map(({ title: name, description, file, kind, size }) => (
              <li key={file}>
                <a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col border border-line bg-surface p-5 transition-colors hover:border-green"
                >
                  <span className={`text-body font-semibold text-ink ${groupTitleLink}`}>{name}</span>
                  <span className="mt-2 text-meta text-muted">{description}</span>
                  <span className="mt-auto flex items-center justify-between gap-3 pt-5 text-meta tabular-nums text-muted">
                    {kind}, {size}
                    {/* A browser shows a PDF in the tab and saves any other file. */}
                    {kind === 'PDF' ? (
                      <ArrowUpRight size={20} aria-hidden="true" className="text-green" />
                    ) : (
                      <Download size={20} aria-hidden="true" className="text-green" />
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {links.length > 0 && (
        <ul className="mt-10 flex flex-col gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <SiteLink
                href={href}
                {...(href.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className={link}
              >
                {label}
                <ArrowUpRight size={18} aria-hidden="true" />
              </SiteLink>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default ContentPage;
