import React from 'react';

export const container = 'mx-auto max-w-content px-4 lg:px-6';
export const underlineLink = 'underline-offset-4 transition-colors hover:underline';
export const textLink = `${underlineLink} hover:text-green`;

const titleSizes = {
  section: 'text-title-sm lg:text-display',
  sidebar: 'text-sub',
};

/** A home page band: hairline on top, the page container inside, and the data-section name the screenshots key on. */
export function Section({ name, id, padding = 'py-12 lg:py-16', className = '', children }) {
  return (
    <section data-section={name} id={id} className="border-t border-line">
      <div className={`${container} ${padding} ${className}`}>{children}</div>
    </section>
  );
}

export function SectionTitle({ size = 'section', children, className = '' }) {
  return <h2 className={`${titleSizes[size]} text-green ${className}`}>{children}</h2>;
}

export function SubTitle({ children, className = '' }) {
  return <h3 className={`text-xl text-ink lg:text-sub ${className}`}>{children}</h3>;
}
