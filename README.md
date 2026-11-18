# Nuga Best Thika Road — WhatsApp Shopping Edition

This is the complete static Nuga Best VIP navy/gold website, with **six separate SEO-friendly pages** and real product photos provided for the project. Product ordering and appointment requests use **WhatsApp instead of Paystack**.

## REQUIRED BEFORE PUBLISHING: official WhatsApp number

Open `settings.js`. Set `whatsappNumber` to your official **Nuga Best Thika Road WhatsApp Business number**, in international digits only, starting with `254`. Example format `2547XXXXXXXX` (not a real number). There is deliberately **no fake phone number** in this package.

Until it is configured, product buttons direct customers to the contact form, which prepares a message they can copy. Cart checkout also prepares the order on the contact page. Once configured, direct product orders and the cart open WhatsApp with a prewritten message. Booking requests are prepared from Contact and can then be sent to WhatsApp.

## Features

- Home (`index.html`), Therapy Services, Shop Products, Wellness Insights, About Us, Contact — separate HTML pages
- Premium navy/charcoal/gold theme, responsive layout and motion effects
- 11 product listings with photographs, one indicative price per item (NM-70 removed)
- Product search and category filters; no “All” category button
- **Order on WhatsApp** link for each item
- **Add to cart**, quantity adjustments and combined WhatsApp order message
- Request preferred appointment date and time through Contact
- No card payments, no Paystack checkout, no API keys and no automatic payment verification
- All orders, prices, stock, delivery and payment instructions are confirmed manually by the business
- Sitemap generator `generate_seo_urls.py` for use only with your real deployed domain

## Deployment

1. Unzip this archive.
2. Open `settings.js` and enter the *real* official WhatsApp Business number.
3. Upload the **contents** of this folder to your GitHub Pages site or other static host, replacing the old files. Remove old `paystack-links.js` and other payment setup files from the repository if present.
4. After deploying, test Home, Shop, Cart, WhatsApp links and Booking form on mobile and desktop.
5. Refresh the published site with Ctrl+Shift+R. If you have a real site URL, run `python generate_seo_urls.py https://your-real-domain/` to generate the sitemap/canonical URLs, then redeploy.

## Important limitations

The site does not send messages or collect payments automatically. WhatsApp is a separate application; customers must click Send in WhatsApp and Nuga Best must confirm the order. The website cannot verify M-PESA transactions. The E5 Foot Massager listed price is provisional due to two conflicting earlier price lists; the NM2500 price is awaiting confirmation. Some supplied product images have low native resolution.


## WhatsApp configured
Official business WhatsApp: +254 748 744 688. The website uses 254748744688 in settings.js. Test the product order, cart and booking links before publishing.
