# Components

All components are in `src/components/`. Each home page section is one file.

## Layout

| File | What it does |
| --- | --- |
| `Topbar.js` | Sticky header with the logo, the name and the nav |
| `Navbar.js` | Desktop nav with the Chapter dropdown, and the mobile menu |
| `Footer.js` | Logo, useful links, social links, email and copyright |
| `ui.js` | Shared parts: `Section`, `SectionTitle`, `SubTitle`, `SiteLink`, `container` and link classes |
| `ScrollToHash.js` | Lands hash links on their section and restores scroll on Back and Forward |

## Home page sections

| File | Section |
| --- | --- |
| `Hero.js` | Title, slideshow with the collage slide, About under it, and the survey and D4N cards with Key Highlights/Alerts beside |
| `About.js` | Tabs for Our Vision and Value Proposition, then Our Reach with its four figures |
| `CoverpageRight.js` | Key Highlights/Alerts list |
| `SurveyDashboard.js` | The four survey themes as cards. Skills are computed from the counts, the other three are typed findings |
| `D4N.js` | D4N 2026 Learning Lab: details, register link, session plan, organizers, flyer |
| `Initiatives.js` | Links to each initiative page |
| `Repository.js` | Document list. A report title opens its page and the icon downloads the PDF |
| `Events.js` | Recent events row. It scrolls sideways and each card links to `/events/:id` |
| `NextEvent.js`, `Announcements.js` | Upcoming events and announcements, both through `EntryList.js` |
| `Thoughts.js` | Contact form, sent to Web3Forms |
| `SocialLinks.js` | Social icon links from `socials` in `src/data/site.js` |

## Pages

| File | Page |
| --- | --- |
| `InitiativePage.js` | `/initiatives/:id` |
| `ChapterPage.js` | `/chapters/:id`: the chapter name, "Coming soon." and the map. The map frame keeps its height while the map loads |
| `ChapterMap.js` | A Leaflet street map of one country: OpenStreetMap tiles, the borders from `chapterBorders.json` and a pin on the capital. The mouse wheel zooms, and a drag on a phone moves the map, only after a click or a tap on the map |
| `ChapterMap.css` | Leaflet controls in the site tokens, and the gray tone of the tiles |
| `Pie.js` | A share drawn as a pie. The survey cards use it |
| `ResourcesPage.js` | `/resources`: one card for each entry in `resources` |
| `ResourcePage.js` | `/resources/:id`: passes one entry of `resources` to `ContentPage` |
| `EventPage.js` | `/events/:id`: passes one entry of `events` to `ContentPage` |
| `ContentPage.js` | The shared page: carousel, summary, key points, document cards and links |
| `PhotoCarousel.js` | One large image and a thumbnail strip. Arrow keys, buttons, thumbnails and swipe change the image |
| `ExternalRedirect.js` | `/nutrition-dashboard`: sends the visitor to another site |
| `ComingSoon.js` | Placeholder for a page with no content yet. Exports `SITE_TITLE` |
| `NotFound.js` | The 404 page, with links to the most visited sections |

## Slideshow rules

- The first slide loads first. The other slides wait until it loads.
- Autoplay starts after every slide loads. It stops on hover, on Pause and on a Previous or Next click.
- A collage tile stays hidden until its photo loads, then fades in.
- A clip slide is a muted video with a poster. It plays from the start each time its slide shows. A visitor who asks for reduced motion sees the poster until they press Play.
- A visitor who asks for reduced motion starts with the slideshow stopped.
