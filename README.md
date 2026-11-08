# A Little World for Ankiii

A responsive birthday microsite built with semantic HTML, CSS, and vanilla JavaScript. The supplied tiger-and-hibiscus drawing is the recurring illustration; the photo archive uses the original photos supplied for the gift.

## Run locally

Python 3 is enough. From this folder, run:

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

Alternatively, run `npm run dev` when Node.js and npm are installed.

## What's included

- The illustrated garden, friendship archive, memory interactions, birthday letter, postscript, and final wish scene.
- A three-part photo archive with 14 photographs: **Kitchen notes**, **Art desk**, and **Ankiii, IRL**.
- Original supplied photos in `photos/kitchen/`, `photos/art/`, and `photos/moments/`, without filters or destructive edits.
- A full-screen photo viewer with previous/next controls, keyboard arrows, Escape to close, and mobile swipe navigation.
- Sound off by default and `prefers-reduced-motion` support.

## Add more photographs

When more photos arrive, add the original files under the appropriate `photos/` folder, then add entries to the matching panel in `index.html`. Give each photo trigger the next sequential `data-photo` index. The shared viewer reads the image path, alt text, and caption from the photo entries automatically.

## Deploy

Deploy the contents of this folder as a static site on Netlify, Cloudflare Pages, GitHub Pages, or any static web host. Set the publish directory to the project root. There is no server-side runtime or package installation required.

## Notes

- The project is dependency-free and uses the browser's native `<dialog>` element for the photo viewer.
- Google Fonts are loaded externally; system font fallbacks are included.
- Sound is off by default. The optional ambience starts only after a visitor enables it.
