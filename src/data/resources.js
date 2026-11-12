// Each entry is one group of files. It has a card on /resources and its own page at /resources/<id>.
// A group from a Google Drive folder has `driveHref` and its files are copied into public/resources/<folder>/.
// Files that stay only in Drive are not copied: spreadsheets with participant names and costs, videos and large decks.
// A photo has a 1400px file and a 480px file in thumbs/. `imageKind` names the images when they are not photos.
const photo = (dir, name) => ({ src: `/resources/${dir}/${name}.jpg`, thumb: `/resources/${dir}/thumbs/${name}.jpg` });
const range = (count) => Array.from({ length: count }, (_, index) => index + 1);

export const resources = [
  {
    id: 'jan-17-documents',
    title: 'Jan 17 Documents',
    date: '17 January 2025',
    description: 'The 2nd Nutrition Fellowship for Nepal Meet: the agenda, the profiles and the photos.',
    summary:
      'The 2nd Nutrition Fellowship for Nepal Meet brought three generations of nutrition champions together: trailblazers, current leaders and aspiring professionals. The evening held a Spotlight Series on five nutrition champions, a dialogue across generations, and a campaign road map for 30 years of Vitamin A in Nepal and the work of the FCHVs.',
    pointsTitle: 'Goals of the meet',
    points: [
      'Find areas to work on together.',
      'Share the experiences of nutrition leaders.',
      'Understand and support the goals of upcoming professionals.',
    ],
    cover: photo('jan17', 'meet-and-greet-18'),
    driveHref: 'https://drive.google.com/drive/folders/11yDaiLP9wzxMpP1vY4zqsY3uewHR__oO?usp=drive_link',
    documents: [
      { title: 'Meeting agenda', description: 'The goals, the schedule and the facilitators of the evening.', file: '/resources/jan17/docs/agenda.pdf', kind: 'PDF', size: '4.0 MB' },
      { title: 'Nutrition Fellowship brief', description: 'The vision, the five pillars and how to join.', file: '/resources/jan17/docs/brief.pdf', kind: 'PDF', size: '0.1 MB' },
      { title: 'Spotlight Series', description: 'Profiles of the nutrition champions from the Spotlight Series.', file: '/resources/jan17/docs/spotlight-series.pdf', kind: 'PDF', size: '0.4 MB' },
      { title: 'Meet and Greet', description: 'Profiles of the professionals at the Meet and Greet.', file: '/resources/jan17/docs/meet-and-greet.pdf', kind: 'PDF', size: '0.5 MB' },
      { title: 'Team and Guidance Group', description: 'The team and the guidance group of the Fellowship.', file: '/resources/jan17/docs/team-and-guidance-group.pdf', kind: 'PDF', size: '3.7 MB' },
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
    description: 'One-day sessions where students work on real national nutrition data: the agenda, the slides and the photos.',
    summary:
      'A Data Camp is a one-day session where nutrition students work on real national data. They find the sources, read the indicators, check how far Nepal is from its nutrition targets and write recommendations.',
    pointsTitle: 'Goals of the camp',
    points: [
      'Find the sources of nutrition data in Nepal, and open them.',
      'Understand the national and international nutrition commitments.',
      'Learn how to analyse a target and come up with recommendations.',
    ],
    cover: photo('data-camp', 'cafodat1'),
    driveHref: 'https://drive.google.com/drive/folders/1_PZuUUcI1jwHlIVtsgN01VcXAdH8B8PO?usp=drive_link',
    documents: [
      { title: 'Data Camp agenda', description: 'The sessions of the day, who leads each one and the materials.', file: '/resources/data-camp/docs/agenda.pdf', kind: 'PDF', size: '0.1 MB' },
      { title: 'Data Camp presentation', description: 'The slides of the Data Camp.', file: '/resources/data-camp/docs/presentation.pptx', kind: 'PPTX', size: '5.9 MB' },
      { title: 'Goal and objectives', description: 'The goal and the objectives of the Data Camp.', file: '/resources/data-camp/docs/goal-and-objectives.pptx', kind: 'PPTX', size: '0.1 MB' },
    ],
    photos: [
      'cafodat1', 'cafodat2', 'cafodat3', 'mmihs1', 'homescience1', 'homescience2', 'homescience3', 'homescience4',
    ].map((name) => photo('data-camp', name)),
  },
  {
    id: 'reports',
    title: 'Reports',
    description: 'The Fellowship brief and the stunting profile of Nepal.',
    summary:
      'Short reports from the Fellowship. The newsletter is the Fellowship brief: the vision and the five pillars. The nutrition profile shows where Nepal stands on stunting against its World Health Assembly target.',
    pointsTitle: 'In the nutrition profile',
    points: [
      'Nepal committed to cut stunting by 40% by 2025, from 47% to 24%.',
      'In the latest figures, 25% of children are still stunted.',
    ],
    cover: photo('reports', 'nutrition-profiles'),
    coverFocus: '50% 12%',
    imageKind: 'preview',
    documents: [
      { title: 'Newsletter', description: 'The Fellowship brief: the vision and the five pillars.', file: '/document_pdfs/Nutrition Fellowship Brief.pdf', kind: 'PDF', size: '0.1 MB' },
      { title: 'Nutrition Profiles', description: 'World Health Assembly target profile: stunting in Nepal.', file: '/document_pdfs/Stunting profile.pdf', kind: 'PDF', size: '0.4 MB' },
    ],
    photos: [photo('reports', 'newsletter'), photo('reports', 'nutrition-profiles')],
  },
];

/** "51 photos, 5 documents" */
export const contentsLabel = ({ photos, documents, imageKind = 'photo' }) => {
  const count = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
  return `${count(photos.length, imageKind)}, ${count(documents.length, 'document')}`;
};

// The dashboard is a separate app. /nutrition-dashboard sends the visitor to it. Change the address in public/_redirects too.
export const dashboard = {
  title: 'Nutrition Dashboard',
  href: 'https://nutrition-dashboard-vision.vercel.app/',
};
