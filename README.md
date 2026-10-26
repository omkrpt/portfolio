# Portfolio website

Static portfolio for Omkar Pote, hosted on GitHub Pages at https://www.omkarpote.com/.

## Retro design

The site uses a warm cream and plum palette with coral, teal, and pastel project
covers. Pixelify Sans supplies the pixel headings; Chakra Petch is used for the
body text. Both font families are served locally from assets/fonts/retro,
with their open-source licenses included in that folder.

Dark mode is the default. The header's sun/moon icon switches between dark
and the original light palette and remembers the choice in this browser. The
saved choice is applied before the stylesheet loads to avoid a light flash.
If browser storage is unavailable, switching still works for the current page.
Only the large name heading has extra letter spacing.

The active presentation is assets/css/retro.css and assets/js/retro.js. There is
no build step or JavaScript dependency. The responsive layout includes a mobile
menu, project filters, always-visible research details, visible keyboard focus,
and reduced-motion support. Without JavaScript, navigation and all projects
remain available. Older template assets are retained but are no longer loaded.

## Local preview and the Snake video

Open index.html directly to browse the site. In this local-file preview, Snake's
video appears as a play link that opens YouTube in a new tab when clicked.

To preview the inline player over HTTP, open a terminal in the portfolio-master
folder and run:

```sh
python3 preview.py
```

The launcher serves this folder on your computer and opens the HTTP preview.
Stop it with Ctrl+C. Python 3 is required; no additional packages.
If port 8000 is occupied, run `python3 preview.py --port 0` to choose a free port.
Use `--no-open` if you prefer to open the printed URL yourself.

HTTP previews and the hosted site keep the inline Snake player, with a small
"Watch on YouTube" link below it. That link opens a new tab when clicked and is
available if the embedded player shows Error 153 or cannot play. Nothing opens
automatically.

YouTube Error 153 means its player did not receive an acceptable HTTP Referer
or equivalent client identification. The local-file play link avoids relying
on an embed in that environment; it does not change YouTube's playback checks.
The HTTP preview and hosted player retain the recommended Referrer-Policy.

Official YouTube guidance:
https://developers.google.com/youtube/iframe_api_reference#onError
https://developers.google.com/youtube/terms/required-minimum-functionality

## Uploading the site

Upload index.html, the assets and images folders, favicon, robots.txt, sitemap.xml,
and CNAME together, preserving their relative paths. Keep the existing CV files.
preview.py is a local convenience only and is not a production backend.

## Search and sharing metadata

- Descriptive title and description; canonical URL matching CNAME.
- Open Graph and Twitter sharing metadata with the new pixel portrait.
- WebSite, ProfilePage, Person, and ImageObject JSON-LD based on visible content.
- robots.txt and a sitemap containing the canonical homepage.
- Correct manifest names, theme colors, and icon paths.

The site is static; no server application is needed for these features. DNS,
hosting redirects, HTTPS settings, and Google Search Console are managed outside
this source package. Search Console submission and search-engine indexing have
not been performed. If the domain changes, update CNAME, canonical/social URLs,
JSON-LD, robots.txt, and sitemap.xml together.

The EDBT service claim was removed from the website. The bundled PDF/LaTeX CV files
were left untouched, as requested; they still need that separate correction.
Project artwork prompts are recorded in ARTWORK.txt.

## Pixel artwork

The final supplied portrait is used unchanged as images/headshot-pixel.png. The
original photos are retained. Skills use eight dedicated, simplified pixel
sprites in images/skills/; they are not scaled copies of project art. Project
illustrations sit on distinct pastel covers with a subtle square grid.
The Primary Interests icon is a small pixel compass; its editable SVG source
is included beside the PNG. Favicons use the header's Pixelify `op.` monogram,
with a cream face, plum lettering, and coral offset edge. SVG, PNG, and ICO
versions are included for browsers and home-screen shortcuts.
Earlier generation prompts and the final portrait note are in ARTWORK.txt.
