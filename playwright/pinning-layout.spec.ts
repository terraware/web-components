import { expect, test } from '@playwright/test';

test('keeps both pin groups adjacent with intrinsic widths, resizing, and horizontal scrolling', async ({
  page,
}, testInfo) => {
  await page.addInitScript(() => {
    const NativeResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class extends NativeResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        super((entries, observer) => requestAnimationFrame(() => callback(entries, observer)));
      }
    };
  });
  await page.route('**/*', (route) =>
    new URL(route.request().url()).origin === 'http://127.0.0.1:6006' ? route.continue() : route.abort()
  );
  await page.goto('/iframe.html?id=editable-table-v2--with-oversized-pinned-content&viewMode=story');
  const container = page.locator('.MuiTableContainer-root');
  const table = container.locator('table');
  const positions = () =>
    page.getByRole('columnheader').evaluateAll((headers) =>
      headers.map((header) => {
        const { x, right, width } = header.getBoundingClientRect();

        return { x, right, width };
      })
    );
  const pinGap = (cells: Awaited<ReturnType<typeof positions>>) =>
    Math.max(Math.abs(cells[0].right - cells[1].x), Math.abs(cells[3].right - cells[4].x));
  await expect(page.getByRole('columnheader')).toHaveCount(5);
  for (const width of [2400, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    const maxScroll = await container.evaluate((element) => element.scrollWidth - element.clientWidth);
    if (width === 2400) {
      expect(maxScroll).toBe(0);
      expect(Math.abs((await table.boundingBox())!.width - (await container.boundingBox())!.width)).toBeLessThan(1);
    } else {
      expect(maxScroll).toBeGreaterThan(0);
    }
    await expect
      .poll(async () => {
        const before = await positions();
        await page.evaluate(async () => {
          await document.fonts.ready;
          await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        });
        const after = await positions();

        return Math.max(
          pinGap(after),
          ...after.map((cell, index) =>
            Math.max(Math.abs(cell.x - before[index].x), Math.abs(cell.width - before[index].width))
          )
        );
      })
      .toBeLessThan(1);
    const initial = await positions();
    expect(initial[0].width).toBeGreaterThan(120);
    expect(initial[4].width).toBeGreaterThan(240);
    expect(initial[0].width + initial[1].width + initial[3].width + initial[4].width).toBeLessThan(
      await container.evaluate((element) => element.clientWidth)
    );
    for (const scroll of [0, maxScroll / 2, maxScroll]) {
      await container.evaluate((element, left) => {
        element.scrollLeft = left;
      }, scroll);
      await page.screenshot({ path: testInfo.outputPath(`pinned-${width}-${Math.round(scroll)}.png`) });
      await expect.poll(async () => pinGap(await positions())).toBeLessThan(1);
      const cells = await positions();
      for (const index of [0, 1, 3, 4]) {
        expect(cells[index].x).toBeCloseTo(initial[index].x, 0);
      }
    }
  }
});
