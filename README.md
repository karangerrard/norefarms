# Nore Farms — stage 1

React + Vite + TypeScript. Only the navigation and hero are implemented.

## Run

Requires a compatible Node.js installation (tested with Node 22).

```sh
npm install
npm run dev
```

Production: `npm run build`. Preview: `npm run preview`.

## Verification in the delivery environment

Strict TypeScript checking passed. Dependencies were installed with lifecycle scripts skipped because this environment blocks child processes. The Vite build was attempted but its esbuild subprocess was blocked with `spawn EPERM`; production output is therefore not verified. Browser automation also failed to initialise, so desktop/mobile rendering and interactions still require browser review. On your machine, use a normal `npm install` followed by `npm run build` and `npm run dev`.

## Enable enquiries

Copy `.env.example` to `.env.local`. Set `VITE_WHATSAPP_NUMBER` to the confirmed business number including country code, without spaces. Restart Vite. Without a valid number, enquiry buttons are intentionally disabled rather than pointing to a fabricated business contact. This client-side variable is public; do not put secrets here.

## Design

Gold #d5b058, charcoal #3b3a37, off-white #fcfbfb. Manrope headlines and DM Sans body, loaded from Google Fonts with system fallbacks. The hero displays only the left bottle from the supplied Nore Farms photograph, centred over a pale gold shape and fine orbit. A CSS crop hides the second bottle without changing the original JPEG or packaging label. CSS multiply blending softens the white photographic background against the page.

## Scope and behaviour

- Sticky responsive navigation, expandable mobile menu with Escape/outside dismissal.
- One focused milk hero using the supplied Nore Farms photograph. The previous sample-product carousel has been replaced by this centred composition.
- The product enters with a short rise, subtle rotation and fade, then drifts gently. A Pause motion control stops the continuous movement. Reduced-motion preferences disable spatial animations.
- The secondary hero button leads to a short milk enquiry note within the hero.
- Products, Our story and Contact navigation items are disabled until those sections are implemented. Replace them with section anchors in the corresponding build stages.
- No catalogue, product detail pages, footer, cart, checkout or backend has been added.

## Where to edit

- `src/components/Hero.tsx`: hero copy, image reference and animation parameters.
- `src/config/site.ts`: business configuration.
- `src/lib/whatsapp.ts`: product-specific enquiry messages.
- `src/components/Header.tsx` and `Header.module.css`: navigation.
- `src/components/Hero.tsx` and `Hero.module.css`: hero.
- `src/styles/tokens.css`: shared brand tokens.
- `src/App.tsx`: append future sections beneath Hero.

Before launch: supply approved logo and photographs, verify copy and contact number, confirm production URL and social preview image, and complete mobile/browser accessibility review. Ecommerce platform and rendering decisions belong to the next phase; these components and content can be reused, but payments and orders require separate integration.

## Readable source

All React, TypeScript, CSS, JSON and HTML source is formatted with two-space indentation. Run `npm run format` to format changes or `npm run format:check` to check consistency. Prettier is included as a development dependency.
