/**
 * Greedily wraps `text` into lines no wider than `maxWidth`, using `measure` to size
 * each candidate line. A single word wider than `maxWidth` still gets its own line.
 */
export const wrapText = (text: string, maxWidth: number, measure: (segment: string) => number): string[] => {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (!current || measure(candidate) <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  });

  if (current) {
    lines.push(current);
  }

  return lines;
};
