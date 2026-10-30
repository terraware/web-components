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
    let fontsReady: Promise<unknown> | undefined;
    await page.route('**/*', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      const fontPath = fontFiles.get(url.pathname);
      if (url.hostname === 'fonts.googleapis.com') {
        await route.fulfill({ body: fontCss, contentType: 'text/css' });
      } else if (url.hostname === 'api.mapbox.com' && url.pathname.startsWith('/styles/v1/')) {
        await route.fulfill({ json: { version: 8, sources: {}, layers: [] } });
      } else if (url.origin === 'http://127.0.0.1:6006' && fontPath) {
        await route.fulfill({ path: fontPath, contentType: 'font/woff2' });
      } else if (url.origin === 'http://127.0.0.1:6006') {
        if (request.resourceType() === 'script') {
          fontsReady ??= page.evaluate(async () => {
            await Promise.all(
              [400, 500, 600].map(async (weight) => {
                const font = new FontFace('Inter', `url('/screenshot-fonts/inter-${weight}.woff2')`, {
                  weight: String(weight),
                });
                document.fonts.add(await font.load());
              })
            );
          });
          await fontsReady;
        }
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
    await page.goto(`/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story&args=token:pk-screenshot`);
    await expect(page.locator('#storybook-root > *').first()).toBeAttached();
    await page.waitForLoadState('networkidle');
    if (['mapbox--default', 'mapcomponent--default', 'mapmarker--default'].includes(story.id)) {
      await expect(page.getByRole('button', { name: 'Zoom in', exact: true })).toBeVisible();
    }
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
    const clip = await page.evaluate(() => {
      const bounds: DOMRect[] = [];
      const visible = (element: Element): boolean => {
        for (let parent: Element | null = element; parent; parent = parent.parentElement) {
          const style = getComputedStyle(parent);
          if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) {
            return false;
          }
        }

        return true;
      };
      const add = (rect: DOMRect, container: Element | null) => {
        let { left, top, right: clippedRight, bottom: clippedBottom } = rect;
        for (let parent = container; parent && parent !== document.body; parent = parent.parentElement) {
          const style = getComputedStyle(parent);
          const parentRect = parent.getBoundingClientRect();
          if (style.overflowX !== 'visible') {
            left = Math.max(left, parentRect.left);
            clippedRight = Math.min(clippedRight, parentRect.right);
          }
          if (style.overflowY !== 'visible') {
            top = Math.max(top, parentRect.top);
            clippedBottom = Math.min(clippedBottom, parentRect.bottom);
          }
        }
        if (clippedRight > left && clippedBottom > top) {
          bounds.push(new DOMRect(left, top, clippedRight - left, clippedBottom - top));
        }
      };
      const transparent = (color: string) => color === 'transparent' || color === 'rgba(0, 0, 0, 0)';
      for (const element of document.body.querySelectorAll('*')) {
        if (element.closest('script, style, link, [hidden]') || !visible(element)) {
          continue;
        }
        const style = getComputedStyle(element);
        const painted =
          !transparent(style.backgroundColor) ||
          style.backgroundImage !== 'none' ||
          style.boxShadow !== 'none' ||
          ['Top', 'Right', 'Bottom', 'Left'].some(
            (side) =>
              parseFloat(style.getPropertyValue(`border-${side.toLowerCase()}-width`)) > 0 &&
              !transparent(style.getPropertyValue(`border-${side.toLowerCase()}-color`))
          );
        if (painted || element.matches('img, svg, canvas, input, textarea, select, video')) {
          add(element.getBoundingClientRect(), element.parentElement);
        }
        for (const node of element.childNodes) {
          if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
            const range = document.createRange();
            range.selectNodeContents(node);
            for (const rect of range.getClientRects()) {
              add(rect, element);
            }
          }
        }
      }
      const width = Math.max(document.documentElement.scrollWidth, innerWidth);
      const height = Math.max(document.documentElement.scrollHeight, innerHeight);
      if (!bounds.length) {
        return { x: 0, y: 0, width, height };
      }
      const x = Math.max(0, Math.floor(Math.min(...bounds.map((rect) => rect.left)) + scrollX - 16));
      const y = Math.max(0, Math.floor(Math.min(...bounds.map((rect) => rect.top)) + scrollY - 16));
      const right = Math.min(width, Math.ceil(Math.max(...bounds.map((rect) => rect.right)) + scrollX + 16));
      const bottom = Math.min(height, Math.ceil(Math.max(...bounds.map((rect) => rect.bottom)) + scrollY + 16));

      return { x, y, width: right - x, height: bottom - y };
    });
    await page.addStyleTag({ content: 'canvas { visibility: hidden !important; }' });
    await expect(page).toHaveScreenshot(`${story.id}.png`, {
      clip,
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.001,
    });
  });
}
