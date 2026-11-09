import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionTitle, textLink } from './ui';

// The advocacy and technology links are example.com placeholders, so those rows render without a link.
const initiatives = [
  {
    title: 'Gen-N Initiatives',
    img: '/Initiatives/Gen-N.png',
    width: 165,
    height: 149,
    link: 'https://drive.google.com/drive/folders/1_PZuUUcI1jwHlIVtsgN01VcXAdH8B8PO?usp=drive_link',
  },
  { title: 'Advocacy and Campaigns', img: '/Initiatives/Advocacy.png', width: 197, height: 154 },
  { title: 'Technology in Nutrition', img: '/Initiatives/TechInNut.png', width: 1000, height: 500 },
];

const rowClass = 'flex min-h-[80px] items-center gap-4 border-b border-line py-3 md:border-b-0 md:py-5';

const Initiatives = () => (
  <Section name="initiatives" id="initiatives">
    <SectionTitle className="mb-8">Projects and Initiatives</SectionTitle>
    <ul className="grid border-t border-line md:grid-cols-3 md:gap-8">
      {initiatives.map(({ title, img, width, height, link }) => {
        const content = (
          <>
            <img
              src={img}
              alt=""
              width={width}
              height={height}
              loading="lazy"
              className="h-14 w-14 shrink-0 border border-line object-cover md:h-16 md:w-16"
            />
            <span className="text-lg font-semibold">
              {title}
              {link && <ArrowUpRight size={18} aria-hidden="true" className="ml-1 inline-block align-text-bottom" />}
            </span>
          </>
        );
        return (
          <li key={title}>
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className={`${textLink} ${rowClass}`}>
                {content}
              </a>
            ) : (
              <div className={rowClass}>{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  </Section>
);

export default Initiatives;
