// Each entry is one group of files, with a card on /resources and a page at /resources/<id>.
// A group from a Drive folder has `driveHref` and its files are in public/resources/<folder>/.
// Spreadsheets with participant names and costs, videos and large decks stay in Drive only.
// A photo has a 1400px file (longest side), an `-800` copy 800px wide,
// and in thumbs/ a 480px copy and a `-192` copy 128px high for the strip.
// `imageKind` names the images when they are not photos.
// `alt` says what the image shows. A photo without one gets the page title and its number.
const photo = (dir, name, alt) => {
    const src = `/resources/${dir}/${name}.jpg`;
    const thumb = `/resources/${dir}/thumbs/${name}.jpg`;
    return {
        src,
        thumb,
        strip: `/resources/${dir}/thumbs/${name}-192.jpg`,
        srcSet: `${thumb} 480w, /resources/${dir}/${name}-800.jpg 800w, ${src} 1400w`,
        alt,
    };
};

export const resources = [
    {
        id: 'jan-17-documents',
        title: 'Jan 17 Documents',
        date: '17 January 2025',
        description:
            'The 2nd Nutrition Fellowship for Nepal Meet: the agenda, the profiles and the photos.',
        summary:
            'The 2nd Nutrition Fellowship for Nepal Meet brought three generations of ' +
            'nutrition champions together: trailblazers, current leaders and aspiring ' +
            'professionals. The evening held a Spotlight Series on five nutrition champions, ' +
            'a dialogue across generations, and a campaign road map for 30 years of Vitamin A ' +
            'in Nepal and the work of the FCHVs.',
        pointsTitle: 'Goals of the meet',
        points: [
            'Find areas to work on together.',
            'Share the experiences of nutrition leaders.',
            'Understand and support the goals of upcoming professionals.',
        ],
        cover: photo('jan17', 'meet-and-greet-18'),
        driveHref:
            'https://drive.google.com/drive/folders/11yDaiLP9wzxMpP1vY4zqsY3uewHR__oO?usp=drive_link',
        documents: [
            {
                title: 'Meeting agenda',
                description: 'The goals, the schedule and the facilitators of the evening.',
                file: '/resources/jan17/docs/jan-17-agenda.pdf',
                kind: 'PDF',
                size: '4.0 MB',
            },
            {
                title: 'Nutrition Fellowship brief',
                description: 'The vision, the five pillars and how to join.',
                file: '/resources/jan17/docs/jan-17-brief.pdf',
                kind: 'PDF',
                size: '0.1 MB',
            },
            {
                title: 'Spotlight Series',
                description: 'Profiles of the nutrition champions from the Spotlight Series.',
                file: '/resources/jan17/docs/jan-17-spotlight-series.pdf',
                kind: 'PDF',
                size: '0.4 MB',
            },
            {
                title: 'Meet and Greet',
                description: 'Profiles of the professionals at the Meet and Greet.',
                file: '/resources/jan17/docs/jan-17-meet-and-greet.pdf',
                kind: 'PDF',
                size: '0.5 MB',
            },
            {
                title: 'Team and Guidance Group',
                description: 'The team and the guidance group of the Fellowship.',
                file: '/resources/jan17/docs/jan-17-team-and-guidance-group.pdf',
                kind: 'PDF',
                size: '3.7 MB',
            },
        ],
        photos: [
            photo(
                'jan17',
                'flyer',
                'Flyer: Join the 2nd Nutrition Fellowship for Nepal Meet. Highlights: ' +
                    'Spotlight Series, Intergenerational Dialogue, Empowering the Next ' +
                    'Generation, Advocacy in Action. When: 17th January, 5:00 PM to 6:15 PM. ' +
                    'Where: to be confirmed. RSVP: nutfellowship@gmail.com. A QR code links ' +
                    'to the WhatsApp group.'
            ),
            ...[
                'Slide with the meet title, 17 January 2025 in Kathmandu, and the three ' +
                    'objectives of the meet: co-create areas for collaboration, share the ' +
                    'experiences of nutrition leaders, and support upcoming professionals.',
                'Collage titled "Gone but never forgotten: nutrition legends", for Olga D. ' +
                    'Murray (1925 to 2024) and Dr. Prakash Sundar Shrestha (1950 to 2024). It ' +
                    'shows an older woman with two smiling children, a man speaking, and a ' +
                    'standing crowd with heads bowed.',
                'Collage titled "Spotlight: Nutrition legends". It shows a seated audience, ' +
                    'two men speaking at a microphone, and an older woman with her hands ' +
                    'joined in greeting.',
                'Collage titled "Students leading the Fellowship". It shows students speaking ' +
                    'at a podium, a group of seven seated at a table, and an older woman ' +
                    'speaking beside a student.',
                'Collage titled "A mosaic of cherished interactions". It shows guests talking ' +
                    'in small groups, a man asking a question, and a crowded hall with paper ' +
                    'lanterns.',
                'Group photo titled "Five Generations of Nutrition in one frame". About thirty ' +
                    'people stand and kneel in two rows in an outdoor courtyard.',
                'Slide titled "Meet and Greet: achievers-students mentoring and interactions", ' +
                    'with portraits of three speakers: Shakun Sharma, Sujay Nepali and Indu ' +
                    'Sharma.',
                'Thank-you slide: "Thank You for Making the Event Remarkably Successful!", ' +
                    'with a heart, folded hands and "170+ participants".',
            ].map((alt, index) => photo('jan17', `collage-${index + 1}`, alt)),
            ...[
                18, 19, 37, 46, 47, 49, 50, 51, 52, 53, 54, 60, 61, 62, 64, 65, 66, 67, 68, 69,
                71, 72, 73, 74, 75, 77, 78, 80, 81, 82, 83, 84, 85, 86, 89, 90, 91, 92, 93, 97,
                99, 100,
            ].map((n) => photo('jan17', `meet-and-greet-${n}`)),
        ],
    },
    {
        id: 'data-camp',
        title: 'Data Camps',
        description:
            'One-day sessions where students work on real national nutrition data: ' +
            'the agenda, the slides and the photos.',
        summary:
            'A Data Camp is a one-day session where nutrition students work on real national ' +
            'data. They find the sources, read the indicators, check how far Nepal is from ' +
            'its nutrition targets and write recommendations.',
        pointsTitle: 'Goals of the camp',
        points: [
            'Find the sources of nutrition data in Nepal, and open them.',
            'Understand the national and international nutrition commitments.',
            'Learn how to analyse a target and come up with recommendations.',
        ],
        cover: photo('data-camp', 'cafodat1'),
        // Every photo has a caption, so the page shows them in the home page slideshow.
        slideshow: true,
        documents: [
            {
                title: 'Data Camp agenda',
                description: 'The sessions of the day, who leads each one and the materials.',
                file: '/resources/data-camp/docs/data-camp-agenda.pdf',
                kind: 'PDF',
                size: '0.1 MB',
            },
            {
                title: 'Data Camp presentation',
                description: 'The slides of the Data Camp.',
                file: '/resources/data-camp/docs/data-camp-presentation.pptx',
                kind: 'PPTX',
                size: '5.9 MB',
            },
            {
                title: 'Goal and objectives',
                description: 'The goal and the objectives of the Data Camp.',
                file: '/resources/data-camp/docs/data-camp-goal-and-objectives.pptx',
                kind: 'PPTX',
                size: '0.1 MB',
            },
        ],
        // Each caption says only what the photo shows.
        // The CAFODAT and MMIHS camps are from the Gen-N page.
        photos: [
            ['cafodat1', 'Facilitators guide students at their laptops, CAFODAT, January 2025'],
            ['cafodat2', 'Students and facilitators work through a session, CAFODAT, January 2025'],
            ['cafodat3', 'Participants and facilitators at the Data Camp, CAFODAT, January 2025'],
            ['mmihs1', 'Students at work around the table, MMIHS, January 2025'],
            ['homescience1', 'Students follow the data on the screen'],
            ['homescience2', 'A facilitator points out the data on the screen'],
            ['homescience3', 'A facilitator talks with the students'],
            ['homescience4', 'A facilitator walks the room through the data'],
        ].map(([name, caption]) => ({ ...photo('data-camp', name), caption })),
    },
    {
        id: 'reports',
        title: 'Reports',
        description: 'The Fellowship brief and the stunting profile of Nepal.',
        summary:
            'Short reports from the Fellowship. The Fellowship brief gives the vision ' +
            'and the five pillars. The nutrition profile shows where Nepal stands ' +
            'on stunting against its World Health Assembly target.',
        pointsTitle: 'In the nutrition profile',
        points: [
            'Nepal committed to cut stunting by 40% by 2025, from 47% to 24%.',
            'In the latest figures, 25% of children are still stunted.',
        ],
        cover: photo('reports', 'nutrition-profiles'),
        coverFocus: '50% 0%',
        imageKind: 'preview',
        documents: [
            {
                title: 'Nutrition Fellowship brief',
                description: 'The Fellowship brief: the vision and the five pillars.',
                file: '/document_pdfs/Nutrition Fellowship Brief.pdf',
                kind: 'PDF',
                size: '0.1 MB',
            },
            {
                title: 'Nutrition Profiles',
                description: 'World Health Assembly target profile: stunting in Nepal.',
                file: '/document_pdfs/Stunting profile.pdf',
                kind: 'PDF',
                size: '0.4 MB',
            },
        ],
        photos: [
            photo(
                'reports',
                'newsletter',
                'Preview of the Newsletter: the Nutrition Fellowship logo, the line "Nepal ' +
                    'free from the effects of undernutrition & overnutrition", and the five ' +
                    'pillars: Convene, Celebrate, Collaborate, Connect and Coach. It ends with ' +
                    'a QR code and the contact nutfellowship@gmail.com.'
            ),
            photo(
                'reports',
                'nutrition-profiles',
                'Preview of the World Health Assembly target profile on stunting in Nepal. ' +
                    'Nepal committed to cut stunting by 40% by 2025, from 47% to 24%. 25% of ' +
                    'children are still stunted. It also shows a line chart, a map by ' +
                    'province and five calls to action.'
            ),
        ],
    },
];

// The dashboard is a separate app. /nutrition-dashboard sends the visitor to it.
// Change the address in public/_redirects too.
export const dashboard = {
    title: 'Nutrition Dashboard',
    href: 'https://nutrition-dashboard-vision.vercel.app/',
};
