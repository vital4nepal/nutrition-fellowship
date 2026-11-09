import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import { Section, SectionTitle, SubTitle, textLink } from './ui';

const documents = [
  {
    category: 'Reports',
    links: [
      { title: 'Newsletter', pdfUrl: '/document_pdfs/Nutrition Fellowship Brief.pdf' },
      { title: 'Nutrition Profiles', pdfUrl: '/document_pdfs/Stunting profile.pdf' },
    ],
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

const titleClass = `block flex-1 py-3 pr-4 font-medium ${textLink}`;
const slotClass = 'flex h-11 w-11 shrink-0 items-center justify-center';

// Every row ends in the same 44px slot: a download link for a PDF, an arrow for an inner page.
function Resource({ title, path, pdfUrl }) {
  return (
    <li className="flex min-h-[56px] items-center justify-between border-b border-line">
      {pdfUrl ? (
        <>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className={titleClass}>
            {title}
          </a>
          <a href={pdfUrl} download aria-label={`Download ${title}`} className={`${slotClass} text-green`}>
            <Download size={20} aria-hidden="true" />
          </a>
        </>
      ) : (
        <>
          <Link to={path} className={titleClass}>
            {title}
          </Link>
          <span aria-hidden="true" className={`${slotClass} text-muted`}>
            <ArrowRight size={20} />
          </span>
        </>
      )}
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
