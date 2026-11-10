import { faFacebookF, faInstagram, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export const email = 'info@nutfellowship.com';
export const emailHref = `mailto:${email}`;

export const socials = [
  { name: 'Facebook', href: 'https://www.facebook.com/nutfellowship/', icon: faFacebookF },
  { name: 'Instagram', href: 'https://www.instagram.com/nutfellowship/?hl=en', icon: faInstagram },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/nutfellowship/', icon: faLinkedinIn },
  { name: 'X', href: 'https://x.com/nutfellowship', icon: faXTwitter },
];

// Nepal is the only chapter with content. The other chapters have their own page that says "Coming soon".
export const chapters = [
  { id: 'nepal', label: 'Nepal', href: '/#country-chapter' },
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
  { href: '/#country-chapter', label: 'Chapter', children: chapters },
  { href: '/#thoughts', label: 'Contact Us' },
];
