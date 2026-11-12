import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import { resources } from '../data/resources';
import { Section, SectionTitle, SubTitle, groupTitleLink, textLink } from './ui';

const documents = [
  {
    category: 'Reports',
    links: resources
      .find(({ id }) => id === 'reports')
      .documents.map(({ title, file }) => ({ title, path: '/resources/reports', pdfUrl: file })),
  },
  {
    category: 'Policies and Plans',
    links: [{ title: 'Nutrition Policy 2025', path: '/policy2025' }],
  },
  {
    category: 'Blogs',
    links: [
      { title: 'Nutrition Fellowship for Nepal : 2nd Meet', path: '/nfn2ndmeetblog' },
      { title: 'Internship at Nutrition Rehabilitation Center', path: '/nrcinternblog' },
    ],
  },
  {
    category: 'Researches',
    links: [{ title: 'AI in Nutrition', path: '/aiinnutrition' }],
  },
];

const rowClass = 'flex min-h-[56px] items-center justify-between border-b border-line';
const titleClass = 'block flex-1 py-3 pr-4 font-medium';
const slotClass = 'flex h-11 w-11 shrink-0 items-center justify-center';

// Every row ends in the same 44px slot. A PDF row has two links (title opens its page, icon downloads); a page row is one link.
function Resource({ title, path, pdfUrl }) {
  if (!pdfUrl) {
    return (
      <li>
        <Link to={path} className={`group ${rowClass}`}>
          <span className={`${titleClass} ${groupTitleLink}`}>{title}</span>
          <span aria-hidden="true" className={`${slotClass} text-muted transition-colors group-hover:text-green`}>
            <ArrowRight size={20} />
          </span>
        </Link>
      </li>
    );
  }
  return (
    <li className={rowClass}>
      <Link to={path} className={`${titleClass} ${textLink}`}>
        {title}
      </Link>
      <a href={pdfUrl} download aria-label={`Download ${title}`} className={`${slotClass} text-green`}>
        <Download size={20} aria-hidden="true" />
      </a>
    </li>
  );
}

function Repository() {
  return (
    <Section name="resources" id="documents">
      <SectionTitle className="mb-8">Resources & Publications</SectionTitle>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {documents.map(({ category, links }) => (
          <div key={category} className="border-t border-ink pt-4">
            <SubTitle>{category}</SubTitle>
            <ul className="mt-2">
              {links.map((link) => (
                <Resource key={link.title} {...link} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Repository;
