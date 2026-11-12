# Partner logos

Drop logo files here (SVG, PNG, WebP or JPG). Each one is bundled and appears in the
Partners slider on the home page automatically, named after its file
(`example-health-logo.svg` → "Example Health").

To set the exact name (used as the logo's alt text), the order, or a link, add an entry to
`partners` in `src/data/content.js`:

```js
{ name: 'Example Health', logo: 'Example-Health-Logo.svg', href: 'https://example.com' },
```

`logo` must match a file in this folder (letter case doesn't matter). The slider shows logos
only: an entry whose file can't be found is skipped, and a warning naming the missing file
appears in the browser console while running `npm run dev`.

Tips

- SVG or a transparent PNG/WebP works best. Logos sit on a light tile in both themes.
- Logos are shown up to 52px tall; a wide logo around 400×120px (or any SVG) looks crisp.
- Logos show in greyscale and turn to full colour on hover.
