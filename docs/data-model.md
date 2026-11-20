# Data model

The content data is in `src/data/`. Components read it. There is no API.

## `site.js`

| Export | Shape | Use |
| --- | --- | --- |
| `email`, `emailHref` | string | Contact address and its `mailto:` link |
| `socials` | `{ name, href, viewBox, path }[]` | Footer social links. `viewBox` and `path` draw the mark |
| `d4n` | `{ registerHref, theme, conferenceDates, labDate, labTime, venue }` | D4N card and section |
| `chapters` | `{ id, label, href }[]` | Chapter dropdown and `/chapters/:id` |
| `navLinks` | `{ href, label, children? }[]` | Nav. A link with `children` opens a menu |

## `pulseSurvey.js`

The counts come from the Student Pulse Survey analysis sheets. Only totals are stored, never single answers.

| Export | Shape |
| --- | --- |
| `countries` | `{ id, label, respondents }[]` in the order Nepal, Bangladesh, Sri Lanka, Pakistan |
| `skills` | `{ id, label, counts[4] }[]`. Students picked more than one, so the counts do not add up |
| `themes` | The four dashboard cards in order. Only `skills` is computed from the counts. The others are findings typed from the owner's website updates document |

Each `counts` array follows the order of `countries`. Percentages are computed, never stored.

## `chapterPages.js`

`chapterPages` is an object by chapter id (`nepal`, `bangladesh`, `sri-lanka`, `pakistan`). Each entry is `{ capital, at }`: the name of the capital and its `[latitude, longitude]`. The map puts the pin there.

## `chapterBorders.json`

One entry for each chapter id. Every point is `[latitude, longitude]` with three decimals.

| Key | Content |
| --- | --- |
| `bounds` | The box of the country. The first view fits it |
| `limit` | The box a visitor can pan in. The neighbour lines end at this box |
| `land` | The country outline, one ring for the mainland and one for each island |
| `inner` | The internal borders, as lines |
| `neighbours` | The borders and coasts of the neighbour countries, as lines |

The lines come from Natural Earth 10m admin-1 states and provinces (public domain), simplified. A shared border is in the file once.
Sri Lanka shows the nine provinces, joined from the districts of the source. Pakistan shows F.A.T.A. as part of Khyber Pakhtunkhwa.
The source is old for two countries: Nepal shows the 14 zones from before 2015, and Bangladesh has no Mymensingh division.

## `initiatives.js`

`initiatives` is a list of `{ id, title, img, width, height, page? }`.

- An initiative without `page` shows "Coming soon" at `/initiatives/<id>`.
- `page` holds `{ intro, photos[], goals[], steps[], link }`. The Gen-N page uses it.

## `resources.js`

- `resources` is a list of `{ id, title, date?, description, summary, pointsTitle, points[], cover, coverFocus?, imageKind?, driveHref?, documents[], photos[] }`. Each entry has a card on `/resources` and a page at `/resources/<id>`.
- An entry from a Google Drive folder has `driveHref`, and its files are copied into `public/resources/<folder>/`.
- A document is `{ title, description, file, kind, size }`. A photo is `{ src, thumb, strip, srcSet }`: a large file (1400px on the longest side), a 480px copy in `thumbs/`, a `-192` strip copy in `thumbs/` and a `srcSet` of the 480px, `-800` and 1400px files.
- Spreadsheets with participant names or costs, videos and large decks stay in Drive only.
- `dashboard` is `{ title, href }`. `/nutrition-dashboard` sends the visitor to `href`. Change `public/_redirects` too.

## `events.js`

- `events` is a list of `{ id, date, img, title, summary?, pointsTitle?, points?, photos?, documents?, links? }`. `date` is month/day/year.
- Each event has a page at `/events/<id>`. Without `photos` the page shows the card photo, and without `summary` it says more is coming soon.

## Add or change content

- A new document or photo: copy the file into `public/resources/<folder>/` and add it to `resources`. Resize a photo first.
- Make the two extra photo files with `sips`, from the 1400px file:
  - `sips --resampleWidth 800 -s formatOptions 72 <name>.jpg --out <name>-800.jpg`
  - `sips --resampleHeight 128 -s formatOptions 72 <name>.jpg --out thumbs/<name>-192.jpg`
- Content for an event: add `summary`, `photos` or `documents` to its entry in `events`.
- A new survey count: edit the `counts` array. Keep the country order.
- A new initiative page: add a `page` object to its entry.
- A new chapter page: add an entry to `chapters` with `href: '/chapters/<id>'`.
