import React from 'react';

export const container = 'mx-auto max-w-content px-4 lg:px-6';
export const textLink = 'underline-offset-4 transition-colors hover:text-green hover:underline';

/** A home page band: hairline on top, the page container inside, and the data-section name the screenshots key on. */
export function Section({ name, id, className = 'py-12 lg:py-16', children }) {
  return (
    <section data-section={name} id={id} className="border-t border-line">
      <div className={`${container} ${className}`}>{children}</div>
    </section>
  );
}

export function SectionTitle({ children, className = '' }) {
  return <h2 className={`text-title-sm text-green lg:text-title ${className}`}>{children}</h2>;
}

export function SubTitle({ children, className = '' }) {
  return <h3 className={`text-xl text-ink lg:text-sub ${className}`}>{children}</h3>;
}
