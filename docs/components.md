# Components

All components are in `src/components/`, except the parts that only the home page uses. Those are in `src/App.js`.

## Layout

| File | What it does |
| --- | --- |
| `App.js` | The routes, the maintenance banner (`Maintenance`), the sticky header and the footer with the social links |
| `Navbar.js` | Desktop nav with the Country Chapters dropdown, and the mobile menu |
| `ui.js` | Shared parts: `Section`, `SectionTitle`, `SubTitle`, `SiteLink`, `container`, link classes, `primaryButton` (the one green button fill), `SITE_TITLE`, `useDocumentTitle` (title, description and canonical link of a route) and `prefersReducedMotion` |
| `ScrollToHash.js` | Lands hash links on their section and restores scroll on Back and Forward |

## Home page sections

`src/App.js` holds the hero slideshow (with `Collage` and `Clip`), the survey cards (with `SkillStats` and `Pie`), the D4N 2026 Learning Lab, the initiatives, the document list and the updates block. The sections with their own state have their own file.

| File | Section |
| --- | --- |
| `About.js` | Tabs for Our Vision and Value Proposition, then Our Reach with its four figures |
| `Events.js` | Recent events row. It scrolls sideways and each card links to `/events/:id` |
| `EntryList.js` | The upcoming events and announcements lists |
| `Thoughts.js` | Contact form, sent to Web3Forms |
| `Ticker.js` | `useTicker`: the count-up of the figures |

## Pages

| File | Page |
| --- | --- |
| `InitiativePage.js` | `/initiatives/:id` |
| `ChapterPage.js` | `/chapters/:id`: the chapter name, "Coming soon." and the map. The map frame keeps its height while the map loads |
| `ChapterMap.js` | A Leaflet street map of one country: OpenStreetMap tiles, the borders from `chapterBorders.json` and a pin on the capital. The mouse wheel zooms, and a drag on a phone moves the map, only after a click or a tap on the map |
| `ChapterMap.css` | Leaflet controls in the site tokens, and the gray tone of the tiles |
| `ResourcesPage.js` | `/resources`: one card for each entry in `resources` |
| `ContentPage.js` | The shared page: carousel, summary, key points, document cards and links. Exports `ResourcePage` (`/resources/:id`) and `EventPage` (`/events/:id`) |
| `Slideshow.js` | The home page slideshow and `PhotoSlideshow`. Exports `arrowKeys` and `useSwipe`, which `PhotoCarousel.js` uses too |
| `PhotoCarousel.js` | One large image, a row of buttons under it and a thumbnail strip. Arrow keys, buttons, thumbnails and swipe change the image |
| `ExternalRedirect.js` | `/nutrition-dashboard`: sends the visitor to another site |
| `ComingSoon.js` | Placeholder for a page with no content yet |
| `NotFound.js` | The 404 page, with links to the most visited sections |

## Slideshow rules

- Below lg the caption and the buttons sit in a bar under the photos. From lg they sit over the photo.
- The first slide loads first. The other slides wait until it loads.
- Autoplay starts after every slide loads. It stops on hover, on Pause and on a Previous or Next click.
- A collage tile stays hidden until its photo loads, then fades in.
- A clip slide is a muted video with a poster. It plays from the start each time its slide shows. A visitor who asks for reduced motion sees the poster until they press Play.
- A visitor who asks for reduced motion starts with the slideshow stopped.
