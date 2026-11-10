import React from 'react';
import { Section, SectionTitle, SubTitle } from './ui';

// The steps are the "Your Role" list of the Chapter brief, shortened. The Nepal figures are from the D4N concept note.
const steps = [
  'Build a national network with strong student representation.',
  'Run a pulse survey of nutrition students.',
  'Turn data into policy recommendations.',
  'Hold a national dialogue on advocacy priorities.',
  'Open program exposure and mentorship for students.',
];

const CountryChapter = () => (
  <Section name="country-chapter" id="country-chapter">
    <SectionTitle className="mb-8">Country Chapters</SectionTitle>
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <SubTitle>Nepal</SubTitle>
        <p className="mt-3 max-w-[50ch] text-body">
          The first chapter. More than 400 members and stakeholders, and over half are students.
        </p>
        <p className="mt-3 max-w-[50ch] text-body text-muted">Next: Bangladesh, Sri Lanka and Pakistan.</p>
      </div>
      <div>
        <SubTitle>Start a chapter in your country</SubTitle>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-body">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  </Section>
);

export default CountryChapter;
