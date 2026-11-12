import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { events, longDate } from '../data/events';
import { Section, SectionTitle, SubTitle, groupTitleLink } from './ui';

const arrowButton =
  'flex h-11 w-11 items-center justify-center border border-line-strong text-ink transition-colors hover:border-green hover:text-green aria-disabled:cursor-default aria-disabled:opacity-40 aria-disabled:hover:border-line-strong aria-disabled:hover:text-ink';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** The row of event cards. It scrolls sideways and each card snaps to the left edge. Every card is a link to its page. */
function Events() {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  // The arrows use aria-disabled, not disabled: a disabled button drops the keyboard focus.
  const step = (direction) => {
    if (direction < 0 ? edge.start : edge.end) return;
    const card = track.current.firstElementChild;
    track.current.scrollBy({
      left: direction * card.getBoundingClientRect().width,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  const onScroll = ({ currentTarget }) =>
    setEdge({
      start: currentTarget.scrollLeft < 1,
      end: currentTarget.scrollLeft + currentTarget.clientWidth >= currentTarget.scrollWidth - 1,
    });

  return (
    <Section name="events" id="events" padding="pb-10 pt-12 lg:pb-12 lg:pt-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <SectionTitle>Events and Updates</SectionTitle>
          <SubTitle className="mt-2">Recent Events</SubTitle>
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous events" aria-disabled={edge.start} onClick={() => step(-1)} className={arrowButton}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next events" aria-disabled={edge.end} onClick={() => step(1)} className={arrowButton}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul
        ref={track}
        onScroll={onScroll}
        className="-mx-3 mt-8 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {events.map(({ id, date, img, title }) => (
          <li key={id} className="w-full shrink-0 snap-start px-3 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <Link to={`/events/${id}`} className="group block focus-visible:-outline-offset-2">
              <img
                loading="lazy"
                decoding="async"
                src={img}
                alt=""
                className="aspect-[3/2] w-full object-cover transition-opacity group-hover:opacity-90"
              />
              <p className="mt-3 text-meta tabular-nums text-muted">{longDate(date)}</p>
              <p className={`mt-1 line-clamp-2 text-body font-semibold text-ink ${groupTitleLink}`}>{title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Events;
