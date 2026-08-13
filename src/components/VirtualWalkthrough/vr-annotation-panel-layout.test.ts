import {
  BODY_LINE_HEIGHT,
  CHIP_HEIGHT,
  IMAGE_BAND_HEIGHT,
  PANEL_MAX_HEIGHT,
  PANEL_MIN_HEIGHT,
  PANEL_PAD_Y,
  TITLE_LINE_HEIGHT,
  layoutPanel,
  wrapText,
} from './vr-annotation-panel-layout';

// Each character is 1 unit wide; a space counts as a character within a line.
const measure = (s: string) => s.length;

const layout = (overrides: Partial<Parameters<typeof layoutPanel>[0]> = {}) =>
  layoutPanel({ title: 'Title', imageCount: 0, contentWidth: 100, measure: (text) => text.length, ...overrides });

describe('wrapText', () => {
  it('returns an empty array for empty or whitespace-only input', () => {
    expect(wrapText('', 10, measure)).toEqual([]);
    expect(wrapText('   ', 10, measure)).toEqual([]);
  });

  it('keeps text on one line when it fits', () => {
    expect(wrapText('hello world', 11, measure)).toEqual(['hello world']);
  });

  it('wraps to a new line when the next word would exceed the width', () => {
    // 'hello world' is 11 wide; width 10 forces a break before 'world'.
    expect(wrapText('hello world', 10, measure)).toEqual(['hello', 'world']);
  });

  it('packs as many words as fit per line greedily', () => {
    expect(wrapText('a bb cc d', 5, measure)).toEqual(['a bb', 'cc d']);
  });

  it('puts an over-long word on its own line rather than dropping it', () => {
    expect(wrapText('tiny enormouslylongword end', 8, measure)).toEqual(['tiny', 'enormouslylongword', 'end']);
  });

  it('collapses runs of whitespace', () => {
    expect(wrapText('a    b', 10, measure)).toEqual(['a b']);
  });
});

describe('layoutPanel', () => {
  it('sizes a text-only panel to its content rather than the full panel height', () => {
    const body = Array.from({ length: 4 }, () => 'body').join(' ');
    const result = layout({ title: 'Title', bodyText: body, contentWidth: 4 });

    const titleBottom = PANEL_PAD_Y + TITLE_LINE_HEIGHT;
    expect(result.body.lines).toHaveLength(4);
    expect(result.height).toBe(result.body.y + 4 * BODY_LINE_HEIGHT + PANEL_PAD_Y);
    expect(result.body.y).toBeGreaterThan(titleBottom);
    expect(result.height).toBeLessThan(PANEL_MAX_HEIGHT);
  });

  it('never shrinks below the minimum height', () => {
    expect(layout({ title: 'Hi' }).height).toBe(PANEL_MIN_HEIGHT);
  });

  it('places the title at the top when there is no image or label', () => {
    const result = layout();

    expect(result.image).toBeNull();
    expect(result.chip).toBeNull();
    expect(result.title.y).toBe(PANEL_PAD_Y);
    expect(result.title.lines).toEqual(['Title']);
  });

  it('reserves a fixed image band above the text so it holds still while images load', () => {
    const result = layout({ imageCount: 1 });

    expect(result.image).toEqual({ y: PANEL_PAD_Y, height: IMAGE_BAND_HEIGHT });
    expect(result.title.y).toBeGreaterThanOrEqual(PANEL_PAD_Y + IMAGE_BAND_HEIGHT);
  });

  it('positions pagination dots below the image band only when there are several images', () => {
    expect(layout({ imageCount: 1 }).dotsY).toBeNull();

    const result = layout({ imageCount: 3 });
    expect(result.dotsY).toBeGreaterThan(PANEL_PAD_Y + IMAGE_BAND_HEIGHT);
    expect(result.title.y).toBeGreaterThan(result.dotsY!);
  });

  it('sizes the label chip from the measured label and pushes the title below it', () => {
    const result = layout({ label: 'Oak' });

    expect(result.chip).toEqual({ y: PANEL_PAD_Y, width: 'Oak'.length + 32, height: CHIP_HEIGHT });
    expect(result.title.y).toBeGreaterThanOrEqual(PANEL_PAD_Y + CHIP_HEIGHT);
  });

  it('drops body lines that would overflow the maximum height and clamps to it', () => {
    const body = Array.from({ length: 200 }, () => 'body').join(' ');
    const result = layout({ bodyText: body, contentWidth: 4 });

    expect(result.height).toBe(PANEL_MAX_HEIGHT);
    expect(result.body.y + result.body.lines.length * BODY_LINE_HEIGHT).toBeLessThanOrEqual(PANEL_MAX_HEIGHT);
    expect(result.body.lines.length).toBeLessThan(200);
  });

  it('drops title lines that would overflow the maximum height', () => {
    const title = Array.from({ length: 200 }, () => 'title').join(' ');
    const result = layout({ title, contentWidth: 5 });

    expect(result.height).toBe(PANEL_MAX_HEIGHT);
    expect(result.title.y + result.title.lines.length * TITLE_LINE_HEIGHT).toBeLessThanOrEqual(PANEL_MAX_HEIGHT);
  });
});
