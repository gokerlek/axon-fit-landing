import { DEMO_URL, DEPLOY_URL } from './content.mjs';

const nav = [
  ['Özellikler', '/#ozellikler'],
  ['Kamera', '/#kamera'],
  ['Kurulum', '/#kurulum'],
  ['Hakkında', '/#hakkinda'],
  ['Demo', DEMO_URL],
];

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

export function renderPage(page, origin) {
  const title = `${page.title} | Axon Fit`;
  const canonical = `${origin}/${page.path}`;
  return `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#0b0b0b"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(page.description)}"><link rel="canonical" href="${escapeHtml(canonical)}"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(page.description)}"><meta property="og:type" content="website"><meta property="og:image" content="${origin}/share.svg"><link rel="icon" href="/favicon.ico" sizes="any"><link rel="stylesheet" href="/site.css"></head>
<body><a class="skip-link" href="#content">İçeriğe geç</a><div class="reading-progress" aria-hidden="true"><span></span></div><header class="site-header"><div class="shell header-inner"><a class="brand" href="/" aria-label="Axon Fit ana sayfa"><img src="/favicon.ico" width="28" height="28" alt=""><span>Axon Fit</span></a><nav aria-label="Ana gezinme">${nav.filter(([label]) => label !== 'Demo').map(([label, url]) => `<a href="${url}">${label}</a>`).join('')}</nav><div class="header-actions"><a class="header-demo" href="${DEMO_URL}" target="_blank" rel="noopener noreferrer">Demoyu aç</a><a class="header-cta" href="${DEPLOY_URL}" target="_blank" rel="noopener noreferrer">Vercel’de kur</a></div></div></header>
<main id="content">${page.body}</main><footer class="site-footer"><div class="shell footer-inner"><div><a class="brand" href="/"><img src="/favicon.ico" width="26" height="26" alt=""><span>Axon Fit</span></a><p>Bağımsız antrenör için, kendi hesabında.</p></div><nav aria-label="Alt gezinme">${nav.map(([label, url]) => `<a href="${url}"${label === 'Demo' ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`).join('')}<a href="https://github.com/gokerlek/axon-fit" target="_blank" rel="noopener noreferrer">GitHub</a></nav></div></footer>${page.script ? `<script src="/motion.js"></script><script src="/${page.script}" defer></script>` : ''}</body></html>`;
}
