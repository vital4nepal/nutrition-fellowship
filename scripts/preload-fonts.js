/**
 * Runs after `react-scripts build` (the npm "postbuild" step).
 * The build gives each font file a hashed name, so public/index.html cannot name it.
 * This adds a preload link for the two latin text fonts to build/index.html,
 * so the browser fetches them with the CSS instead of after the script renders the page.
 * Usage: node scripts/preload-fonts.js
 */
const fs = require('fs');
const path = require('path');

const build = path.join(__dirname, '..', 'build');
const media = fs.readdirSync(path.join(build, 'static', 'media'));

const links = ['public-sans-latin-wght-normal', 'source-serif-4-latin-wght-normal'].map((name) => {
  const file = media.find((entry) => entry.startsWith(`${name}.`) && entry.endsWith('.woff2'));
  if (!file) throw new Error(`Font file not found in build/static/media: ${name}`);
  return `<link rel="preload" href="/static/media/${file}" as="font" type="font/woff2" crossorigin>`;
});

const indexPath = path.join(build, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');
if (!html.includes('</head>')) throw new Error('build/index.html has no </head>');
fs.writeFileSync(indexPath, html.replace('</head>', `${links.join('')}</head>`));
