
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
const escapeText=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function productHTML(p,featured=false){const photo=featured?'featured-photo':'product-photo', card=featured?'featured-card':'product-card', body=featured?'featured-body':'product-copy';return `<article class="${card} reveal is-visible"><div class="${photo}"><img src="${p.image}" alt="${escapeText(p.name)}" loading="lazy"></div><div class="${body}"><span class="card-cat">${escapeText(p.category)}</span><h3>${escapeText(p.name)}</h3><p>${escapeText(p.desc)}</p><div class="${featured?'price-row':'product-meta'}"><span class="price">${escapeText(p.price)}</span><a class="enquire-link" href="#contact" data-product="${escapeText(p.name)}">Enquire ↗</a></div></div></article>`;}
const feat=document.getElementById('featuredProducts');if(feat)feat.innerHTML=[products[0],products[2],products[7]].map(x=>productHTML(x,true)).join('');
const shop=document.getElementById('shopProducts');const filters=[...document.querySelectorAll('.filter')],search=document.getElementById('productSearch');let selectedCategory=null;
function render(){const q=(search?.value||'').trim().toLowerCase();const shown=products.filter(p=>(!selectedCategory||p.category===selectedCategory)&&(!q||(p.name+' '+p.desc).toLowerCase().includes(q)));shop.innerHTML=shown.map(x=>productHTML(x)).join('');document.getElementById('productCount').textContent=`Showing ${shown.length} of ${products.length} products`;document.getElementById('noResults').hidden=shown.length>0;}
render();filters.forEach(btn=>btn.addEventListener('click',()=>{selectedCategory=selectedCategory===btn.dataset.filter?null:btn.dataset.filter;filters.forEach(b=>{const on=b.dataset.filter===selectedCategory;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});render();}));search.addEventListener('input',render);
const toggle=document.getElementById('navToggle'),nav=document.getElementById('siteNav');toggle.addEventListener('click',()=>{const expanded=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!expanded));nav.classList.toggle('open',!expanded)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
// Page-style navigation: show only the selected view, keep navbar visible.
const navLinks=[...nav.querySelectorAll('a')];
const pages=[...document.querySelectorAll('main > [data-page]')];
const validPages=new Set(['home','therapy','shop','insights','about','contact']);
function showPage(page,{updateHistory=false}={}){
  const key=validPages.has(page)?page:'home';
  pages.forEach(el=>{el.hidden=el.dataset.page!==key;});
  navLinks.forEach(a=>{const active=a.getAttribute('href')==='#'+key;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  if(updateHistory && location.hash!=='#'+key)history.pushState({page:key},'', '#'+key);
  nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');
  // Reveal content immediately upon opening a view to avoid invisible cards.
  pages.filter(el=>!el.hidden).forEach(el=>el.querySelectorAll('.reveal').forEach(r=>r.classList.add('is-visible')));
  window.scrollTo({top:0,behavior:'instant'});
  document.title='Nuga Best Thika Road | '+({home:'Home',therapy:'Therapy Services',shop:'Shop Products',insights:'Wellness Insights',about:'About Us',contact:'Contact'}[key]);
}
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]');
  if(!a)return;
  const key=a.getAttribute('href').slice(1);
  if(!validPages.has(key))return;
  e.preventDefault();
  showPage(key,{updateHistory:true});
});
window.addEventListener('popstate',()=>showPage(location.hash.slice(1)));
window.addEventListener('hashchange',()=>showPage(location.hash.slice(1)));
showPage(location.hash.slice(1));
function selectEnquiry(p){const s=document.getElementById('interest');s.value='Product information and price';document.querySelector('[name="message"]').value=`I would like to enquire about ${p}. Please confirm the current price and availability.`;}
document.addEventListener('click',e=>{const link=e.target.closest('[data-product]');if(link)selectEnquiry(link.dataset.product)});
const form=document.getElementById('contactForm');form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form),msg=`Nuga Best Thika Road enquiry\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nInterest: ${data.get('interest')}\nMessage: ${data.get('message')||'Please contact me with more information.'}`;const output=document.getElementById('messageOutput');document.getElementById('messageText').value=msg;output.hidden=false;document.getElementById('copyStatus').textContent='Your enquiry is prepared. Copy it and send it to the centre; the form has not sent it automatically.';output.scrollIntoView({behavior:'smooth',block:'nearest'});});
document.getElementById('copyMessage').addEventListener('click',async()=>{const t=document.getElementById('messageText');try{await navigator.clipboard.writeText(t.value);document.getElementById('copyStatus').textContent='Message copied. Paste it into WhatsApp or your preferred messaging app.'}catch{t.focus();t.select();document.getElementById('copyStatus').textContent='Please copy the selected text manually (Ctrl + C).'}});
document.getElementById('year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion');const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.07});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}
