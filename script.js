'use strict';
const products=[
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

const settings = window.NUGA_BEST_SETTINGS || {};
const businessNumber = String(settings.whatsappNumber || '').replace(/\D/g,'');
const whatsappReady = /^\d{10,15}$/.test(businessNumber);
const escapeText = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $ = id => document.getElementById(id);
let activeCategory = null;

function productHTML(p, featured=false){
  const card = featured ? 'featured-card' : 'product-card';
  const photo = featured ? 'featured-photo' : 'product-photo';
  const body = featured ? 'featured-body' : 'product-copy';
  return `<article class="${card} reveal is-visible"><div class="${photo}"><img src="${p.image}" alt="${escapeText(p.name)}" loading="lazy" decoding="async"></div><div class="${body}"><span class="card-cat">${escapeText(p.category)}</span><h3>${escapeText(p.name)}</h3><p>${escapeText(p.desc)}</p><div class="${featured?'price-row':'product-meta'}"><span class="price">${escapeText(p.price)}</span><a class="enquire-link" href="contact.html?product=${encodeURIComponent(p.name)}" data-product="${escapeText(p.name)}">Enquire ↗</a></div></div></article>`;
}
const featured = $('featuredProducts');
if (featured) featured.innerHTML=[products[0],products[2],products[7]].map(p=>productHTML(p,true)).join('');
const shop=$('shopProducts');
const filters=[...document.querySelectorAll('.filter')];
const search=$('productSearch');
function renderProducts(){
  if(!shop) return;
  const q=(search?.value||'').trim().toLowerCase();
  const showing=products.filter(p=>(!activeCategory||p.category===activeCategory)&&(!q||(p.name+' '+p.desc).toLowerCase().includes(q)));
  shop.innerHTML=showing.map(p=>productHTML(p)).join('');
  $('productCount').textContent=`Showing ${showing.length} of ${products.length} products`;
  $('noResults').hidden=showing.length>0;
}
renderProducts();
filters.forEach(button=>button.addEventListener('click',()=>{
 activeCategory=activeCategory===button.dataset.filter?null:button.dataset.filter;
 filters.forEach(b=>{const selected=b.dataset.filter===activeCategory;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});
 renderProducts();
}));
search?.addEventListener('input',renderProducts);

function chooseProduct(product){
 $('interest').value='Product information and price';
 $('contactForm').elements.message.value=`I would like to enquire about ${product}. Please confirm its current price and availability.`;
 setBookingVisibility();
 $('messageOutput').hidden=true;
}
function setBookingVisibility(){
 const isBooking=$('interest').value==='Booking a 45-minute session';
 $('bookingFields').hidden=!isBooking;
 $('bookingDate').required=isBooking;
}
if ($('interest')) { $('interest').addEventListener('change',setBookingVisibility); setBookingVisibility(); }
// Date is set in the visitor's local time rather than UTC to avoid a wrong day.
const now=new Date();
const localToday=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
if ($('bookingDate')) $('bookingDate').min=localToday;

// On separate HTML pages normal links work without view-switching JavaScript.
// Product cards navigate to contact.html?product=... with a prepared enquiry.
if ($('interest')) {
 const productQuery=new URLSearchParams(location.search).get('product');
 if(productQuery) chooseProduct(productQuery);
 const kind=new URLSearchParams(location.search).get('intent');
 if(kind==='booking') { $('interest').value='Booking a 45-minute session'; setBookingVisibility(); }
}

if ($('contactForm')) {
$('contactForm').addEventListener('submit',event=>{
 event.preventDefault();
 const form=event.currentTarget;
 if(!form.reportValidity())return;
 const data=new FormData(form);
 const interest=String(data.get('interest')||'');
 const name=String(data.get('name')||'').trim();
 const phone=String(data.get('phone')||'').trim();
 const extra=String(data.get('message')||'').trim();
 const parts=[`${settings.businessName||'Nuga Best Thika Road'} enquiry`,`Name: ${name}`,`Phone: ${phone}`,`Request: ${interest}`];
 if(interest==='Booking a 45-minute session'){
  parts.push(`Preferred date: ${data.get('date')}`);
  parts.push(`Preferred time: ${data.get('time')||'Any available time'}`);
 }
 if(extra)parts.push(`Message: ${extra}`);
 parts.push('Please confirm the details and availability.');
 const message=parts.join('\n');
 $('messageText').value=message;
 $('messageOutput').hidden=false;
 $('copyStatus').textContent='Your request has been prepared but is not yet sent or confirmed.';
 const link=$('whatsappSend');
 if(whatsappReady){link.hidden=false;link.href=`https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;}
 else{link.hidden=true;link.removeAttribute('href');}
 $('messageOutput').scrollIntoView({block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
});
$('copyMessage').addEventListener('click',async()=>{
 const box=$('messageText');
 try{await navigator.clipboard.writeText(box.value);$('copyStatus').textContent='Copied. Paste into WhatsApp or a message to the centre.';}
 catch{box.focus();box.select();$('copyStatus').textContent='Press Ctrl + C to copy the selected message.';}
});

}
$('year').textContent=String(new Date().getFullYear());
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.05});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
