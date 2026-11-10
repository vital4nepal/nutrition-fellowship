# Nutrition Fellowship

The website of the Nutrition Fellowship, live at https://nutfellowship.com.

The fellowship is a network of nutrition students and professionals in Nepal and South Asia. The site shows the
Student Pulse Survey results, the D4N 2026 Learning Lab, the initiatives, the country chapters, events and documents.

## Stack

- React 18 with Create React App (`react-scripts` 5)
- React Router 7
- Tailwind CSS 3
- Lucide and Font Awesome icons
- Cloudflare Pages for hosting

## Run it

Use Node 20 or newer.

```
npm ci
npm start
```

The site opens at http://localhost:3000.

## Build it

```
npm run build
npx serve -s build
```

The build writes the site to `build/`. The `-s` flag sends every address to `index.html`, which the router needs.

## Pages

| Address | Page |
| --- | --- |
| `/` | Home |
| `/initiatives/:id` | One initiative. `gen-n` has content; the others show "Coming soon" |
| `/chapters/:id` | One country chapter. `nepal` goes to the home page section; the others show "Coming soon" |
| `/profile`, `/policy2025`, `/aiinnutrition`, `/nfn2ndmeetblog`, `/nrcinternblog` | "Coming soon" |
| any other address | Page not found |

## Change the content

Most text and numbers live in `src/data/`. Edit them there, not in the components.

| To change | Edit |
| --- | --- |
| Email, social links, nav, chapters, D4N date and register link | `src/data/site.js` |
| Pulse Survey counts | `src/data/pulseSurvey.js` |
| Initiatives and the Gen-N page | `src/data/initiatives.js` |
| Hero slides and collage | `slides` in `src/components/Hero.js` |

## Deploy

Cloudflare Pages builds `main` on each push. Every other branch gets a preview at
`https://<branch>.nut-fellowship.pages.dev`.

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `build` |
| Node version | 20 |

## More

- [Architecture](docs/architecture.md)
- [Components](docs/components.md)
- [Data model](docs/data-model.md)
