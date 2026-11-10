import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionTitle, textLink } from './ui';

// Only Nepal has a dashboard so far. It is the same link as the Key Highlights entry.
const views = [
  { label: 'Nepal', href: 'https://nutrition-dashboard-vision.vercel.app/' },
  { label: 'Bangladesh' },
  { label: 'Student overall' },
];

const LiveDashboard = () => (
  <Section name="dashboard" id="dashboard">
    <SectionTitle className="mb-6">Live Dashboard</SectionTitle>
    <ul className="flex flex-wrap gap-x-6 gap-y-1 text-ui">
      {views.map(({ label, href }) => (
        <li key={label} className="flex min-h-11 items-center">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 font-semibold text-green ${textLink}`}
            >
              {label}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : (
            <span className="text-muted">{label}, coming soon</span>
          )}
        </li>
      ))}
    </ul>
  </Section>
);

export default LiveDashboard;
