import { resources } from './resources';

const folder = (id) => resources.find((resource) => resource.id === id);
const campPhotos = (name) => folder('data-camp').photos.filter(({ src }) => src.includes(`/${name}`));
const campSummary = (college) =>
  `A Data Camp is a one-day session where nutrition students work on real national data and check how far Nepal is from its nutrition targets. This one was at ${college}.`;
const campLinks = [{ href: '/resources/data-camp', label: 'Data Camp agenda, slides and photos' }];

// `date` is month/day/year. The newest event comes last. `img` is the card photo: a 960px copy in thumbs/.
// An event with `photos`, `documents` or `summary` shows them on its page at /events/<id>. One without shows its card photo.
export const events = [
  { id: 'first-meet', date: '08/01/2024', img: '/Recentevents/thumbs/1st meet.jpg', title: 'Nutrition Fellowship for Nepal: First Meet' },
  { id: 'strategic-planning', date: '12/26/2024', img: '/Recentevents/thumbs/2nd meet.jpg', title: 'Strategic Planning for Fellowship Meet' },
  {
    id: 'data-camp-padma-kanya',
    date: '01/02/2025',
    img: '/Recentevents/thumbs/Pk data camp.jpg',
    title: 'Nutrition Data Camp : at Padma Kanya College',
    summary: campSummary('Padma Kanya College'),
    photos: campPhotos('homescience'),
    links: campLinks,
  },
  {
    id: 'data-camp-cafodat',
    date: '01/05/2025',
    img: '/Recentevents/thumbs/CAFODAT data camp.jpg',
    title: 'Nutrition Data Camp : at CAFODAT College',
    summary: campSummary('CAFODAT College'),
    photos: campPhotos('cafodat'),
    links: campLinks,
  },
  {
    id: 'second-meet',
    date: '01/17/2025',
    img: '/Recentevents/thumbs/Meet_and_Greet_12.jpg',
    title: '2nd Nutrition Fellowship for Nepal Meet',
    summary: folder('jan-17-documents').summary,
    pointsTitle: folder('jan-17-documents').pointsTitle,
    points: folder('jan-17-documents').points,
    photos: folder('jan-17-documents').photos,
    documents: folder('jan-17-documents').documents,
    links: [{ href: folder('jan-17-documents').driveHref, label: 'More files in Google Drive' }],
  },
  {
    id: 'data-camp-mmihs',
    date: '01/20/2025',
    img: '/Recentevents/thumbs/DC-mmihs1.jpg',
    title: 'Nutrition Data Camp : at MMIHS',
    summary: campSummary('MMIHS'),
    photos: campPhotos('mmihs'),
    links: campLinks,
  },
  { id: 'canva-workshop-batch-1', date: '02/19/2025', img: '/Recentevents/thumbs/canvabatch1.jpg', title: 'Canva Workshop among different colleges: Batch 1' },
];

/** "01/17/2025" becomes "17 January 2025". */
export const longDate = (date) => {
  const [month, day, year] = date.split('/').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

/** The photos an event page shows: its own, or the card photo. The card photo is 960px wide, enough for the page. */
export const eventImages = ({ photos, img }) => photos ?? [{ src: img, thumb: img }];
