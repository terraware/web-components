import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

const index = JSON.parse(readFileSync('public/index.json', 'utf8')) as {
  entries: Record<string, { id: string; type: string; tags: string[] }>;
};

const fontFiles = new Map(
  [400, 500, 600].map((weight) => [
    `/screenshot-fonts/inter-${weight}.woff2`,
    `node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff2`,
  ])
);
const fontCss = [400, 500, 600]
  .map(
    (weight) => `@font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: ${weight};
      font-display: block;
      src: url('http://127.0.0.1:6006/screenshot-fonts/inter-${weight}.woff2') format('woff2');
    }`
  )
  .join('\n');

for (const story of Object.values(index.entries)) {
  if (story.type !== 'story' || story.tags.includes('no-screenshot')) {
    continue;
  }
  test(story.id, async ({ page }) => {
    await page.clock.setFixedTime(new Date('2025-01-15T12:00:00Z'));
    await page.route('**/*', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const fontPath = fontFiles.get(url.pathname);
      if (url.hostname === 'fonts.googleapis.com') {
        await route.fulfill({ body: fontCss, contentType: 'text/css' });
      } else if (url.origin === 'http://127.0.0.1:6006' && fontPath) {
        await route.fulfill({ path: fontPath, contentType: 'font/woff2' });
      } else if (url.origin === 'http://127.0.0.1:6006') {
        await route.continue();
      } else if (request.resourceType() === 'image') {
        await route.fulfill({ path: 'playwright/fixtures/landscape.svg', contentType: 'image/svg+xml' });
      } else {
        await route.abort();
      }
    });
    await page.addInitScript(() => {
      let seed = 42;
      Math.random = () => {
        seed = (seed * 16807) % 2147483647;

        return (seed - 1) / 2147483646;
      };
    });
    await page.goto(`/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story`);
    await expect(page.locator('#storybook-root > *').first()).toBeAttached();
    await page.waitForLoadState('networkidle');
    await page.evaluate(async () => {
      await Promise.all([400, 500, 600].map((weight) => document.fonts.load(`${weight} 16px Inter`)));
      await document.fonts.ready;
      await Promise.all(Array.from(document.images).map((image) => image.decode()));
    });
    expect(
      await page.evaluate(() =>
        [400, 500, 600].every((weight) =>
          Array.from(document.fonts).some(
            (font) => font.family === 'Inter' && font.weight === String(weight) && font.status === 'loaded'
          )
        )
      )
    ).toBe(true);
    await expect(page).toHaveScreenshot(`${story.id}.png`, {
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.001,
      mask: [page.locator('canvas, .mapboxgl-map')],
    });
  });
}
