import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import { SectionTitle, textLink } from './ui';

export const SITE_TITLE = 'Nutrition Fellowship';

/** The body of an inner page that has no content yet. */
const ComingSoon = ({ title, children = 'Coming soon.' }) => {
  usePageMeta(`${title} | ${SITE_TITLE}`, `${title}: coming soon on the ${SITE_TITLE} site.`);

  return (
    <>
      <SectionTitle as="h1">{title}</SectionTitle>
      <p className="mt-4 text-sub text-ink">{children}</p>
      <Link to="/" className={`mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-green ${textLink}`}>
        <ArrowLeft size={18} aria-hidden="true" />
        Back to home
      </Link>
    </>
  );
};

export default ComingSoon;
