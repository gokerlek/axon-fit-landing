import { copyFile, cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages } from '../src/pages.mjs';
import { renderPage } from '../src/layout.mjs';

const siteRoot = fileURLToPath(new URL('..', import.meta.url));
const origin = new URL(process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:4173')).origin;

export async function buildSite(output = join(siteRoot, 'dist')) {
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  for (const page of pages) {
    const destination = join(output, page.path, 'index.html');
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, renderPage(page, origin));
  }
  await copyFile(join(siteRoot, 'src', 'site.css'), join(output, 'site.css'));
  await copyFile(join(siteRoot, 'src', 'site-motion.js'), join(output, 'site-motion.js'));
  await copyFile(join(siteRoot, 'node_modules', 'motion', 'dist', 'motion.js'), join(output, 'motion.js'));
  await copyFile(join(siteRoot, 'node_modules', 'motion', 'LICENSE.md'), join(output, 'motion-license.txt'));
  await cp(join(siteRoot, 'public'), output, { recursive: true });
  await writeFile(join(output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  await writeFile(join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page => `<url><loc>${origin}/${page.path}</loc></url>`).join('')}</urlset>`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === fileURLToPath(new URL(`file://${process.argv[1]}`))) {
  await buildSite();
}
