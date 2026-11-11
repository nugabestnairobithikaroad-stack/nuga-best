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
