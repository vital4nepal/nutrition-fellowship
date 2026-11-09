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

const rowClass = 'grid min-h-[80px] grid-cols-[56px_1fr_auto] items-center gap-4 border-b border-line py-3 lg:grid-cols-[72px_1fr_auto] lg:gap-6 lg:py-5';

const Initiatives = () => (
  <Section name="initiatives" id="initiatives">
    <SectionTitle className="mb-8">Projects and Initiatives</SectionTitle>
    <ul className="border-t border-line">
      {initiatives.map(({ title, img, width, height, link }) => {
        const content = (
          <>
            <img
              src={img}
              alt=""
              width={width}
              height={height}
              loading="lazy"
              className="h-14 w-14 border border-line bg-surface object-contain lg:h-[72px] lg:w-[72px]"
            />
            <span className="text-lg font-semibold">{title}</span>
            {link && <ArrowUpRight size={20} aria-hidden="true" />}
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
