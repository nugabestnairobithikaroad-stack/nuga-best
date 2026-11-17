# Nuga Best Thika Road — Google Search SEO-ready website

This package contains **six real, crawlable HTML pages** rather than JavaScript-only `#` views. It retains the VIP navy/gold design, 11 products, real supplied photographs, enquiry form and booking request preparation. NM-70 is excluded.

## Pages
- `index.html` — Nuga Best Thika Road, Nairobi
- `therapy-services.html` — thermal wellness sessions, Nairobi
- `shop-products.html` — Nuga Best products and prices in Kenya
- `wellness-insights.html` — wellness educational content
- `about-us.html` — local business information
- `contact.html` — contact and booking enquiry

Each page has its own SEO title, description, on-page H1, LocalBusiness JSON-LD and social preview metadata. The product catalogue is present in the HTML for search crawlers even before JavaScript runs. Product category search/filter still work in the browser.

## IMPORTANT: Set your REAL public website URL before deployment
A correct sitemap and canonical links require the **exact** final domain, including a GitHub project subpath if applicable. We have deliberately **not invented** a website address. For example, if your actual public URL were `https://username.github.io/my-nuga-website/`, run:

```bash
python generate_seo_urls.py https://username.github.io/my-nuga-website/
```

**The example is not your actual domain.** Replace it with the real URL. Running the script creates `sitemap.xml`, updates `robots.txt`, and adds canonical/OG absolute URLs to every HTML page. After this step, upload all the generated files to the same public site. Do not use a guessed or incorrect URL.

If you use Windows and Python is not installed, supply the exact live site URL in ChatGPT so the files can be preconfigured with that address instead.

## Deploy on GitHub Pages
1. Extract the archive, open the `NugaBest_ThikaRoad_SEO_Ready` folder.
2. Upload **the contents** (the HTML files, `styles.css`, `script.js`, `settings.js`, images, `robots.txt`, and sitemap if generated) to the root of the repository that GitHub Pages publishes.
3. Verify the homepage and each HTML page loads at its own public URL.
4. In [Google Search Console](https://search.google.com/search-console/about), verify ownership of the **actual live site**. Submit its sitemap URL (after running generator). Use URL Inspection to request indexing for the homepage and major pages.
5. Claim and verify the business at [Google Business Profile](https://www.google.com/business/). Use consistent business name, address, real phone, hours and official website URL. Consider uploading real facility photos and customer reviews with permission.

Google indexing and ranking **are not guaranteed** and may take time. Sitemap submission aids discovery but does not guarantee visibility.

## Data accuracy and completion
- Official WhatsApp Business number is still missing. Set it in `settings.js` (digits only, 254...); no made-up number was included.
- Confirm centre hours and business contact phone before adding those facts to the site or business profile.
- NM2500 price remains unconfirmed; E5 Foot Massager price is provisional, as earlier price lists disagreed. Prices only appear once per card.
- Avoid implying medical treatments or guaranteed health outcomes from heating/massage equipment.
- Real user-supplied product photos were preserved. Low native-resolution photos cannot be made genuinely HD by HTML/CSS.

## Testing
- Open index.html, therapy-services.html, shop-products.html, wellness-insights.html, about-us.html, and contact.html locally. Navigation should load a separate page, not scroll.
- Test shop filters and product enquiry links. Contact form prepares a message, but does **not** send it to a server. Booking requests require manual confirmation.
