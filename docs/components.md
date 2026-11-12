# Components

All components are in `src/components/`. Each home page section is one file.

## Layout

| File | What it does |
| --- | --- |
| `Topbar.js` | Sticky header with the logo, the name and the nav |
| `Navbar.js` | Desktop nav with the Chapter dropdown, and the mobile menu |
| `Footer.js` | Logo, useful links, social links, email and copyright |
| `ui.js` | Shared parts: `Section`, `SectionTitle`, `SubTitle`, `container` and link classes |
| `ScrollToHash.js` | Lands hash links on their section and restores scroll on Back and Forward |

## Home page sections

| File | Section |
| --- | --- |
| `Hero.js` | Title, slideshow with the collage slide, About tabs, the survey and D4N cards, Key Highlights |
| `About.js` | Value Proposition and Our Vision tabs, and the figures strip |
| `CoverpageRight.js` | Key Highlights list |
| `SurveyDashboard.js` | Student Pulse Survey charts with a country filter |
| `D4N.js` | D4N 2026 Learning Lab: details, register link, session plan, organizers, flyer |
| `Initiatives.js` | Links to each initiative page |
| `CountryChapter.js` | The Nepal chapter and the steps to start a chapter |
| `Repository.js` | Document list with view and download links |
| `Events.js` | Recent events carousel (`react-slick`) |
| `NextEvent.js`, `Announcements.js` | Upcoming events and announcements, both through `EntryList.js` |
| `Thoughts.js` | Contact form, sent to Web3Forms |
| `SocialLinks.js` | Social icon links from `socials` in `src/data/site.js` |

## Pages

| File | Page |
| --- | --- |
| `InitiativePage.js` | `InitiativePage` for `/initiatives/:id` and `ChapterPage` for `/chapters/:id` |
| `ResourcesPage.js` | `/resources`: for each entry in `resources`, a document list and a photo grid |
| `DashboardPage.js` | `/dashboard`: the dashboard iframe and the "Open full screen" link |
| `ComingSoon.js` | Placeholder for a page with no content yet. Exports `SITE_TITLE` |
| `NotFound.js` | The 404 page, with links to the most visited sections |

## Slideshow rules

- The first slide loads first. The other slides wait until it loads.
- Autoplay starts after every slide loads. It stops on hover, on Pause and on a Previous or Next click.
- A collage tile stays hidden until its photo loads, then fades in.
- A visitor who asks for reduced motion starts with the slideshow stopped.
