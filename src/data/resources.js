// Each entry is one group of files, with a card on /resources and a page at /resources/<id>.
// A group from a Drive folder has `driveHref` and its files are in public/resources/<folder>/. Spreadsheets with
// participant names and costs, videos and large decks stay in Drive only. A photo has a 1400px file (longest side)
// and a smaller copy in thumbs/. `imageKind` names the images when they are not photos.
// `alt` describes what the image shows. A photo without one gets a sentence with the page title and its number.
const photo = (dir, name, alt) => ({ src: `/resources/${dir}/${name}.jpg`, thumb: `/resources/${dir}/thumbs/${name}.jpg`, alt });

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
      { title: 'Meeting agenda', description: 'The goals, the schedule and the facilitators of the evening.', file: '/resources/jan17/docs/jan-17-agenda.pdf', kind: 'PDF', size: '4.0 MB' },
      { title: 'Nutrition Fellowship brief', description: 'The vision, the five pillars and how to join.', file: '/resources/jan17/docs/jan-17-brief.pdf', kind: 'PDF', size: '0.1 MB' },
      { title: 'Spotlight Series', description: 'Profiles of the nutrition champions from the Spotlight Series.', file: '/resources/jan17/docs/jan-17-spotlight-series.pdf', kind: 'PDF', size: '0.4 MB' },
      { title: 'Meet and Greet', description: 'Profiles of the professionals at the Meet and Greet.', file: '/resources/jan17/docs/jan-17-meet-and-greet.pdf', kind: 'PDF', size: '0.5 MB' },
      { title: 'Team and Guidance Group', description: 'The team and the guidance group of the Fellowship.', file: '/resources/jan17/docs/jan-17-team-and-guidance-group.pdf', kind: 'PDF', size: '3.7 MB' },
    ],
    photos: [
      photo(
        'jan17',
        'flyer',
        'Flyer: Join the 2nd Nutrition Fellowship for Nepal Meet. Highlights: Spotlight Series, Intergenerational Dialogue, Empowering the Next Generation, Advocacy in Action. When: 17th January, 5:00 PM to 6:15 PM. Where: to be confirmed. RSVP: nutfellowship@gmail.com. A QR code links to the WhatsApp group.',
      ),
      ...[
        'Slide with the meet title, 17 January 2025 in Kathmandu, and the three objectives of the meet: co-create areas for collaboration, share the experiences of nutrition leaders, and support upcoming professionals.',
        'Collage titled "Gone but never forgotten: nutrition legends", for Olga D. Murray (1925 to 2024) and Dr. Prakash Sundar Shrestha (1950 to 2024). It shows an older woman with two smiling children, a man speaking, and a standing crowd with heads bowed.',
        'Collage titled "Spotlight: Nutrition legends". It shows a seated audience, two men speaking at a microphone, and an older woman with her hands joined in greeting.',
        'Collage titled "Students leading the Fellowship". It shows students speaking at a podium, a group of seven seated at a table, and an older woman speaking beside a student.',
        'Collage titled "A mosaic of cherished interactions". It shows guests talking in small groups, a man asking a question, and a crowded hall with paper lanterns.',
        'Group photo titled "Five Generations of Nutrition in one frame". About thirty people stand and kneel in two rows in an outdoor courtyard.',
        'Slide titled "Meet and Greet: achievers-students mentoring and interactions", with portraits of three speakers: Shakun Sharma, Sujay Nepali and Indu Sharma.',
        'Thank-you slide: "Thank You for Making the Event Remarkably Successful!", with a heart, folded hands and "170+ participants".',
      ].map((alt, index) => photo('jan17', `collage-${index + 1}`, alt)),
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
      { title: 'Data Camp agenda', description: 'The sessions of the day, who leads each one and the materials.', file: '/resources/data-camp/docs/data-camp-agenda.pdf', kind: 'PDF', size: '0.1 MB' },
      { title: 'Data Camp presentation', description: 'The slides of the Data Camp.', file: '/resources/data-camp/docs/data-camp-presentation.pptx', kind: 'PPTX', size: '5.9 MB' },
      { title: 'Goal and objectives', description: 'The goal and the objectives of the Data Camp.', file: '/resources/data-camp/docs/data-camp-goal-and-objectives.pptx', kind: 'PPTX', size: '0.1 MB' },
    ],
    photos: [
      ['cafodat1', 'Students sit at desks with laptops in a classroom while two people stand in front of them.'],
      ['cafodat2', 'A small group gathers around a laptop on a desk in a classroom, with other participants standing behind.'],
      ['cafodat3', 'A group of participants poses for a photo in a classroom, with a projector screen and a CAFODAT sign behind them.'],
      ['mmihs1', 'A presenter stands beside a projector screen in a classroom while students sit at long tables and listen.'],
      ['homescience1', 'A presenter points at a projected spreadsheet while rows of students sit and watch.'],
      ['homescience2', 'A presenter stands in front of a projected spreadsheet and a whiteboard, with students at desks in the foreground.'],
      ['homescience3', 'A man stands and speaks to a seated classroom of students, with a projector on the ceiling.'],
      ['homescience4', 'A presenter points at a projected spreadsheet in front of a whiteboard.'],
    ].map(([name, alt]) => photo('data-camp', name, alt)),
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
    photos: [
      photo(
        'reports',
        'newsletter',
        'Preview of the Newsletter: the Nutrition Fellowship logo, the line "Nepal free from the effects of undernutrition & overnutrition", and the five pillars: Convene, Celebrate, Collaborate, Connect and Coach. It ends with a QR code and the contact nutfellowship@gmail.com.',
      ),
      photo(
        'reports',
        'nutrition-profiles',
        'Preview of the World Health Assembly target profile on stunting in Nepal. Nepal committed to cut stunting by 40% by 2025, from 47% to 24%. 25% of children are still stunted. It also shows a line chart, a map by province and five calls to action.',
      ),
    ],
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
