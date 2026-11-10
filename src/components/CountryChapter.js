import React from 'react';
import { countries } from '../data/pulseSurvey';
import { Section, SectionTitle, SubTitle } from './ui';

// The steps are the "Your Role" list of the Chapter brief, shortened. The Nepal figures are from the D4N concept note.
const steps = [
  'Build a national network of cross-sector, intergenerational nutrition stakeholders, with strong student representation.',
  'Run a pulse survey of nutrition students.',
  'Support data analytics activities that turn data into policy recommendations.',
  'Organize a national dialogue to set collaboration areas and advocacy priorities.',
  'Work with the Government and partners on program exposure, mentorship and learning for students.',
];

const status = {
  nepal: 'Active chapter. More than 400 members and stakeholders, over half of them students.',
  bangladesh: 'Engagement is growing. Students study breastfeeding trends.',
  'sri-lanka': 'Engagement is growing. Students review iodine deficiency and salt iodization.',
  pakistan: 'Engagement is growing.',
};

const CountryChapter = () => (
  <Section name="country-chapter" id="country-chapter">
    <SectionTitle>Country Chapters</SectionTitle>
    <ul className="mt-8 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
      {countries.map(({ id, label, respondents }) => (
        <li key={id} className="border-b border-line py-5 sm:pr-6 lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0">
          <h3 className="text-sub text-green">{label}</h3>
          <p className="mt-2 text-ui">
            {status[id]} {respondents} students answered the Pulse Survey.
          </p>
        </li>
      ))}
    </ul>
    <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-12">
      <SubTitle className="lg:col-span-4">Start a chapter in your country</SubTitle>
      <ol className="list-decimal space-y-2 pl-5 text-body lg:col-span-8">
        {steps.map((step) => (
          <li key={step} className="max-w-[65ch]">{step}</li>
        ))}
      </ol>
    </div>
  </Section>
);

export default CountryChapter;
