import test from 'node:test';
import assert from 'node:assert/strict';
import { pages } from '../src/pages.mjs';
import { renderPage } from '../src/layout.mjs';
import { DEPLOY_URL } from '../src/content.mjs';

test('every Vercel install action opens the app clone flow', () => {
  for (const page of pages) {
    const html = renderPage(page, 'https://axon.example');
    assert.match(html, new RegExp(`class="header-cta" href="${DEPLOY_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`));
    assert.match(html, /href="\/#kurulum"/);
  }
});

test('external links opened in a new tab include noreferrer', () => {
  const external = pages.map(page => renderPage(page, 'https://axon.example')).join('');
  for (const anchor of external.match(/<a\b[^>]*target="_blank"[^>]*>/g) ?? []) {
    assert.match(anchor, /rel="noopener noreferrer"/);
  }
});
