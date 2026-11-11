# Nuga Best Thika Road website

A lightweight, responsive website built with HTML, CSS and JavaScript. No framework, build step, or paid dependencies are required.

## Launch

1. Unzip the project.
2. Open `index.html` to preview locally.
3. Upload the contents of this folder to a GitHub repository.
4. Enable GitHub Pages in repository **Settings → Pages → Deploy from a branch → main / root**.
5. Wait for GitHub to publish the site, then visit the Pages URL.

## Before going live

- **WhatsApp:** Edit `script.js`, setting `CONFIG.whatsappNumber` to your verified business WhatsApp number, in international format without a plus sign, e.g. `2547XXXXXXXX`. The enquiry and booking buttons will then open prefilled WhatsApp messages. No bookings are confirmed automatically.
- **Prices:** The E5 Foot Massager has conflicting prices in the supplied reference images: KES 137,800 vs KES 140,400. The current site uses KES 137,800 (from the clean second price list). Confirm and change if necessary. The NM2500 price was not supplied, so its price is on enquiry.
- **Photos:** The product and hero photos were extracted from the user's supplied low-resolution reference screenshots, and are compressed for a light download. Some product photos are labelled illustrative and others have visual placeholders to avoid presenting the wrong item as genuine. Replace them with your own high-resolution, approved product and centre photographs before launch. To change a photo, replace the appropriate file in `assets/`, or update the image path in `script.js`.
- **Opening hours:** Not confirmed. The website asks customers to enquire about session availability instead of publishing unverified hours.
- **Official contact information:** Add your verified phone, email, session price and booking availability when ready.
- **Medical claims:** Copy is intentionally framed around general comfort and wellness; do not publish unsubstantiated therapeutic or medical claims.
- **Trademark:** This is a local centre website, not a representation that the centre is the corporate manufacturer.

## Contents
- `index.html` — all six sections / routes
- `styles.css` — responsive styling and mobile layout
- `script.js` — products, search, category filtering, contact form, booking enquiry and WhatsApp handling
- `assets/` — compressed source-reference images

## Editing the catalogue

Open `script.js`, find the `products` array and edit each object's `name`, `category`, `price`, `description`, or `img`. Prices are numbers without commas. For unknown prices, use `null`.

The site uses hash navigation (`#shop`, `#therapy` etc.), compatible with static GitHub Pages hosting and with no server configuration.


## Product photo accuracy (important)

The site lists all 11 products from the customer-supplied price lists. The bundled photographs are small reference crops from the customer's own supplied website-design screenshots (not verified original high-resolution studio photography). Images are provided for N5, NM2500, NM90 and E5 only. Other models intentionally use labelled placeholders rather than misleading substitute images. Hero photography is also reference artwork from supplied screenshots, not documentation of the actual Thika Road centre.

To replace a product photograph with your original authorised high-resolution file: put an optimised WebP image in `assets/` (for example `t20.webp`), then find that model in the `products` array in `script.js` and replace `img:null` with `img:'assets/t20.webp'`. For N5, NM2500, NM90 and E5, you can replace the existing files with better original photographs under the same filenames. Use originals from your own Facebook page or obtain distributor permission before commercial publication. Use WebP 1000–1400px wide, ideally under 200 KB per product.

**Prices requiring business confirmation:** E5 is KES 137,800 in one supplied list and KES 140,400 in the other. NM2500 has no supplied price. **WhatsApp configuration:** add the verified number to `CONFIG.whatsappNumber` in `script.js`.


## Animation update (November 2026)

The website now features varied motion: staggered homepage text, floating wellness callout, soft background movement, scroll-reveal sections (four directions/scales), product hover zoom, feature-card lift, animated filter chips, smooth page entrances, modal transitions, and a scroll progress indicator. All run in native CSS/JavaScript without heavy animation libraries. `prefers-reduced-motion` is supported. No new product photos were invented or added.


## Visual upgrade (11 November 2026)
Package scenes are AI-generated illustrations (not evidence of actual centre or specific products). Product reference crops have been sharpened within their original resolution limits. Exact unverified product photos are replaced with polished illustrations rather than wrong-equipment images. Upload genuine HD authorised product photographs to replace all unverified artwork before commercial launch. No package pricing, treatment promises or availability have been invented.


## Clarity revision
Screenshot-derived product photographs have been cropped to remove captured webpage captions and adjusted for contrast. This improves presentation but cannot restore missing original detail. Products lacking verified model photos now have clearly labelled vector illustrations specific to their product type. Package images remain illustrative. Do not substitute the illustrations for genuine product photos without review.
