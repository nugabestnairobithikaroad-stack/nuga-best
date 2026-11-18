"use strict";
const products = [
{name:'N5 Thermal Massage Bed',category:'Beds',price:'KES 518,700',desc:'Full-body thermal massage bed with guided warmth and massage features.',image:'assets/n5.webp'},
{name:'T20 Therapy Mat',category:'Mats',price:'KES 175,500',desc:'Full-size therapy mat for home warmth and relaxation.',image:'assets/t20.webp'},
{name:'NM2500 Tourmanium Single Mat',category:'Mats',price:'Confirm price',desc:'Single-person tourmanium mat for guided warmth and comfort.',image:'assets/nm2500.webp'},
{name:'MHP-100 NDT Shoulder Mat',category:'Supports',price:'KES 63,700',desc:'Shoulder-focused thermal mat for warmth and comfort.',image:'assets/shoulder.webp'},
{name:'NM80 Tourmanium Small Mat',category:'Mats',price:'KES 65,000',desc:'Compact thermal mat designed for targeted comfort.',image:'assets/nm80.webp'},
{name:'NM-90 NDT Waist Belt',category:'Supports',price:'KES 50,700',desc:'Wearable thermal belt for comfortable warmth around the waist.',image:'assets/waist.webp'},
{name:'T9 Multi Functional Thermal Belt',category:'Supports',price:'KES 71,500',desc:'Personal heating device for targeted comfort.',image:'assets/t9.webp'},
{name:'E5 Foot Massager',category:'Massagers',price:'KES 137,800',desc:'Thermal foot massager designed for relaxing home use.',image:'assets/e5.webp'},
{name:'Tourmanium Stones (4 stones)',category:'Accessories',price:'KES 1,200',desc:'Set of four tourmanium stones.',image:'assets/stones.webp'},
{name:'Tourmanium Water Bottle',category:'Accessories',price:'KES 12,740',desc:'Nuga Best blue tourmanium water bottle.',image:'assets/bottle.webp'},
{name:'Tourmaline Pillow NM-30',category:'Accessories',price:'KES 25,740',desc:'Tourmanium pillow for everyday comfort.',image:'assets/pillow.webp'}
];
const settings=window.NUGA_BEST_SETTINGS||{};
const businessNumber=String(settings.whatsappNumber||'').replace(/\D/g,'');
const whatsappReady=/^254\d{9}$/.test(businessNumber);
const $=id=>document.getElementById(id);
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lookup=new Map(products.map(p=>[p.name,p]));
const currency=n=>'KES '+n.toLocaleString('en-KE');
const priceNumber=p=>{let n=Number(String(p.price).replace(/[^0-9]/g,''));return p.price.startsWith('KES ')&&Number.isFinite(n)?n:null};
const waUrl=text=>`https://wa.me/${businessNumber}?text=${encodeURIComponent(text)}`;
function orderMessage(p){return `Hello Nuga Best Thika Road, I would like to order ${p.name} (listed at ${p.price}). Please confirm availability, current price, delivery arrangements and the official payment instructions. Thank you.`;}
function orderUrl(p){return whatsappReady?waUrl(orderMessage(p)):`contact.html?product=${encodeURIComponent(p.name)}&intent=order`;}
function productHtml(p,featured=false){
 const c=featured?'featured-card':'product-card',photo=featured?'featured-photo':'product-photo',body=featured?'featured-body':'product-copy';
 return `<article class="${c} reveal is-visible"><div class="${photo}"><img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy" decoding="async"></div><div class="${body}"><span class="card-cat">${escapeHtml(p.category)}</span><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.desc)}</p><div class="${featured?'price-row':'product-meta'}"><span class="price">${escapeHtml(p.price)}</span><div class="buy-actions"><a class="enquire-link order-product" href="${escapeHtml(orderUrl(p))}" ${whatsappReady?'target="_blank" rel="noopener noreferrer"':''} data-product="${escapeHtml(p.name)}">Order on WhatsApp ↗</a>${featured?'':`<button class="add-to-cart" type="button" data-add-cart="${escapeHtml(p.name)}">+ Add to cart</button>`}</div></div></div></article>`;
}
const featured=$('featuredProducts');if(featured)featured.innerHTML=[products[0],products[2],products[7]].map(p=>productHtml(p,true)).join('');
const shop=$('shopProducts');const search=$('productSearch');const filters=[...document.querySelectorAll('.filter')];let activeCategory=null;
function renderProducts(){
 if(!shop)return;
 const query=(search?.value||'').trim().toLowerCase();
 const displayed=products.filter(p=>(!activeCategory||p.category===activeCategory)&&(!query||(p.name+' '+p.desc).toLowerCase().includes(query)));
 shop.innerHTML=displayed.map(p=>productHtml(p)).join('');
 if($('productCount'))$('productCount').textContent=`Showing ${displayed.length} of ${products.length} products`;
 if($('noResults'))$('noResults').hidden=displayed.length>0;
}
renderProducts();
filters.forEach(b=>b.addEventListener('click',()=>{activeCategory=activeCategory===b.dataset.filter?null:b.dataset.filter;filters.forEach(x=>{let selected=x.dataset.filter===activeCategory;x.classList.toggle('active',selected);x.setAttribute('aria-pressed',String(selected))});renderProducts()}));
search?.addEventListener('input',renderProducts);
// Item quantities are intentionally kept only during the current page session.
// No customer information or payment details are stored or sent to a server.
const cart=new Map();
function cartMessage(){
 const lines=['Hello Nuga Best Thika Road, I would like to order the following items:'];
 let subtotal=0,unknown=false;
 for(const [name,qty] of cart){const p=lookup.get(name);if(!p)continue;lines.push(`- ${qty} × ${p.name} (${p.price} each)`);const price=priceNumber(p);if(price===null)unknown=true;else subtotal+=price*qty;}
 lines.push(`Indicative subtotal of priced items: ${currency(subtotal)}`);
 if(unknown)lines.push('Some items need a price quotation.');
 lines.push('Please confirm availability, final prices, delivery costs and the official payment instructions before I pay. Thank you.');
 return lines.join('\n');
}
function renderCart(){
 const list=$('cartItems');if(!list)return;
 let total=0,count=0,unknown=false;
 list.innerHTML=[...cart].map(([name,qty])=>{const p=lookup.get(name);if(!p)return'';count+=qty;const n=priceNumber(p);if(n===null)unknown=true;else total+=n*qty;return `<div class="cart-item"><div><strong>${escapeHtml(name)}</strong><small>${escapeHtml(p.price)} each</small></div><div class="cart-qty"><button type="button" data-qty="minus" data-item="${escapeHtml(name)}" aria-label="Reduce quantity of ${escapeHtml(name)}">−</button><span>${qty}</span><button type="button" data-qty="plus" data-item="${escapeHtml(name)}" aria-label="Increase quantity of ${escapeHtml(name)}">+</button></div></div>`;}).join('')||'<p>Your cart is empty. Select Add to cart on a product.</p>';
 if($('cartCount'))$('cartCount').textContent=String(count);
 if($('cartTotal'))$('cartTotal').textContent=`Indicative subtotal: ${currency(total)}${unknown?' + items awaiting quote':''} (delivery excluded)`;
 const checkout=$('cartCheckout');if(checkout){checkout.classList.toggle('is-disabled',!count);checkout.setAttribute('aria-disabled',String(!count));checkout.href=count?(whatsappReady?waUrl(cartMessage()):'contact.html?intent=order&items='+encodeURIComponent(cartMessage())):'#shop';if(count&&whatsappReady){checkout.target='_blank';checkout.rel='noopener noreferrer'}else{checkout.removeAttribute('target');checkout.removeAttribute('rel')}}
 if($('cartWhatsAppHint'))$('cartWhatsAppHint').textContent=whatsappReady?'WhatsApp opens with your complete request; orders are only confirmed when our team replies.':'WhatsApp number not configured yet. You can still prepare and copy your full order message on the Contact page.';
}
const cartPanel=$('cartPanel');$('openCart')?.addEventListener('click',()=>{cartPanel.hidden=false;$('openCart').setAttribute('aria-expanded','true');cartPanel.scrollIntoView({block:'nearest',behavior:'smooth'})});
$('closeCart')?.addEventListener('click',()=>{cartPanel.hidden=true;$('openCart')?.setAttribute('aria-expanded','false')});
$('clearCart')?.addEventListener('click',()=>{cart.clear();renderCart()});
document.addEventListener('click',e=>{
 const add=e.target.closest('[data-add-cart]');if(add){let name=add.dataset.addCart;if(lookup.has(name)){cart.set(name,(cart.get(name)||0)+1);renderCart();if($('openCart')){$('openCart').textContent='View Cart ('+[...cart.values()].reduce((a,b)=>a+b,0)+') 🛒';}}return;}
 const qty=e.target.closest('[data-qty]');if(qty){const name=qty.dataset.item;let n=(cart.get(name)||0)+(qty.dataset.qty==='plus'?1:-1);if(n<=0)cart.delete(name);else cart.set(name,Math.min(n,99));renderCart();}
});
renderCart();
// Statically rendered cards are usable even if script has not yet loaded.
document.querySelectorAll('a.order-product[data-product]').forEach(a=>{const p=lookup.get(a.dataset.product);if(!p)return;a.href=orderUrl(p);if(whatsappReady){a.target='_blank';a.rel='noopener noreferrer';}});
// Contact page: prepare both individual order and booking requests.
function setBookingVisibility(){if(!$('interest'))return;const booking=$('interest').value==='Booking a 45-minute session';if($('bookingFields'))$('bookingFields').hidden=!booking;if($('bookingDate'))$('bookingDate').required=booking;}
$('interest')?.addEventListener('change',setBookingVisibility);
const today=new Date();const localDate=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');if($('bookingDate'))$('bookingDate').min=localDate;
const params=new URLSearchParams(location.search);
const productName=params.get('product');const orderItems=params.get('items');
if(productName&&$('interest')){$('interest').value='Order products via WhatsApp';const p=lookup.get(productName);$('contactForm').elements.message.value=p?orderMessage(p):`I would like to enquire about ${productName}.`;}
if(orderItems&&$('interest')){$('interest').value='Order products via WhatsApp';$('contactForm').elements.message.value=orderItems;}
if(params.get('intent')==='booking'&&$('interest'))$('interest').value='Booking a 45-minute session';
setBookingVisibility();
$('contactForm')?.addEventListener('submit',event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
 const data=new FormData(form),interest=String(data.get('interest')||''),name=String(data.get('name')||'').trim(),phone=String(data.get('phone')||'').trim(),extra=String(data.get('message')||'').trim();
 const parts=['Hello Nuga Best Thika Road,',`Name: ${name}`,`Customer phone: ${phone}`,`Request: ${interest}`];
 if(interest==='Booking a 45-minute session')parts.push(`Preferred date: ${data.get('date')}`,`Preferred time: ${data.get('time')||'Any available time'}`);
 if(extra)parts.push(`Details:\n${extra}`);
 parts.push('Please confirm availability and any payment arrangements before I pay.');
 const message=parts.join('\n');if($('messageText'))$('messageText').value=message;if($('messageOutput'))$('messageOutput').hidden=false;
 if($('copyStatus'))$('copyStatus').textContent='Your request is prepared, not yet sent or confirmed.';
 const link=$('whatsappSend');if(link){if(whatsappReady){link.hidden=false;link.href=waUrl(message)}else{link.hidden=true;link.removeAttribute('href')}}
 $('messageOutput')?.scrollIntoView({block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
});
$('copyMessage')?.addEventListener('click',async()=>{const box=$('messageText');if(!box)return;try{await navigator.clipboard.writeText(box.value);$('copyStatus').textContent='Message copied. Paste it into WhatsApp and send it to the centre.';}catch{box.focus();box.select();$('copyStatus').textContent='Press Ctrl + C to copy the selected message.';}});
if($('year'))$('year').textContent=String(new Date().getFullYear());
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}}),{threshold:.05});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));}


// Responsive auto sliders for Shop and Contact pages.
(function(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll('.page-slide'));
    const dotsWrap = slider.querySelector('.page-slider-dots');
    if (!slides.length || !dotsWrap) return;
    let index = Math.max(0, slides.findIndex(s => s.classList.contains('is-active')));
    const dots = slides.map((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      btn.addEventListener('click', () => { index = i; show(index, true); restart(); });
      dotsWrap.appendChild(btn);
      return btn;
    });
    function show(i, userAction){
      slides.forEach((slide, n) => {
        const active = n === i;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
        if (active && userAction && slide.querySelector('a,button')) {
          // keep focus untouched for accessibility; do not auto-focus
        }
      });
      dots.forEach((dot, n) => dot.classList.toggle('is-active', n === i));
    }
    show(index, false);
    if (reduceMotion || slides.length < 2) return;
    let timer = null;
    function next(){ index = (index + 1) % slides.length; show(index, false); }
    function start(){ timer = window.setInterval(next, 5200); }
    function stop(){ if (timer) { window.clearInterval(timer); timer = null; } }
    function restart(){ stop(); start(); }
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', start);
    start();
  });
})();
