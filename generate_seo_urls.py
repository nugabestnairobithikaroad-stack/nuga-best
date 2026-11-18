#!/usr/bin/env python3
"""Create correct canonical links, absolute OG image URLs, robots.txt and sitemap.xml after the final public site address is known.
Usage: python generate_seo_urls.py https://YOUR-ACTUAL-DOMAIN.example/
For GitHub project sites include the repository prefix, e.g. https://username.github.io/repository/
"""
from pathlib import Path
from urllib.parse import urljoin, urlsplit
import sys, xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
PAGES=['index.html','therapy-services.html','shop-products.html','wellness-insights.html','about-us.html','contact.html']
if len(sys.argv)!=2: sys.exit('Provide the exact public base URL as one argument.')
base=sys.argv[1].strip().rstrip('/')+'/'
parts=urlsplit(base)
if parts.scheme!='https' or not parts.netloc or 'YOUR-' in base or 'example' in parts.netloc:sys.exit('Provide a real HTTPS URL, not a placeholder.')
root=Path(__file__).resolve().parent
for file in PAGES:
 path=root/file
 soup=BeautifulSoup(path.read_text(encoding='utf-8'),'html.parser')
 for tag in soup.select('link[rel=canonical],meta[property="og:url"],meta[property="og:image"],meta[name="twitter:image"]'):tag.decompose()
 url=urljoin(base,file)
 canonical=soup.new_tag('link',rel='canonical',href=url);soup.head.append(canonical)
 for prop,val in [('og:url',url),('og:image',urljoin(base,'assets/nuga-best-homepage-banner-hd.png'))]: soup.head.append(soup.new_tag('meta',attrs={'property':prop,'content':val}))
 soup.head.append(soup.new_tag('meta',attrs={'name':'twitter:image','content':urljoin(base,'assets/nuga-best-homepage-banner-hd.png')}))
 for tag in soup.find_all('script',type='application/ld+json'):
  import json
  obj=json.loads(tag.string or '{}'); obj['url']=url
  tag.string=json.dumps(obj,ensure_ascii=False,separators=(',',':'))
 path.write_text(str(soup),encoding='utf-8')
ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
urlset=ET.Element('{http://www.sitemaps.org/schemas/sitemap/0.9}urlset')
for file in PAGES: ET.SubElement(ET.SubElement(urlset,'{http://www.sitemaps.org/schemas/sitemap/0.9}url'),'{http://www.sitemaps.org/schemas/sitemap/0.9}loc').text=urljoin(base,file)
ET.ElementTree(urlset).write(root/'sitemap.xml',encoding='utf-8',xml_declaration=True)
(root/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+urljoin(base,'sitemap.xml')+'\n',encoding='utf-8')
print('SEO URLs configured for',base)
