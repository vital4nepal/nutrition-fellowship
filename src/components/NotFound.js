import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SITE_TITLE } from './ComingSoon';
import { SectionTitle, textLink } from './ui';

// The places most visitors look for. Hash links use <a>, so ScrollToHash lands them on the section.
const suggestions = [
  { href: '/#dashboard', label: 'Student Pulse Survey' },
  { href: '/#d4n', label: 'D4N 2026 Learning Lab' },
  { href: '/#initiatives', label: 'Projects and Initiatives' },
  { href: '/#thoughts', label: 'Contact us' },
];

/** Any address the router does not know. */
const NotFound = () => {
  useEffect(() => {
    document.title = `Page not found | ${SITE_TITLE}`;
    return () => {
      document.title = SITE_TITLE;
    };
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div className="lg:col-span-7">
        <p aria-hidden="true" className="animate-rise font-serif text-[6rem] font-semibold leading-none text-line lg:text-[9rem]">
          404
        </p>
        <SectionTitle as="h1" className="mt-4 animate-rise [animation-delay:80ms]">
          This page does not exist
        </SectionTitle>
        <p className="mt-4 max-w-[50ch] animate-rise text-sub text-ink [animation-delay:160ms]">
          The link may be old, or the address may have a typo.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 animate-rise items-center gap-2 bg-green px-6 font-semibold text-paper transition-colors hover:bg-deep [animation-delay:240ms]"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to home
        </Link>
      </div>
      <nav aria-label="Popular pages" className="lg:col-span-5">
        <p className="font-semibold text-ink">Or go straight to</p>
        <ul className="nf-stagger mt-3 border-t border-line">
          {suggestions.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`group flex min-h-14 items-center justify-between border-b border-line text-body font-medium ${textLink}`}
              >
                {label}
                <ArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NotFound;
