import React from 'react';
import { SectionTitle } from './ui';

/** The body of an inner page that has no content yet. It also serves the not-found page. */
const ComingSoon = ({ title, children = 'Coming soon.' }) => (
  <>
    <SectionTitle as="h1">{title}</SectionTitle>
    <p className="mt-4 text-sub text-ink">{children}</p>
  </>
);

export default ComingSoon;
