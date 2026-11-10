import React from 'react';
import { Section, SectionTitle, SubTitle } from './ui';

// The copy comes from the Chapter brief. The step list is the brief's "Your Role" list, shortened.
const steps = [
  'Build a national network of cross-sector, intergenerational nutrition stakeholders, with strong student representation.',
  'Run a pulse survey of nutrition students.',
  'Support data analytics activities that turn data into policy recommendations.',
  'Organize a national dialogue to set collaboration areas and advocacy priorities.',
  'Work with the Government and partners on program exposure, mentorship and learning for students.',
];

const CountryChapter = () => (
  <Section name="country-chapter" id="country-chapter">
    <SectionTitle className="mb-8">Country Chapters</SectionTitle>
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <SubTitle>Nepal Chapter</SubTitle>
        <p className="mt-3 max-w-[65ch] text-body">
          Already active in Nepal with over 300 members. The members include students (nearly 50%), government actors, UN and NGO professionals and academics.
        </p>
      </div>
      <div>
        <SubTitle>Start a chapter in your country</SubTitle>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-body">
          {steps.map((step) => (
            <li key={step} className="max-w-[65ch]">{step}</li>
          ))}
        </ol>
      </div>
    </div>
  </Section>
);

export default CountryChapter;
