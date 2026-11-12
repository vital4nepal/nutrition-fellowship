import React from 'react';
import { useParams } from 'react-router-dom';
import { resources } from '../data/resources';
import ContentPage from './ContentPage';
import NotFound from './NotFound';

/** /resources/:id. An unknown id shows the 404 page. */
function ResourcePage() {
  const { id } = useParams();
  const resource = resources.find((item) => item.id === id);
  if (!resource) return <NotFound />;

  const { title, description, date, summary,pointsTitle, points, photos, imageKind, documents, driveHref } = resource;
  return (
    <ContentPage
      key={id}
      section="Resources"
      backTo={{ to: '/resources', label: 'All resources' }}
      title={title}
      description={description}
      date={date}
      summary={summary}
      pointsTitle={pointsTitle}
      points={points}
      images={photos}
      imageKind={imageKind}
      documents={documents}
      links={driveHref ? [{ href: driveHref, label: 'More files in Google Drive' }] : []}
    />
  );
}

export default ResourcePage;
