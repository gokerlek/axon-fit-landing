import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const source = await readFile(new URL('../src/site-motion.js', import.meta.url), 'utf8');

test('reduced motion leaves page content visible and starts no animations', () => {
  const dataset = {};
  const context = {
    document: { documentElement: { dataset } },
    window: {
      Motion: { animate: () => assert.fail('animation should not start') },
      matchMedia: () => ({ matches: true }),
    },
  };

  runInNewContext(source, context);
  assert.equal(dataset.motion, 'reduced');
});
