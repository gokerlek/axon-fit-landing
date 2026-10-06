import test from 'node:test';
import assert from 'node:assert/strict';
import { buildSite } from '../scripts/build.mjs';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DEMO_URL } from '../src/content.mjs';

test('builds one responsive marketing page with the real demo and setup links', async () => {
  const output = await mkdtemp(join(tmpdir(), 'axon-site-'));
  try {
    await buildSite(output);
    const html = await readFile(join(output, 'index.html'), 'utf8');
    assert.match(html, /<main\b/);
    assert.match(html, /href="\/#ozellikler"/);
    assert.match(html, /href="\/#kurulum"/);
    assert.ok(html.includes(`href="${DEMO_URL}" target="_blank"`));
    assert.match(html, /Vercel’de kur/);
    assert.match(html, /camera-demo\.png/);
    assert.match(html, /src="\/motion\.js"/);
    assert.match(html, /src="\/site-motion\.js"/);
    assert.doesNotMatch(html, /href="\/(?:ozellikler|kurulum|hakkinda)\/"/);
    assert.doesNotMatch(html, /<input[^>]+(?:token|secret|password)/i);
    await stat(join(output, 'camera-demo.png'));
    await stat(join(output, 'motion.js'));
    await stat(join(output, 'site-motion.js'));
    await assert.rejects(stat(join(output, 'ozellikler')), { code: 'ENOENT' });
    const sitemap = await readFile(join(output, 'sitemap.xml'), 'utf8');
    assert.match(sitemap, /<loc>http:\/\/localhost:4173\/<\/loc>/);
    assert.doesNotMatch(sitemap, /\/demo\//);
    assert.doesNotMatch(sitemap, /\/ozellikler\//);
    assert.match(await readFile(join(output, 'robots.txt'), 'utf8'), /Sitemap:/);
  } finally {
    await rm(output, { recursive: true, force: true });
  }
});
