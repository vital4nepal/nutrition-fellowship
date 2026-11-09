import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Section, SectionTitle, groupTitleLink } from './ui';

// The advocacy and technology links are example.com placeholders, so those rows render without a link.
const initiatives = [
  {
    title: 'Gen-N Initiatives',
    img: '/Initiatives/thumbs/Gen-N.png',
    width: 141,
    height: 128,
    link: 'https://drive.google.com/drive/folders/1_PZuUUcI1jwHlIVtsgN01VcXAdH8B8PO?usp=drive_link',
  },
  { title: 'Advocacy and Campaigns', img: '/Initiatives/thumbs/Advocacy.png', width: 163, height: 128 },
  { title: 'Technology in Nutrition', img: '/Initiatives/thumbs/TechInNut.png', width: 256, height: 128 },
];

const rowClass = 'flex min-h-[80px] items-center gap-4 border-b border-line py-3 lg:border-b-0 lg:py-5';

// The last word and the arrow share one nowrap span, so the arrow never wraps onto a line alone.
function Title({ title, linked }) {
  const words = title.split(' ');
  const last = words.pop();
  return (
    <span className={`text-lg font-semibold ${linked ? groupTitleLink : ''}`}>
      {words.join(' ')}{' '}
      <span className="whitespace-nowrap">
        {last}
        {linked && <ArrowUpRight size={18} aria-hidden="true" className="ml-1 inline-block align-text-bottom" />}
      </span>
    </span>
  );
}

const Initiatives = () => (
  <Section name="initiatives" id="initiatives">
    <SectionTitle className="mb-8">Projects and Initiatives</SectionTitle>
    <ul className="grid border-t border-line lg:grid-cols-3 lg:gap-8">
      {initiatives.map(({ title, img, width, height, link }) => {
        const content = (
          <>
            <img
              loading="lazy"
              src={img}
              alt=""
              width={width}
              height={height}
              className="h-14 w-14 shrink-0 border border-line object-cover md:h-16 md:w-16"
            />
            <Title title={title} linked={Boolean(link)} />
          </>
        );
        return (
          <li key={title}>
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className={`group ${rowClass}`}>
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
