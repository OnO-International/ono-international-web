// Render the existing card design as a standalone PNG, without browser UI.
// Run locally with: node scripts/render-card-image.mjs (uses Astro's installed sharp).
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
const asset = async name => 'data:image/png;base64,' + (await readFile(new URL('../public/card/assets/' + name, import.meta.url))).toString('base64');
const [background, logo, qr] = await Promise.all(['presentation-background.png','ono-logo.png','card-qr.png'].map(asset));
const icons = [
  '<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z"/>',
  '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 6 9 7 9-7"/>',
  '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>'
];
const rows = [
  [385,46,'電話番号','080-6994-3810',22],
  [438,43,'メールアドレス','hibiki20240414@gmail.com',16],
  [488,43,'Webサイト','ono-international.com',18]
].map(([y,h,label,value,size],i)=>`<g transform="translate(24 ${y})"><rect width="312" height="${h}" rx="11" fill="url(#panel)" stroke="#aabed4" stroke-width=".7"/><circle cx="29" cy="${h/2}" r="16" fill="url(#icon)" stroke="#52799d" stroke-width=".6"/><svg x="18.5" y="${h/2-10.5}" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round">${icons[i]}</svg><text x="56" y="${h/2-6}" font-family="Hiragino Mincho ProN,serif" font-size="9" letter-spacing=".8">${label}</text><text x="56" y="${h/2+16}" font-family="Georgia,serif" font-size="${size}" letter-spacing="${i===0?'.4':'-.3'}">${value}</text></g>`).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="2400" viewBox="0 0 360 800">
<defs><linearGradient id="panel"><stop stop-color="#fff" stop-opacity=".94"/><stop offset="1" stop-color="#fff" stop-opacity=".78"/></linearGradient><radialGradient id="icon" cx="25%" cy="22%" r="80%"><stop stop-color="#5482aa"/><stop offset=".4" stop-color="#0d3d6c"/><stop offset="1" stop-color="#06234b"/></radialGradient><linearGradient id="rule"><stop stop-color="#153965"/><stop offset=".4" stop-color="#009be7"/><stop offset=".5" stop-color="#fff"/><stop offset=".6" stop-color="#009be7"/><stop offset="1" stop-color="#153965"/></linearGradient><clipPath id="qr-frame"><rect x="60" y="547" width="240" height="240" rx="13"/></clipPath></defs>
<image href="${background}" width="360" height="800" preserveAspectRatio="none"/>
<g fill="#06234b"><image href="${logo}" x="85" y="65" width="190" height="99.77"/>
<g text-anchor="middle"><text x="180" y="193" font-family="Georgia,serif" font-size="27" letter-spacing="-.6">OnO International</text><text x="180" y="214" font-family="Hiragino Mincho ProN,serif" font-size="10" letter-spacing=".7">オーエヌオーインターナショナル</text>
<path d="M31 230H329" stroke="#496487" stroke-opacity=".3" stroke-width=".7"/><rect x="144" y="229" width="72" height="3" rx="1.5" fill="url(#rule)"/>
<g font-family="Georgia,serif" font-size="8.5" letter-spacing="1.7"><text x="180" y="251">CONNECTING PEOPLE</text><text x="180" y="267">CREATING A BRIGHTER TOMORROW</text></g>
<text x="180" y="294" font-family="Hiragino Mincho ProN,serif" font-size="13" letter-spacing="3">代表</text><text x="183" y="335" font-family="Hiragino Mincho ProN,serif" font-size="36" letter-spacing="6">小野 秀太</text><text x="182" y="359" font-family="Georgia,serif" font-size="12" letter-spacing="5">SHUTA ONO</text></g>
${rows}
<rect x="60" y="547" width="240" height="240" rx="13" fill="#fff" stroke="#9bb6d0" stroke-width=".8"/><image href="${qr}" x="60" y="547" width="240" height="240" clip-path="url(#qr-frame)"/></g></svg>`;
const png = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile(new URL('../public/card/assets/shuta-ono-card.png',import.meta.url),png);
console.log('Rendered standalone card PNG: 1080 × 2400 pixels.');
