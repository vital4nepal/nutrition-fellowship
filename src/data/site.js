import {
    faFacebookF,
    faInstagram,
    faLinkedinIn,
    faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

// The build reads REACT_APP_MAINTENANCE.
// The value "true" turns the maintenance page on. Any other value or none turns it off.
export const maintenance = process.env.REACT_APP_MAINTENANCE === 'true';

export const siteUrl = 'https://nutfellowship.com';

export const email = 'info@nutfellowship.com';
export const emailHref = `mailto:${email}`;

export const socials = [
    { name: 'Facebook', href: 'https://www.facebook.com/nutfellowship/', icon: faFacebookF },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/nutfellowship/?hl=en',
        icon: faInstagram,
    },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/nutfellowship/', icon: faLinkedinIn },
    { name: 'X', href: 'https://x.com/nutfellowship', icon: faXTwitter },
];

// The D4N 2026 Learning Lab, from the event flyer.
// The register link is where the flyer's QR code leads.
export const d4n = {
    registerHref: 'https://southasia.ifpri.info/d4n-2026-register/',
    theme: 'A Workforce Fit to Deliver for Nutrition in South Asia',
    conferenceDates: '30 November to 3 December 2026',
    labDate: '30 November 2026',
    labTime: '13:45 to 15:00 (LKT)',
    venue: 'Shangri-La Hotel, Colombo, Sri Lanka',
};

// Each chapter has its own page at /chapters/<id>.
// The capital for the map pin is in chapterPages.js.
export const chapters = [
    { id: 'nepal', label: 'Nepal', href: '/chapters/nepal' },
    { id: 'bangladesh', label: 'Bangladesh', href: '/chapters/bangladesh' },
    { id: 'sri-lanka', label: 'Sri Lanka', href: '/chapters/sri-lanka' },
    { id: 'pakistan', label: 'Pakistan', href: '/chapters/pakistan' },
];

// A link with `children` opens a menu. Its own href is the section the menu belongs to.
export const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#aboutus', label: 'About Us' },
    { href: '/#initiatives', label: 'Initiatives' },
    { href: '/#events', label: 'Events' },
    { href: '/#country-chapter', label: 'Country Chapters', children: chapters },
    { href: '/#thoughts', label: 'Contact Us' },
];
