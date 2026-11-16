import { d4n } from './site';

// What each chapter page says. A pin sits on the capital and lists what the Fellowship did or plans in that city.
// The place of an event is the capital of its country. Change `pins` when the owner gives a more exact place.
export const chapterPages = {
  nepal: {
    status: 'The first chapter of the Fellowship.',
    pins: [
      {
        city: 'Kathmandu',
        lines: ['Fellowship meets, Data Camps and Canva workshops for students.'],
        link: { href: '/#events', label: 'See the events' },
      },
    ],
  },
  bangladesh: {
    status: 'The chapter is coming soon.',
    pins: [
      {
        city: 'Dhaka',
        lines: [
          'Strategy meeting with JPG-SPH, BRAC University.',
          'WHA assessment camp in Bangladesh University of Health Sciences.',
        ],
        link: { href: '/', label: 'See the photo and the clip in the slideshow' },
      },
    ],
  },
  'sri-lanka': {
    status: 'The chapter is coming soon.',
    pins: [
      {
        city: 'Colombo',
        lines: [`D4N 2026 Learning Lab, ${d4n.labDate}, ${d4n.venue}.`],
        link: { href: '/#d4n', label: 'See the Learning Lab' },
      },
    ],
  },
  pakistan: {
    status: 'The chapter is coming soon.',
    pins: [
      {
        city: 'Islamabad',
        lines: ['No Fellowship event here yet.'],
      },
    ],
  },
};
