// Each initiative has its own page at /initiatives/<id>. One without `page` shows "Coming soon".
// The Gen-N page is from the Data Camp agenda in the Data Camps folder on the fellowship Google Drive.
export const initiatives = [
  {
    id: 'gen-n',
    title: 'Gen-N Initiatives',
    img: '/Initiatives/thumbs/Gen-N.png',
    width: 141,
    height: 128,
    page: {
      intro:
        'Gen-N puts nutrition students to work on real national data. The first program is the Data Camp, a one-day session where students check how far Nepal is from its nutrition targets.',
      photos: [
        { src: '/hero/data-camp-cafodat.jpg', caption: 'Data Camp at CAFODAT College, January 2025' },
        { src: '/hero/data-camp-mmihs.jpg', caption: 'Data Camp at MMIHS, January 2025' },
      ],
      goals: [
        'Find the sources of nutrition data in Nepal, and open them.',
        'Read nutrition indicators and what they measure.',
        'Know the national and international nutrition commitments.',
        'Check the progress of each commitment against its target.',
        'Write recommendations from the analysis.',
      ],
      steps: [
        { title: 'Map the targets', text: 'Students list the nutrition goals, commitments and targets they know, then find them in the national surveys and plans.' },
        { title: 'Check the data', text: 'Two teams take three indicators each and find the baseline, the target and the current status in the 2016 and 2022 NDHS.' },
        { title: 'Learn the method', text: 'A short session on outcomes, indicators, SMART targets and the results-based management framework.' },
        { title: 'Recommend', text: 'The teams present. The group discusses what is required to reach the targets that are still pending.' },
      ],
      link: {
        href: '/resources/data-camp',
        label: 'Data Camp agenda, photos and slides',
      },
    },
  },
  { id: 'advocacy', title: 'Advocacy and Campaigns', img: '/Initiatives/thumbs/Advocacy.png', width: 163, height: 128 },
  { id: 'technology', title: 'Technology in Nutrition', img: '/Initiatives/thumbs/TechInNut.png', width: 256, height: 128 },
];
