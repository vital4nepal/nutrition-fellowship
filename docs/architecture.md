# Architecture

## Overview

The site is a single-page React app built with Create React App. There is no server code and no database.
Cloudflare Pages serves the static `build/` folder.

```
Browser -> Cloudflare (DNS, CDN) -> Cloudflare Pages (build/ from main)
                                  -> Web3Forms (contact form POST)
```

## Routing

`src/App.js` defines the routes with React Router `BrowserRouter`.

- `/` renders the home page sections in order: Hero, SurveyDashboard, D4N, Initiatives, CountryChapter,
  Repository, Events, the updates block and Thoughts.
- `/initiatives/:id` and `/chapters/:id` render `InitiativePage` and `ChapterPage` from `InitiativePage.js`.
- `/resources` renders `ResourcesPage`. `/resources/:id` renders `ResourcePage` and `/events/:id` renders `EventPage`. Both use `ContentPage`.
- The files come from Google Drive and live in `public/resources/`. No link on the site opens a Drive folder as the main action.
- `/nutrition-dashboard` renders `ExternalRedirect`, which sends the visitor to the dashboard site. Cloudflare Pages does the same for a direct visit, from `public/_redirects`.
- Five old inner pages and every unknown address render `ComingSoon`.

Cloudflare Pages returns `index.html` for unknown paths, so a direct visit to a route works.

## Scroll and navigation

- `ScrollToHash` lands a hash link such as `/#d4n` on its section after render. It saves the scroll position
  for Back and Forward.
- `Navbar` marks the current section with an `IntersectionObserver`. The Chapter item is a dropdown. Its route
  links use `Link`, so they open without a reload.

## Styles

- Tailwind with a fixed palette and no border radius, set in `tailwind.config.js`.
- Global rules, fonts and animations are in `src/index.css`.
- Sections fade in on scroll with CSS `animation-timeline: view()`. A browser without support shows them
  without the animation.
- `prefers-reduced-motion` turns every animation off.

## Images

- Hero photos have a 1600px file and an `-800` file. Collage tiles have a 1000px file and a `-500` file.
  `srcSet` and `sizes` pick the smaller file on phones.
- The logo is `public/nf-logo.png`. The favicon is `public/favicon-64.png`.

## External services

| Service | Use | Where |
| --- | --- | --- |
| Cloudflare Pages | Hosting and previews | Project `nut-fellowship` |
| Web3Forms | Contact form | `src/components/Thoughts.js` (public client key) |
| IFPRI | D4N registration | `d4n.registerHref` in `src/data/site.js` |
