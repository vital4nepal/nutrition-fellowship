# Nutrition Fellowship

The website of the Nutrition Fellowship, live at https://nutfellowship.com.

The fellowship is a network of nutrition students and professionals in Nepal and South Asia. The site shows the
Student Pulse Survey results, the D4N 2026 Learning Lab, the initiatives, the country chapters, events and documents.

## Stack

- React 18 with Create React App (`react-scripts` 5)
- React Router 7
- Tailwind CSS 3
- Lucide icons, and inline SVG for the social marks
- Public Sans and Source Serif 4 through Fontsource
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

## More

- [Architecture](docs/architecture.md)
- [Components](docs/components.md)
- [Data model](docs/data-model.md)
