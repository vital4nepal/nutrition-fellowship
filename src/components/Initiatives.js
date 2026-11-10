import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { initiatives } from '../data/initiatives';
import { Section, SectionTitle, groupTitleLink } from './ui';

// The last word and the arrow share one nowrap span, so the arrow never wraps onto a line alone.
function Title({ title }) {
  const words = title.split(' ');
  const last = words.pop();
  return (
    <span className={`text-lg font-semibold ${groupTitleLink}`}>
      {words.join(' ')}{' '}
      <span className="whitespace-nowrap">
        {last}
        <ArrowRight
          size={18}
          aria-hidden="true"
          className="ml-1 inline-block align-text-bottom transition-transform group-hover:translate-x-1"
        />
      </span>
    </span>
  );
}

const Initiatives = () => (
  <Section name="initiatives" id="initiatives">
    <SectionTitle>Projects and Initiatives</SectionTitle>
    <p className="mb-8 mt-3 max-w-[60ch] text-body">
      Students, researchers and policy leaders work together in three workstreams to improve nutrition in Nepal.
    </p>
    <ul className="nf-stagger grid border-t border-line lg:grid-cols-3 lg:gap-8">
      {initiatives.map(({ id, title, img, width, height }) => (
        <li key={id}>
          <Link
            to={`/initiatives/${id}`}
            className="group flex min-h-[80px] items-center gap-4 border-b border-line py-3 lg:border-b-0 lg:py-5"
          >
            <img
              loading="lazy"
              src={img}
              alt=""
              width={width}
              height={height}
              className="h-14 w-14 shrink-0 border border-line object-cover transition-transform duration-300 group-hover:scale-105 md:h-16 md:w-16"
            />
            <Title title={title} />
          </Link>
        </li>
      ))}
    </ul>
  </Section>
);

export default Initiatives;
