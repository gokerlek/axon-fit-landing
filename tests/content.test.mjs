import test from 'node:test';
import assert from 'node:assert/strict';
import { pages } from '../src/pages.mjs';

const html = pages[0].body;

test('one page covers the real trainer, client and camera workflows', () => {
  assert.equal(pages.length, 1);
  for (const phrase of ['Danışan', 'Kütüphane', 'Şablon', 'Program', 'Antrenman', 'İlerleme', 'KAMERA', '2D', 'AI', 'Güncelleme']) {
    assert.match(html, new RegExp(phrase, 'i'), `${phrase} missing`);
  }
  for (const anchor of ['ozellikler', 'kamera', 'veri', 'hakkinda', 'kurulum']) {
    assert.match(html, new RegExp(`id="${anchor}"`));
  }
  assert.match(html, /camera-demo\.png/);
  assert.match(html, /pt-demo\.png/);
  assert.match(html, /client-demo\.png/);
});

test('one page includes deployment, ownership and cost boundaries', () => {
  for (const phrase of ['GitHub', 'Vercel', '/install', 'repo', 'delete_repo', 'workflow', 'OAuth', '/api/auth/github/callback', 'Gemini', 'Production', 'bir antrenör', 'özel', 'ücret', 'aboneliği', 'Hobby', 'ticari olmayan', 'internet']) {
    assert.match(html, new RegExp(phrase, 'i'), `${phrase} missing`);
  }
  assert.doesNotMatch(html, /<input\b/i);
});
