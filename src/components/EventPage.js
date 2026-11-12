import React from 'react';
import { useParams } from 'react-router-dom';
import { eventImages, events, longDate } from '../data/events';
import ContentPage from './ContentPage';
import NotFound from './NotFound';

/** /events/:id. An unknown id shows the 404 page. */
function EventPage() {
  const { id } = useParams();
  const event = events.find((item) => item.id === id);
  if (!event) return <NotFound />;

  const { title, date, summary, pointsTitle, points, documents, links } = event;
  return (
    <ContentPage
      key={id}
      section="Events"
      backTo={{ to: '/#events', label: 'Events and Updates' }}
      title={title}
      description={summary ?? `${title}, ${longDate(date)}.`}
      date={longDate(date)}
      summary={summary}
      pointsTitle={pointsTitle}
      points={points}
      images={eventImages(event)}
      documents={documents}
      links={links}
    />
  );
}

export default EventPage;
