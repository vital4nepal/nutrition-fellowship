import React from 'react';
import { SectionTitle } from './ui';

/** The placeholder for an inner page that has no content yet. */
const ComingSoon = ({ title }) => (
  <>
    <SectionTitle as="h1">{title}</SectionTitle>
    <p className="mt-4 text-sub text-ink">Coming soon.</p>
  </>
);

export default ComingSoon;
