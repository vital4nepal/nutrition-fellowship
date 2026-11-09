# Nutrition Fellowship

Website for the Nutrition Fellowship, live at https://nutfellowship.com.

The site is a single-page React app. It shows the fellowship's initiatives, events, announcements, a document repository, blogs, a newsletter, a research article and a policy page.

## Stack

- React 18 with Create React App (`react-scripts` 5)
- React Router 7 for the pages
- Tailwind CSS 3 and plain CSS files for the styles
- Lucide and Font Awesome for icons

## Run it on your computer

Use Node 20 or newer.

```
npm ci
npm start
```

The site opens at http://localhost:3000.

## Build it

```
npm run build
```

The build writes the finished site to `build/`. To check it, run `npx serve -s build`.
The `-s` flag makes every address load `index.html`, which the router needs.

## Folders

| Path | What it holds |
| --- | --- |
| `src/App.js` | The routes and the home page layout |
| `src/components/` | One file per page section, with its CSS |
| `src/documents/` | The blog, newsletter, research and policy pages |
| `public/` | Images, PDFs, `index.html`, favicon and `manifest.json` |
| `tailwind.config.js` | Tailwind setup, scans `src/` |

## Routes

| Address | Page |
| --- | --- |
| `/` | Home |
| `/profile` | Newsletter profile |
| `/policy2025` | Policy 2025 |
| `/aiinnutrition` | Research: AI in nutrition |
| `/nfn2ndmeetblog` | Blog: second meeting |
| `/nrcinternblog` | Blog: NRC intern |

## Deploy

Cloudflare Pages builds the site from the `main` branch. Each push to `main` starts a new deployment.

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `build` |
| Node version | 20 (set `NODE_VERSION` if the build fails on Node) |

The domain `nutfellowship.com` uses Cloudflare DNS. Both `nutfellowship.com` and `www.nutfellowship.com` point at the Pages project.

## Notes

- The `build/` folder is not in Git. Cloudflare builds it on each deployment.
- The "Place your thoughts" form posts to Web3Forms. The Web3Forms access key is in `src/components/Thoughts.js`.
- Add secrets to a `.env` file. Git ignores it. Never commit a key.
