import React from 'react';
import { SubTitle } from './ui';

/** One column of the updates band: a heading over ruled entries, shared by Upcoming Events and Announcements. */
function EntryList({ heading, entries }) {
  return (
    <div>
      <SubTitle className="mb-4">{heading}</SubTitle>
      {entries.map(({ title, date, description }) => (
        <article key={title} className="border-t border-line py-5 last:border-b">
          <h4 className="text-body font-semibold text-ink">{title}</h4>
          <p className="mt-1 text-meta tabular-nums text-muted">Date: {date}</p>
          <p className="mt-2 max-w-[60ch] text-body text-ink">{description}</p>
        </article>
      ))}
    </div>
  );
}

export default EntryList;
