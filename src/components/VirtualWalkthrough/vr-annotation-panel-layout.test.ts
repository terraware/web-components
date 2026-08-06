import { wrapText } from './vr-annotation-panel-layout';

// Each character is 1 unit wide; a space counts as a character within a line.
const measure = (s: string) => s.length;

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
