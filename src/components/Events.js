import React, { useRef } from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import { Section, SectionTitle, SubTitle } from './ui';

const events = [
  { date: '08/01/2024', img: '/Recentevents/1st meet.jpg', title: 'Nutrition Fellowship for Nepal: First Meet' },
  { date: '12/26/2024', img: '/Recentevents/2nd meet.jpg', title: 'Strategic Planning for Fellowship Meet' },
  { date: '01/02/2025', img: '/Recentevents/Pk data camp.jpg', title: 'Nutrition Data Camp : at Padma Kanya College' },
  { date: '01/05/2025', img: '/Recentevents/CAFODAT data camp.jpg', title: 'Nutrition Data Camp : at CAFODAT College' },
  { date: '01/17/2025', img: '/Recentevents/Meet_and_Greet_12.jpg', title: '2nd Nutrition Fellowship for Nepal Meet' },
  { date: '01/20/2025', img: '/Recentevents/DC-mmihs1.jpg', title: 'Nutrition Data Camp : at MMIHS' },
  { date: '02/19/2025', img: '/Recentevents/canvabatch1.jpg', title: 'Canva Workshop among different colleges: Batch 1' },
];

const settings = {
  arrows: false,
  dots: false,
  autoplay: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

const arrowButton =
  'flex h-11 w-11 items-center justify-center border border-line-strong text-ink transition-colors hover:border-green hover:text-green';

function Events() {
  const sliderRef = useRef(null);

  return (
    <Section name="events" id="events" className="pb-10 pt-12 lg:pb-12 lg:pt-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <SectionTitle>Events and Updates</SectionTitle>
          <SubTitle className="mt-2">Recent Events</SubTitle>
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous" onClick={() => sliderRef.current.slickPrev()} className={arrowButton}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next" onClick={() => sliderRef.current.slickNext()} className={arrowButton}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="-mx-3 mt-8">
        <Slider ref={sliderRef} {...settings}>
          {events.map(({ date, img, title }) => (
            <div key={title} className="px-3">
              <figure>
                <img src={img} alt="" className="aspect-[3/2] w-full object-cover" />
                <figcaption>
                  <p className="mt-3 text-meta tabular-nums text-muted">{date}</p>
                  <p className="mt-1 line-clamp-2 text-base font-semibold text-ink lg:text-body">{title}</p>
                </figcaption>
              </figure>
            </div>
          ))}
        </Slider>
      </div>
    </Section>
  );
}

export default Events;
