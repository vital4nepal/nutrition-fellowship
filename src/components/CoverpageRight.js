import React from 'react';
import { SectionTitle, SiteLink, groupTitleLink } from './ui';

const highlights = [
  {
    image: '/KeyHighlights/thumbs/Dr. RP Bichha.jpg',
    topic: 'Dr. RP Bichha Speech',
    description: 'Honorable Member of the National Planning Commission',
    link: 'https://youtu.be/YxI-8DVWIQQ?si=tb7y2lsEyLm8_31v',
  },
];

const CoverpageRight = () => (
  <>
    <SectionTitle size="sidebar">Key Highlights</SectionTitle>
    <ul className="mt-4 border-t border-line">
      {highlights.map((highlight) => (
        <li key={highlight.topic}>
          <SiteLink
            href={highlight.link}
            className="group flex min-h-[80px] gap-4 border-b border-line py-3"
          >
            <img
              loading="lazy"
              src={highlight.image}
              alt=""
              width={56}
              height={56}
              className="h-12 w-12 shrink-0 object-cover lg:h-14 lg:w-14"
            />
            <span className="min-w-0">
              <span className={`block text-base font-semibold text-ink ${groupTitleLink}`}>
                {highlight.topic}
              </span>
              <span className="line-clamp-2 text-meta text-muted lg:line-clamp-3">{highlight.description}</span>
            </span>
          </SiteLink>
        </li>
      ))}
    </ul>
  </>
);

export default CoverpageRight;
