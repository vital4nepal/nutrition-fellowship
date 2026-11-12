# Data model

The content data is in `src/data/`. Components read it. There is no API.

## `site.js`

| Export | Shape | Use |
| --- | --- | --- |
| `email`, `emailHref` | string | Contact address and its `mailto:` link |
| `socials` | `{ name, href, icon }[]` | Footer social links |
| `d4n` | `{ registerHref, conference, conferenceDates, labDate, labTime, venue }` | D4N card and section |
| `chapters` | `{ id, label, href }[]` | Chapter dropdown and `/chapters/:id` |
| `navLinks` | `{ href, label, children? }[]` | Nav. A link with `children` opens a menu |

## `pulseSurvey.js`

The counts come from the Student Pulse Survey analysis sheets. Only totals are stored, never single answers.

| Export | Shape |
| --- | --- |
| `countries` | `{ id, label, respondents }[]` in the order Nepal, Bangladesh, Sri Lanka, Pakistan |
| `jobConfidence`, `sdgOutlook` | `{ id, label, counts[4] }[]`. One answer per student, so the counts add up to `respondents` |
| `skills`, `challenges` | `{ id, label, counts[4] }[]`. Students picked more than one, so the counts do not add up |
| `ALL` | The id for all countries |
| `countFor(row, countryId)` | The count of one answer for one country or for `ALL` |
| `respondentsFor(countryId)` | The number of students for one country or for `ALL` |

Each `counts` array follows the order of `countries`. Percentages are computed, never stored.

## `initiatives.js`

`initiatives` is a list of `{ id, title, img, width, height, page? }`.

- An initiative without `page` shows "Coming soon" at `/initiatives/<id>`.
- `page` holds `{ intro, photos[], goals[], steps[], link }`. The Gen-N page uses it.

## `resources.js`

- `resources` is a list of `{ id, title, description, image, href }`. Each entry is one Google Drive folder on `/resources`.
- `dashboard` is `{ title, description, href }`. `/dashboard` shows `href` in an iframe.

## Add or change content

- A new Drive folder: add an entry to `resources`. The folder must be shared as "anyone with the link".
- A new survey count: edit the `counts` array. Keep the country order.
- A new initiative page: add a `page` object to its entry.
- A new chapter page: add an entry to `chapters` with `href: '/chapters/<id>'`.
