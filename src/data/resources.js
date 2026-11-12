// Each group is one Google Drive folder, copied into public/resources/<id>/.
// A photo has a 1400px file and a 480px file in thumbs/. Files that stay only in Drive are not copied: spreadsheets with
// participant names and costs, videos and large decks. `driveHref` leads to the whole folder.
const photo = (dir, name) => ({ src: `/resources/${dir}/${name}.jpg`, thumb: `/resources/${dir}/thumbs/${name}.jpg` });
const range = (count) => Array.from({ length: count }, (_, index) => index + 1);

export const resources = [
  {
    id: 'jan-17-documents',
    title: 'Jan 17 Documents',
    description: 'The documents and photos from the 2nd Nutrition Fellowship meeting.',
    driveHref: 'https://drive.google.com/drive/folders/11yDaiLP9wzxMpP1vY4zqsY3uewHR__oO?usp=drive_link',
    documents: [
      { title: 'Meeting agenda', file: '/resources/jan17/docs/agenda.pdf', kind: 'PDF', size: '4.0 MB' },
      { title: 'Nutrition Fellowship brief', file: '/resources/jan17/docs/brief.pdf', kind: 'PDF', size: '0.1 MB' },
      { title: 'Spotlight Series', file: '/resources/jan17/docs/spotlight-series.pdf', kind: 'PDF', size: '0.4 MB' },
      { title: 'Meet and Greet', file: '/resources/jan17/docs/meet-and-greet.pdf', kind: 'PDF', size: '0.5 MB' },
      { title: 'Team and Guidance Group', file: '/resources/jan17/docs/team-and-guidance-group.pdf', kind: 'PDF', size: '3.7 MB' },
    ],
    photos: [
      photo('jan17', 'flyer'),
      ...range(8).map((n) => photo('jan17', `collage-${n}`)),
      ...[
        18, 19, 37, 46, 47, 49, 50, 51, 52, 53, 54, 60, 61, 62, 64, 65, 66, 67, 68, 69, 71, 72, 73, 74, 75, 77, 78, 80,
        81, 82, 83, 84, 85, 86, 89, 90, 91, 92, 93, 97, 99, 100,
      ].map((n) => photo('jan17', `meet-and-greet-${n}`)),
    ],
  },
  {
    id: 'data-camp',
    title: 'Data Camps',
    description: 'The agenda, slides and photos from the Data Camps.',
    driveHref: 'https://drive.google.com/drive/folders/1_PZuUUcI1jwHlIVtsgN01VcXAdH8B8PO?usp=drive_link',
    documents: [
      { title: 'Data Camp agenda', file: '/resources/data-camp/docs/agenda.pdf', kind: 'PDF', size: '0.1 MB' },
      { title: 'Data Camp presentation', file: '/resources/data-camp/docs/presentation.pptx', kind: 'PPTX', size: '5.9 MB' },
      { title: 'Goal and objectives', file: '/resources/data-camp/docs/goal-and-objectives.pptx', kind: 'PPTX', size: '0.1 MB' },
    ],
    photos: [
      'cafodat1', 'cafodat2', 'cafodat3', 'mmihs1', 'homescience1', 'homescience2', 'homescience3', 'homescience4',
    ].map((name) => photo('data-camp', name)),
  },
];

// The dashboard is a separate app. /dashboard shows it inside the site.
export const dashboard = {
  title: 'Nutrition Dashboard',
  description: 'The Nutrition Dashboard of Nepal.',
  href: 'https://nutrition-dashboard-vision.vercel.app/',
};
