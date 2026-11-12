import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { dashboard } from '../data/resources';
import { SITE_TITLE } from './ComingSoon';
import { SectionTitle, textLink } from './ui';

const linkClass = `inline-flex min-h-11 items-center gap-2 font-semibold text-green ${textLink}`;

/** /dashboard. The Nutrition Dashboard app shown inside the site, with a link to open it on its own. */
function DashboardPage() {
  useEffect(() => {
    document.title = `${dashboard.title} | ${SITE_TITLE}`;
    return () => {
      document.title = SITE_TITLE;
    };
  }, []);

  return (
    <>
      <Link to="/" className={linkClass}>
        <ArrowLeft size={18} aria-hidden="true" />
        Back to home
      </Link>
      <SectionTitle as="h1" className="mt-4 animate-rise">{dashboard.title}</SectionTitle>
      <p className="mt-4 max-w-[60ch] animate-rise text-sub text-ink [animation-delay:100ms]">
        {dashboard.description}
      </p>
      <a href={dashboard.href} target="_blank" rel="noopener noreferrer" className={`mt-4 ${linkClass}`}>
        Open full screen
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
      <iframe
        title={dashboard.title}
        src={dashboard.href}
        loading="lazy"
        className="mt-4 h-[78vh] min-h-[560px] w-full border border-line bg-surface"
      />
    </>
  );
}

export default DashboardPage;
