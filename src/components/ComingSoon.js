import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SectionTitle, textLink } from './ui';

export const SITE_TITLE = 'Nutrition Fellowship';

/** The body of an inner page that has no content yet. `back` is the link above the title, like on every inner page. */
const ComingSoon = ({ title, children = 'Coming soon.', back = { to: '/', label: 'Back to home' } }) => {
  useEffect(() => {
    document.title = `${title} | ${SITE_TITLE}`;
    return () => {
      document.title = SITE_TITLE;
    };
  }, [title]);

  return (
    <>
      <Link to={back.to} className={`inline-flex min-h-11 items-center gap-2 font-semibold text-green ${textLink}`}>
        <ArrowLeft size={18} aria-hidden="true" />
        {back.label}
      </Link>
      <SectionTitle as="h1" className="mt-4">{title}</SectionTitle>
      <p className="mt-4 text-sub text-ink">{children}</p>
    </>
  );
};

export default ComingSoon;
