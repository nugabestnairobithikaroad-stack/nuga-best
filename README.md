# Nuga Best Thika Road — Complete WhatsApp Website

This is a static, six-page, GitHub Pages-ready website for Nuga Best Thika Road. It has a VIP navy-and-gold theme, a promotional homepage image, real supplied product catalogue images, WhatsApp ordering and manual appointment enquiries.

## Publish

Upload **all contents of this folder** to the GitHub Pages publishing folder, keeping `index.html` at the site root. Preserve `assets/`, `styles.css`, `script.js`, `settings.js`, and the other `.html` pages. The official WhatsApp number in `settings.js` is `254748744688`.

## Contact details
- WhatsApp: +254 748 744 688
- Email: nugathikaroad@gmail.com
- Location (from supplied map screenshot): Thika Road, opposite Garden City Mall, after Total Petrol Station, Nairobi, Kenya
- Directions link: Google Maps search near Garden City Mall, not a verified exact rooftop pin

## Search Console — essential after publishing
The actual live website URL has not been supplied. Therefore the sitemap and canonical tags cannot yet be finalised accurately.

1. Publish the site to GitHub Pages or your own domain.
2. Run `python generate_seo_urls.py https://ACTUAL-PUBLIC-WEBSITE-URL/` locally with the **real** HTTPS base URL, including repository path if applicable (this script uses `beautifulsoup4`).
3. Upload the resulting updated HTML, `sitemap.xml` and `robots.txt` files to your published site.
4. Open https://search.google.com/search-console/ and add the correct site property, complete verification, submit the exact published `sitemap.xml` address, and request indexing for the homepage.
5. Add the same website URL and business contact details to the official Google Business Profile.

Do not invent your domain, search-console verification record, business opening hours or exact coordinates.

## Notes on images
The homepage banner is a **generated promotional image**, using the submitted N5 bed photograph as a visual reference; it is not a documentary photo of the centre or exact equipment. The N5 product card uses the supplied real bed photograph. Image generation cannot guarantee an exact product match; use an authentic photograph of a customer using the N5 if strict factual product fidelity is required.

No online payments are collected by this website. Order and booking requests are confirmed by the business through WhatsApp.


HOMEPAGE BANNER REPLACEMENT (18 Nov 2026)
- Hero artwork: assets/nuga-best-homepage-banner-hd.png, 1672 x 941 original PNG.
- Book a Session (left printed CTA) is an accessible clickable overlay linking to contact.html.
- Shop Products (right printed CTA) links to shop-products.html.
- On mobile the same overlays remain clickable, with additional accessible text buttons below the artwork.
- WhatsApp configured: +254 748 744 688.
- To publish on GitHub Pages, upload the *contents* of this folder to repository root, not the parent folder.


Latest update: added responsive auto-sliders to the Contact and Shop pages, improved animated buttons, changed email to nugathikaroad@gmail.com, and expanded the Google Maps location section.


Final slider/map correction: full-width embedded Google map of the Garden City Mall area (NOT a confirmed pin for Nuga Best); removed squeezed screenshot, deleted unwanted third contact slider slide, simplified captions, and switched sliders to supplied equipment photos.


2026-11-18 homepage update: The hero banner was replaced with the user-supplied `Nuga Best Wellness Therapy Poster(3).png` (1672×941), and the banner hotspot links plus mobile hero buttons were removed. The menu, booking page, shop page, WhatsApp checkout and SEO files remain as before.


Homepage update: Two larger functional CTA buttons are placed BELOW the unchanged banner image. Book a Session opens the contact/booking form, Shop Products opens the catalogue. All other pages and sitemap are retained. If Search Console previously verified ownership via an HTML file, DO NOT delete that verification file from your GitHub repository when updating the website.


Mobile button fix (18 Nov 2026): The homepage Book a Session and Shop Products actions are explicitly visible and display as two full-width, vertically stacked buttons beneath the banner on narrow screens. No buttons are embedded in the banner image.
