# Paystack setup for Nuga Best Thika Road (Kenya)

**Status: CONFIGURATION READY, NOT YET CONNECTED TO A LIVE PAYMENT ACCOUNT.**
This GitHub Pages website contains no Paystack secret API keys and will show no Pay Now buttons until valid live payment links are added.

## 1. Create and activate your Paystack business
- Visit https://paystack.com/signup and sign up as Nuga Best Thika Road, Kenya.
- Choose the correct business type; submit the official Kenyan compliance documents.
- The account initially starts in test mode. Only publish real payment links after Paystack approves live payments.

## 2. Create product Payment Pages
- Log in at https://dashboard.paystack.com
- Create products and a Paystack Product Payment Page (or one page per product).
- Match the product name, final approved selling price, and payment currency (KES).
- Consider delivery fees, delivery policy, stock, refund/return terms before enabling checkout.
- For high-value equipment, confirm payment-channel and single-transaction limits with Paystack.
- Copy the **live** Payment Page URL, like https://paystack.com/pay/your-real-slug.

## 3. Paste links into paystack-links.js
- Find the corresponding product name and replace the empty string with its genuine payment link.
- The shop and featured product cards then display a 'Pay securely' button opening Paystack checkout.
- Product enquiry buttons remain available. An unconfigured product gets no payment button.
- NM2500 must remain unconfigured until its final price is agreed; E5 price must be checked.

## 4. Therapy sessions
- Set an approved deposit/full session price and booking/refund terms before adding `therapySession` link.
- Payment is not a confirmed appointment. Staff must check availability and confirm the time separately.

## 5. Deployment and safety
- Upload all files in this folder, including `paystack-links.js`, to the repository used by GitHub Pages.
- NEVER paste Paystack `sk_live_...` or `sk_test_...` secret keys into HTML, CSS, JS, GitHub or chat.
- For a real cart, automated order tracking, refunds and authoritative payment verification, use a secure backend with server-side verification and authenticated webhooks.
- No real transaction has been processed or tested as part of this package.
