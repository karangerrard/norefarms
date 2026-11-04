# Nore Farms — landing page

React + Vite + TypeScript. Includes the landing page and dedicated milk, paneer and ghee detail pages.

## Run

Requires a compatible Node.js installation (tested with Node 22).

```sh
npm install
npm run dev
```

Production: `npm run build`. Preview: `npm run preview`.

## GitHub Pages deployment

The project now uses GitHub Actions, replacing the earlier branch `/docs` approach. Keep package.json and package-lock.json at the repository root. Commit `.github/workflows/deploy.yml` and the updated `vite.config.ts`. In Settings > Pages set Source to GitHub Actions, then push to main or manually run the workflow. The workflow builds and publishes only dist. Do not replace the source index.html with generated HTML. The base `/norefarms/` assumes the repository is named norefarms. If needed, configure the public VITE_WHATSAPP_NUMBER repository Actions variable before building; local .env.local is not uploaded.

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
- Products, About us and Contact navigation links scroll to the matching sections. The mobile menu closes on selection, and the target section receives keyboard focus.
- Exactly three product cards show milk, paneer and ghee. Images, names and View product buttons open dedicated detail pages, with separate product-specific WhatsApp enquiry links. No prices, cart or checkout are included.
- About Us uses the latest screenshot's off-white, oversized stacked-heading and rounded-photo composition with original Nore Farms copy. The farm scene is clearly labelled illustrative, not represented as the client's actual farm.
- Contact and footer show only configured details. Until a phone or email is supplied, an enquiry-launch message is shown instead of invented details.
- Section reveals and hover treatments respect reduced-motion preferences.

## Where to edit

- `src/components/Hero.tsx`: hero copy, image reference and animation parameters.
- `src/config/site.ts`: business configuration.
- `src/data/products.ts`: product names, images and descriptions.
- `src/data/productDetails.ts`: product facts; milk data transcribed and visually checked against the supplied V4 PDF. Paneer/ghee facts remain unconfirmed.
- `src/components/products/`: shared responsive product detail layout and styles.
- `products/*/index.html`: three Vite HTML entry points. These produce real static pages, so direct links and refresh work on GitHub Pages without a fallback router.
- `src/components/BrandLogo.tsx`: reusable original logo extracted from the PDF. The extraction is a high-resolution crop of the label artwork, not a recreated logo.
- `src/components/sections/`: Products, About Us, Contact and shared section styles.
- `src/lib/whatsapp.ts`: product-specific enquiry messages.
- `src/components/Header.tsx` and `Header.module.css`: navigation.
- `src/components/Hero.tsx` and `Hero.module.css`: hero.
- `src/styles/tokens.css`: shared brand tokens.
- `src/App.tsx`: append future sections beneath Hero.

Before launch: supply approved logo and photographs, verify copy and contact number, confirm production URL and social preview image, and complete mobile/browser accessibility review. Ecommerce platform and rendering decisions belong to the next phase; these components and content can be reused, but payments and orders require separate integration.

### Content still needed

- Confirm the WhatsApp number, service area and business hours. Customer-care phone and email have been transcribed from the supplied label into `src/config/site.ts`; the phone is not assumed to support WhatsApp.
- Supply approved paneer and ghee images; the current pack shots are illustrative placeholders and are labelled as such.
- Replace the illustrative farm scene with approved brand photography.
- Approve the About Us copy and supply any genuine sourcing facts before adding claims.
- Supply valid social and privacy URLs; absent links are not rendered.

## Product label source and remaining approvals

Milk facts come from `Nore-CowMilkLabel-Artwork-V4.pdf`: 1 litre, pasteurised cow's milk, milk allergen, fat 3.50%, SNF 8.3%, storage below 4°C, and the nutrition table as printed. The original PDF is included in `public/documents/` for the product-page link. Percentages are reproduced, not recalculated. Manufacturing/use-by dates and prices were blank on the artwork and are not invented. Paneer and ghee use the same detail-page layout but explicitly await their own confirmed ingredients, nutrition, allergens, pack sizes and storage instructions. They do not inherit milk nutrition values.

The source artwork logo is extracted into `public/brand/nore-farms-logo.png`, also used in navigation, footer, About Us and product detail galleries. The supplied bottle image contains a different earlier logo design; update the bottle photography with approved final packaging when available.

## Readable source

All React, TypeScript, CSS, JSON and HTML source is formatted with two-space indentation. Run `npm run format` to format changes or `npm run format:check` to check consistency. Prettier is included as a development dependency.
