# Architecture

## Overview

The site is a single-page React app built with Create React App. There is no server code and no database.
Cloudflare Pages serves the static `build/` folder.

```
Browser -> Cloudflare (DNS, CDN) -> Cloudflare Pages (build/ from main)
                                  -> Web3Forms (contact form POST)
                                  -> tile.openstreetmap.org (map tiles, chapter pages only)
```

## Routing

`src/App.js` defines the routes with React Router `BrowserRouter`.

- `/` renders the home page sections in order: the hero slideshow, About, the survey cards, D4N,
  the initiatives, the document list, Events, the updates block and Thoughts. Most of them are in `App.js`.
- `/initiatives/:id` renders `InitiativePage`. `/chapters/:id` renders `ChapterPage`.
- `ChapterPage` loads `ChapterMap` with `React.lazy`. Leaflet and the border data are in that chunk, so the home page does not load them.
- `/resources` renders `ResourcesPage`. `/resources/:id` renders `ResourcePage` and `/events/:id` renders `EventPage`. Both are in `ContentPage.js`.
- The files from Google Drive live in `public/resources/`. The two report PDFs live in `public/document_pdfs/`. No link on the site opens a Drive folder as the main action.
- `/nutrition-dashboard` renders `ExternalRedirect`, which sends the visitor to the dashboard site. Cloudflare Pages does the same for a direct visit, from `public/_redirects`.
- Five old inner pages render `ComingSoon`. Every unknown address renders `NotFound`.

Cloudflare Pages returns `index.html` for unknown paths, so a direct visit to a route works.

## Scroll and navigation

- `ScrollToHash` lands a hash link such as `/#d4n` on its section after render. It saves the scroll position
  for Back and Forward.
- `Navbar` marks the current section with an `IntersectionObserver`. The Chapter item is a dropdown. Its route
  links use `Link`, so they open without a reload.

## Styles

- Tailwind with a fixed palette and no border radius, set in `tailwind.config.js`.
- Global rules and scroll animations are in `src/index.css`. Fonts load from Fontsource in `src/index.js`. Card and menu animations are in `tailwind.config.js`.
- Sections fade in on scroll with CSS `animation-timeline: view()`. A browser without support shows them
  without the animation.
- `prefers-reduced-motion` turns every animation off.

## Images

- Hero photos have a 1600px file and an `-800` file. Collage tiles have a 1000px file and a `-500` file.
  `srcSet` and `sizes` pick the smaller file on phones.
- A resource photo has a 1400px file, an `-800` file, and in `thumbs/` a 480px file and a `-192` strip file.
  An event card photo in `Recentevents/thumbs/` has a 960px file and a `-640` file. The Dr. RP Bichha
  highlight and the Technology in Nutrition initiative have a `-128` square crop.
- A `sizes` value must match the real slot width. Measure the slot at 390, 768, 1024 and 1280px before you change it.
- The page logo is `public/nf-logo-128.png`. `public/nf-logo.png` stays for the touch icon and outside links.
  The favicon is `public/nf-favicon.png`.
- The social marks are inline SVG in `src/data/site.js`. The site loads no icon font and no icon library besides Lucide.
- The first photo of a folder page and the first card of `/resources` load at high priority.

## External services

| Service | Use | Where |
| --- | --- | --- |
| Cloudflare Pages | Hosting and previews | Project `nut-fellowship` |
| Web3Forms | Contact form | `src/components/Thoughts.js` (public client key) |
| IFPRI | D4N registration | `d4n.registerHref` in `src/data/site.js` |
| OpenStreetMap | Map tiles from `tile.openstreetmap.org`, no key | `src/components/ChapterMap.js` |

The OpenStreetMap tile policy applies: keep the credit on the map, send a `Referer` header and do not download tiles in bulk.
A Content Security Policy must allow `img-src https://tile.openstreetmap.org` for the tiles.
