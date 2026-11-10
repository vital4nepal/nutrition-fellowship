import React from 'react';
import { Section, SectionTitle } from './ui';

// The vision and the pillars come from the Fellowship brief. Each pillar line is the brief's text, shortened.
const pillars = [
  { name: 'Convene', line: 'Build networks that share knowledge and drive collective action.' },
  { name: 'Celebrate', line: 'Share the stories of nutrition champions and the lessons they learned.' },
  { name: 'Collaborate', line: 'Advocate for political will, accountability and resources for nutrition.' },
  { name: 'Connect', line: 'Link global and national institutions for research, data and innovation.' },
  { name: 'Coach', line: 'Give students and emerging professionals the skills to lead nutrition initiatives.' },
];

const About = () => (
  <Section name="about" id="aboutus" bordered={false}>
    <SectionTitle>About Us</SectionTitle>
    <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
      <blockquote className="font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold italic leading-tight text-ink lg:col-span-7">
        “A world free from the effects of undernutrition and overnutrition.”
      </blockquote>
      <div className="space-y-4 text-body lg:col-span-5">
        <p>
          We unite three generations of stakeholders from Nepal and around the world, combining experience, innovation, and passion to accelerate the fight against undernutrition.
        </p>
        <p className="font-semibold text-green">Bound by purpose, united for nutrition.</p>
      </div>
    </div>
    <ul className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-5">
      {pillars.map(({ name, line }) => (
        <li key={name} className="border-b border-line py-5 sm:pr-6 lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0">
          <h3 className="text-xl text-green">{name}</h3>
          <p className="mt-2 text-ui text-ink">{line}</p>
        </li>
      ))}
    </ul>
  </Section>
);

export default About;
