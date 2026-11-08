# A Little World for Ankiii

A birthday microsite in plain HTML, CSS and JavaScript. No build step, no dependencies, no network calls: fonts, art and photos are all local.

## Run it

```bash
python3 -m http.server 4173      # then open http://localhost:4173
```

## Deploy (static hosting)

- **Netlify**: drag the project folder onto https://app.netlify.com/drop. Done.
- **Vercel**: `npx vercel --prod` from this folder (framework preset: *Other*, no build command, output directory `.`).
- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / `(root)`. The site is then live at `https://<user>.github.io/<repo>/`. All paths are relative, so a sub-path works.

## How it's organised

| File | Role |
| --- | --- |
| `index.html` | All content, including the letter and postscript (unchanged, word for word). |
| `src/styles.css` | The original base styles. |
| `src/craft.css` | The refinement layer: self-hosted fonts, ink hibiscus, hero, scrapbook photos, letter typography, viewer, mobile. |
| `src/app.js` | Original interactions (archive, memories, UNC court, envelope, wish, sound, photo viewer). |
| `src/craft.js` | Flower blooming, plant-a-flower garden, print reveal, viewer fade and preload. |
| `fonts/` | Cormorant Garamond, DM Sans and Caveat (OFL-licensed, Latin subset, woff2). |
| `art/tiger-hibiscus.png` | The original illustration, untouched. |
| `photos/` | Original photographs, untouched. Never filtered or cropped. |

## Adding photos

Drop the original file into `photos/<collection>/`, then copy any `<figure>` inside the matching `.spread` in `index.html`. Set `src`, `alt`, `width` and `height` (the file's real pixel size), the caption, and the layout variables on the figure: `--ds`/`--dc` are the start column and span on desktop (12 columns), `--ms`/`--mc` the same on mobile (6 columns), `--r` the tilt and `--y` a vertical nudge. Give it the next `data-photo` number in document order so the viewer's counter stays right.

## Notes

- Sound is off until the visitor turns it on.
- `prefers-reduced-motion` turns off all non-essential animation; everything stays visible.
- The photo viewer uses the native `<dialog>` element: Escape, arrow keys, swipe, and focus return are handled.
