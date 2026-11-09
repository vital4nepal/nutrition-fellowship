import React from 'react';
import { SectionTitle, groupTitleLink } from './ui';

const highlights = [
  {
    image: '/KeyHighlights/NutritionDashboard.png',
    topic: 'Nutrition Dashboard',
    description: 'The Nutrition Dashboard of Nepal',
    link: 'https://nutrition-dashboard-vision.vercel.app/',
  },
  {
    image: '/KeyHighlights/NFNbanner.jpeg',
    topic: 'Jan 17 Documents',
    description: 'The documents from the 2nd Nutrition Fellowship meeting',
    link: 'https://drive.google.com/drive/folders/11yDaiLP9wzxMpP1vY4zqsY3uewHR__oO?usp=drive_link',
  },
  {
    image: '/KeyHighlights/Dr. RP Bichha.jpg',
    topic: 'Dr. RP Bichha Speech',
    description: 'The speech given by Dr. RP Bichha at the 2nd Nutrition Fellowship meeting',
    link: 'https://youtu.be/YxI-8DVWIQQ?si=tb7y2lsEyLm8_31v',
  },
  {
    image: '/KeyHighlights/Miriam Krantz.jpg',
    topic: 'Miriam Krantz Speech',
    description: 'The speech given by Miriam Krantz at the 2nd Nutrition Fellowship meeting',
    link: 'https://youtu.be/YxI-8DVWIQQ?si=tb7y2lsEyLm8_31v',
  },
  {
    image: '/KeyHighlights/Dr. Ramesh K Adhikari.jpg',
    topic: 'Dr. RK Adhikari Speech',
    description: 'The speech given by Dr. Ramesh K Adhikari at the 2nd Nutrition Fellowship meeting',
    link: 'https://youtu.be/YxI-8DVWIQQ?si=tb7y2lsEyLm8_31v',
  },
];

const CoverpageRight = () => (
  <>
    <SectionTitle size="sidebar">Key Highlights</SectionTitle>
    <ul className="mt-4 border-t border-line">
      {highlights.map((highlight) => (
        <li key={highlight.topic}>
          <a
            href={highlight.link}
            className="group flex min-h-[80px] gap-4 border-b border-line py-3"
          >
            <img
              src={highlight.image}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              className="h-12 w-12 shrink-0 object-cover lg:h-14 lg:w-14"
            />
            <span className="min-w-0">
              <span className={`block text-base font-semibold text-ink ${groupTitleLink}`}>
                {highlight.topic}
              </span>
              <span className="line-clamp-2 text-meta lg:line-clamp-3 text-muted">{highlight.description}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  </>
);

export default CoverpageRight;
