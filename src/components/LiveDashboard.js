import React from 'react';
import { Section, SectionTitle } from './ui';

// The views are from the sketch. No data source is connected yet.
const views = ['Nepal', 'Bangladesh', 'Student overall'];

const LiveDashboard = () => (
  <Section name="dashboard" id="dashboard">
    <SectionTitle className="mb-6">Live Dashboard</SectionTitle>
    <ul className="flex flex-wrap gap-x-6 gap-y-1 text-ui text-muted">
      {views.map((view) => (
        <li key={view} className="flex h-11 items-center">{view}</li>
      ))}
    </ul>
    <div className="mt-4 flex min-h-[220px] items-center justify-center border border-line bg-surface text-body text-muted">
      Coming soon.
    </div>
  </Section>
);

export default LiveDashboard;
