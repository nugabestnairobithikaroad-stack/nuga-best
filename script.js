
const products=[
 {name:'N5 Thermal Massage Bed',category:'Beds',price:'KES 518,700',desc:'Full-body thermal massage bed with guided heat and massage features.',image:'assets/n5.webp'},
 {name:'T20 Therapy Mat',category:'Mats',price:'KES 175,500',desc:'Full-size thermal mat for home comfort and relaxation.',image:'assets/t20.webp'},
 {name:'NM2500 Tourmanium Single Mat',category:'Mats',price:'Confirm price',desc:'Single-person tourmanium mat for guided warmth and comfort.',image:'assets/nm2500.webp'},
 {name:'MHP-100 NDT Shoulder Mat',category:'Supports',price:'KES 63,700',desc:'Shoulder-focused thermal mat for warmth and comfort.',image:'assets/shoulder.webp'},
 {name:'NM80 Tourmanium Small Mat',category:'Mats',price:'KES 65,000',desc:'Compact thermal mat designed for targeted comfort.',image:'assets/nm80.webp'},
 {name:'NM-90 NDT Waist Belt',category:'Supports',price:'KES 50,700',desc:'Wearable thermal belt designed for waist support and comfort.',image:'assets/waist.webp'},
 {name:'T9 Multi Functional Thermal Belt',category:'Supports',price:'KES 71,500',desc:'Personal heating device for targeted comfort on the go.',image:'assets/t9.webp'},
 {name:'E5 Foot Massager',category:'Massagers',price:'KES 137,800',desc:'Thermal foot massager designed for a relaxing home routine.',image:'assets/e5.webp'},
 {name:'NM-70 Knee Cap',category:'Supports',price:'Confirm price',desc:'Heating support for knee comfort and guided warmth.',image:'assets/nm70.webp'},
 {name:'Tourmanium Stones (4 stones)',category:'Accessories',price:'KES 1,200',desc:'Set of four tourmanium stones.',image:'assets/stones.webp'},
 {name:'Tourmanium Water Bottle',category:'Accessories',price:'KES 12,740',desc:'Blue Nuga Best water bottle accessory.',image:'assets/bottle.webp'},
 {name:'Tourmaline Pillow NM-30',category:'Accessories',price:'KES 25,740',desc:'Tourmaline pillow for everyday comfort.',image:'assets/pillow.webp'}
];
const featured=[products[0],products[2],products[7]];
function cardHTML(p){return `<article class="product-card" data-category="${p.category}" data-name="${p.name.toLowerCase()}"><div class="product-photo"><img src="${p.image}" alt="${p.name}"></div><div class="product-copy"><span class="cat">${p.category}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="product-meta"><span class="price-small">${p.price}</span><a href="#contact" class="btn btn-primary small-btn">Enquire ↗</a></div></div></article>`}
function featureHTML(p){return `<article class="card"><div class="card-image"><img src="${p.image}" alt="${p.name}"></div><div class="card-body"><span class="cat">${p.category}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="price-row"><span class="price">${p.price}</span><a href="#contact" class="btn btn-primary small-btn">Enquire ↗</a></div></div></article>`}
const featuredRoot=document.getElementById('featuredProducts'); if(featuredRoot) featuredRoot.innerHTML=featured.map(featureHTML).join('');
const shopRoot=document.getElementById('shopProducts');
function renderShop(list){shopRoot.innerHTML=list.map(cardHTML).join('');document.getElementById('productCount').textContent=`Showing ${list.length} of ${products.length} products`;}
if(shopRoot) renderShop(products);
const search=document.getElementById('productSearch'); const chips=[...document.querySelectorAll('.chip')];
function applyFilters(){const q=(search?.value||'').toLowerCase().trim();const cat=(document.querySelector('.chip.active')?.dataset.filter)||'All';let list=products.filter(p=> (cat==='All'||p.category===cat) && (p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q))); renderShop(list);}
chips.forEach(ch=>ch.addEventListener('click',()=>{chips.forEach(c=>c.classList.remove('active')); ch.classList.add('active'); applyFilters();})); if(search) search.addEventListener('input',applyFilters);
const menuToggle=document.getElementById('menuToggle'); const menu=document.getElementById('menu'); if(menuToggle) menuToggle.addEventListener('click',()=>menu.classList.toggle('mobile-open'));
document.querySelectorAll('[data-book]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault(); location.hash='contact'; document.getElementById('name')?.focus();}));
