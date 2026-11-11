/* SITE SETTINGS: Set the official business WhatsApp number in international digits,
   for example 2547XXXXXXXX (no + sign). Leave blank until verified. */
const CONFIG = { whatsappNumber: '' };
const products = [
  {id:'n5',name:'N5 Thermal Massage Bed',category:'Beds',price:518700,usd:3990,img:'assets/n5-enhanced.webp',description:'Full-body thermal massage bed with guided heat and massage features.'},
  {id:'t20',name:'T20 Therapy Mat',category:'Mats',price:175500,usd:1350,img:'assets/t20-illustration.svg',description:'Full-size T20 warming mat for home relaxation. Product photograph to be verified.'},
  {id:'nm2500',name:'NM2500 Tourmanium Single Mat',category:'Mats',price:null,usd:null,img:'assets/nm2500-clean.webp',description:'Single-person tourmanium thermal mat. Contact us for a quotation.'},
  {id:'mhp100',name:'MHP-100 NDT Shoulder Mat',category:'Mats',price:63700,usd:490,img:'assets/mhp100-illustration.svg',description:'Shoulder-focused thermal mat for warmth and comfort.'},
  {id:'nm80',name:'NM80 Tourmanium Small Mat',category:'Mats',price:65000,usd:500,img:'assets/nm80-illustration.svg',description:'Compact thermal mat designed for targeted comfort.'},
  {id:'nm90',name:'NM-90 NDT Waist Belt',category:'Supports',price:50700,usd:390,img:'assets/nm90-clean.webp',description:'Wearable thermal belt for comfortable warmth around the waist.'},
  {id:'t9',name:'T9 Multifunctional Thermal Belt',category:'Supports',price:71500,usd:550,img:'assets/t9-illustration.svg',description:'Multifunctional warming belt. Product photograph to be verified.'},
  {id:'e5',name:'E5 Foot Massager',category:'Massagers',price:137800,usd:1060,img:'assets/e5-clean.webp',description:'Foot massage equipment designed for a relaxing home routine.'},
  {id:'stones',name:'Tourmanium Stones (4 pieces)',category:'Accessories',price:1200,usd:null,img:'assets/stones-illustration.svg',description:'Pack of four tourmanium stones.'},
  {id:'bottle',name:'Tourmanium Water Bottle',category:'Accessories',price:12740,usd:98,img:'assets/bottle-illustration.svg',description:'Tourmanium accessory water bottle.'},
  {id:'pillow',name:'Tourmanium Pillow NM-30',category:'Accessories',price:25740,usd:198,img:'assets/pillow-illustration.svg',description:'Tourmaline pillow for everyday comfort.'}
];
const els={menu:document.getElementById('menuToggle'),nav:document.getElementById('mainNav'),dialog:document.getElementById('enquiryDialog'),message:document.getElementById('messageDialog')};
let currentProduct=null,currentCategory='All',prepared='';
const money=n=>n===null?'Price on enquiry':'KES '+n.toLocaleString('en-KE');
function safe(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function art(p){const illustrative=p.img&&(p.img.endsWith('.svg')||p.img.includes('n5-enhanced')); return p.img?`<img loading="lazy" src="${p.img}" alt="${illustrative?'Illustration of product type, not a verified photograph: ':'Reference photo for '}${safe(p.name)}">`:`<div class="fallback-art" role="img" aria-label="Image not yet available">Image unavailable</div>`;}
function card(p){return `<article class="product-card"><div class="product-image">${art(p)}${(p.img?.endsWith('.svg')||p.img?.includes('n5-enhanced'))?'<span class="photo-tag pending-tag">Enhanced illustration · not actual product photo</span>':'<span class="photo-tag">Reference photo</span>'}</div><div class="product-details"><div class="product-type">${p.category}</div><h3>${safe(p.name)}</h3><p>${safe(p.description)}</p><div class="product-bottom"><span class="product-price">${p.price===null?'<small>Price on enquiry</small>':money(p.price)}</span><button class="small-enquire" data-product="${p.id}" aria-label="Enquire about ${safe(p.name)}">Enquire ↗</button></div></div></article>`;}
function renderProducts(){const term=document.getElementById('searchProducts').value.toLowerCase().trim();const list=products.filter(p=>(currentCategory==='All'||p.category===currentCategory)&&(p.name+' '+p.description).toLowerCase().includes(term));document.getElementById('allProducts').innerHTML=list.map(card).join('');document.getElementById('productCount').textContent=`Showing ${list.length} of ${products.length} products`;document.getElementById('noProducts').hidden=list.length!==0;}
document.getElementById('featuredProducts').innerHTML=[products[0],products[2],products[7]].map(card).join('');renderProducts();
// Homepage compact catalogue: same product data, functional enquiry buttons.
const homeProducts=document.getElementById('homeProducts');
if(homeProducts){homeProducts.innerHTML=products.map(p=>`<article class="home-product-card"><div class="home-product-image">${art(p)}</div><div class="home-product-info"><h3>${safe(p.name)}</h3><div class="home-product-actions"><b>${money(p.price)}</b><button data-product="${p.id}" aria-label="Enquire about ${safe(p.name)}">Enquire ↗</button></div></div></article>`).join('');}

document.getElementById('filters').addEventListener('click',e=>{const chip=e.target.closest('[data-filter]');if(!chip)return;currentCategory=chip.dataset.filter;document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('selected',c===chip));renderProducts();});
document.getElementById('searchProducts').addEventListener('input',renderProducts);
function showPage(){const page=(location.hash||'#home').slice(1);const id=page==='packages'?'home':document.getElementById(page)?.classList.contains('page')?page:'home';document.querySelectorAll('.page').forEach(e=>e.classList.toggle('active',e.id===id));document.querySelectorAll('[data-nav]').forEach(e=>e.classList.toggle('active',e.dataset.nav===(page==='packages'?'packages':id)));els.nav.classList.remove('open');els.menu.setAttribute('aria-expanded','false');if(page==='packages'){requestAnimationFrame(()=>document.getElementById('packages')?.scrollIntoView({behavior:'smooth',block:'start'}));}else{window.scrollTo({top:0,behavior:'instant'});}document.title=(id==='home'?'Nuga Best Thika Road':({therapy:'Therapy Services',shop:'Shop Products',insights:'Wellness Insights',about:'About Us',contact:'Contact'}[id]+' | Nuga Best Thika Road'));}
window.addEventListener('hashchange',showPage);showPage();els.menu.addEventListener('click',()=>{const opened=els.nav.classList.toggle('open');els.menu.setAttribute('aria-expanded',String(opened));els.menu.textContent=opened?'×':'☰';});
const dateInput=document.getElementById('bookingDate');dateInput.min=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);
function startDialog(p=null){currentProduct=p;const booking=p===null;document.getElementById('dialogKicker').textContent=booking?'BOOK A SESSION':'PRODUCT ENQUIRY';document.getElementById('dialogTitle').textContent=booking?'Book a 45-minute session':'Ask about '+p.name;document.getElementById('dialogIntro').textContent=booking?'Tell us your preferred date and time. We will need to confirm availability.':'Ask about pricing, availability or equipment details.';document.getElementById('bookingFields').hidden=!booking;dateInput.required=booking;document.getElementById('dialogForm').reset();els.dialog.showModal();}
document.addEventListener('click',e=>{if(e.target.closest('[data-book]'))startDialog();const btn=e.target.closest('[data-product]');if(btn){const p=products.find(p=>p.id===btn.dataset.product);if(p)startDialog(p);}});
document.getElementById('closeModal').addEventListener('click',()=>els.dialog.close());document.getElementById('closeMessage').addEventListener('click',()=>els.message.close());
function prepareMessage(msg){prepared=msg;document.getElementById('preparedMessage').value=msg;const wa=document.getElementById('whatsAppLink');if(CONFIG.whatsappNumber.trim()){wa.href=`https://wa.me/${CONFIG.whatsappNumber.trim()}?text=${encodeURIComponent(msg)}`;wa.hidden=false;document.getElementById('messageInfo').textContent='Copy your message or continue to WhatsApp. This is an enquiry, not a confirmed booking.';}else{wa.hidden=true;document.getElementById('messageInfo').textContent='Copy this message. To enable direct WhatsApp sending, add the business number in script.js (CONFIG.whatsappNumber).';}els.message.showModal();}
document.getElementById('dialogForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const msg=currentProduct?`Hello Nuga Best Thika Road, I would like to enquire about ${currentProduct.name} (${money(currentProduct.price)}).\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nAdditional details: ${f.get('notes')||'None'}`:`Hello Nuga Best Thika Road, I would like to request a 45-minute wellness session.\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nPreferred date: ${f.get('date')}\nPreferred time: ${f.get('time')||'Any available time'}\nAdditional details: ${f.get('notes')||'None'}\nPlease confirm availability.`;els.dialog.close();prepareMessage(msg);});
document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const msg=`Hello Nuga Best Thika Road,\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nInterest: ${f.get('interest')}\nMessage: ${f.get('message')||'Please contact me.'}`;prepareMessage(msg);});
document.getElementById('copyMessage').addEventListener('click',async e=>{try{await navigator.clipboard.writeText(prepared);e.currentTarget.textContent='✓ Copied to clipboard';setTimeout(()=>e.currentTarget.textContent='Copy Message',2500);}catch{document.getElementById('preparedMessage').select();document.execCommand('copy');e.currentTarget.textContent='Select and copy your message';}});
document.getElementById('year').textContent=new Date().getFullYear();


/* Progressive motion: enhancements only; content remains visible if JS is off. */
(function enableMotion(){
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const header=document.querySelector('.site-header');
  const progress=document.createElement('div');
  progress.className='reading-progress';progress.setAttribute('aria-hidden','true');
  header.appendChild(progress);
  let ticking=false;
  function updateProgress(){
    const max=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.transform=`scaleX(${max>0?Math.max(0,Math.min(1,window.scrollY/max)):0})`;
    ticking=false;
  }
  window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateProgress)}},{passive:true});
  window.addEventListener('resize',updateProgress);
  let observer;
  const revealGroups=[
    ['.section-heading, .page-heading, .shop-hero .wrap, .inner-grid>div:first-child','reveal-up'],
    ['.feature-card:nth-child(odd), .about-img, .split-banner>div:first-child, .inner-photo','reveal-left'],
    ['.feature-card:nth-child(even), .about-copy, .quote-panel','reveal-right'],
    ['.benefits>div, .product-card, .therapy-benefits article, .steps>div, .insight-card, .values>div, .equipment-row img, .contact-line, .contact-form-wrap','reveal-scale']
  ];
  function refreshReveals(){
    if(reduced.matches)return;
    const visiblePage=document.querySelector('.page.active');
    if(!visiblePage)return;
    if(observer)observer.disconnect();
    const targets=[];
    revealGroups.forEach(([selector,style])=>visiblePage.querySelectorAll(selector).forEach((node,index)=>{
      node.classList.add(style);
      node.style.setProperty('--reveal-delay',`${Math.min(index%4,3)*65}ms`);
      if(!node.classList.contains('in-view'))targets.push(node);
    }));
    observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}
    }),{threshold:.09,rootMargin:'0px 0px 45px 0px'});
    targets.forEach(el=>observer.observe(el));
  }
  if(!reduced.matches)document.documentElement.classList.add('motion-ready');
  refreshReveals();updateProgress();
  // Re-observe newly displayed page content and newly filtered product cards.
  window.addEventListener('hashchange',()=>requestAnimationFrame(()=>{refreshReveals();updateProgress()}));
  const productsNode=document.getElementById('allProducts');
  new MutationObserver(()=>requestAnimationFrame(refreshReveals)).observe(productsNode,{childList:true});
  reduced.addEventListener('change',e=>{
    document.documentElement.classList.toggle('motion-ready',!e.matches);
    if(e.matches){observer?.disconnect();document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.reveal-scale').forEach(el=>el.classList.add('in-view'))}
    else refreshReveals();
  });
})();
