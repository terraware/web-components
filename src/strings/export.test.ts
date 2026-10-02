import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { classifyKeys, csvToStrings, findAccessedKeys, findSourceFiles, findUnusedStrings, formatUnusedStrings } from './export';


test('csvToStrings skips the header and maps the first two columns', () => {
  const csv = `key,value,comment
SAVE,Save,Button label
CANCEL,Cancel,Button label
`;

  expect(csvToStrings(csv)).toEqual({
    SAVE: 'Save',
    CANCEL: 'Cancel',
  });
});

test('csvToStrings accepts rows with optional comments and ignores empty lines', () => {
  const csv = `key,value,comment
SAVE,Save,Button label

CANCEL,Cancel

`;

  expect(csvToStrings(csv)).toEqual({
    SAVE: 'Save',
    CANCEL: 'Cancel',
  });
});

test('csvToStrings preserves quoted CSV values', () => {
  const csv = `key,value,comment
GREETING,"Hello, ""friend""",Punctuation
MULTILINE,"First line
Second line",Line break
`;

  expect(csvToStrings(csv)).toEqual({
    GREETING: 'Hello, "friend"',
    MULTILINE: 'First line\nSecond line',
  });
});

let rootDir: string;

const writeFiles = async (files: Record<string, string>) => {
  for (const [relativePath, content] of Object.entries(files)) {
    const filePath = path.join(rootDir, relativePath);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, content, { encoding: 'utf-8' });
  }
};

beforeEach(async () => {
  rootDir = await mkdtemp(path.join(os.tmpdir(), 'unused-strings-'));
});

afterEach(async () => {
  await rm(rootDir, { recursive: true, force: true });
});

describe('findAccessedKeys', () => {
  test('finds property reads from the strings table', () => {
    const source = `
      const label = strings.SAVE;
      const message = strings.formatString(strings.GO_TO, strings?.PEOPLE);
      const wrapped = strings
        .CANCEL;
    `;

    expect(findAccessedKeys(source)).toEqual(['SAVE', 'formatString', 'GO_TO', 'PEOPLE', 'CANCEL']);
  });

  test('finds quoted keys inside index expressions', () => {
    const source = `
      strings['DELETE'];
      strings["EDIT"];
      strings[isRead ? 'MARK_AS_UNREAD' : 'MARK_AS_READ'];
      strings?.[\`ARCHIVE\`];
    `;

    expect(findAccessedKeys(source)).toEqual(['DELETE', 'EDIT', 'MARK_AS_UNREAD', 'MARK_AS_READ', 'ARCHIVE']);
  });

  test('ignores keys that are not read from the strings table', () => {
    const source = `
      type XrMode = 'AR' | 'VR';
      const url = 'https://example.com/EDIT.png';
      // strings table entry for SAVE
      const total = otherStrings.TOTAL + myStrings['COUNT'] + strings[label];
    `;

    expect(findAccessedKeys(source)).toEqual([]);
  });
});

describe('classifyKeys', () => {
  test('treats keys read from the strings table as used', () => {
    const sources = ['const label = strings.SAVE;', "title={strings['CANCEL']}"];

    expect(classifyKeys(['SAVE', 'CANCEL'], sources)).toEqual({ unused: [], possiblyUnused: [] });
  });

  test('reports keys missing from every source as unused', () => {
    expect(classifyKeys(['SAVE', 'DELETE'], ['strings.SAVE'])).toEqual({ unused: ['DELETE'], possiblyUnused: [] });
  });

  test('reports keys found only inside longer keys as unused', () => {
    expect(classifyKeys(['DIAMETER_CM'], ['strings.CROWN_DIAMETER_CM'])).toEqual({
      unused: ['DIAMETER_CM'],
      possiblyUnused: [],
    });
  });

  test('reports keys whose names appear only outside the strings table as possibly unused', () => {
    const sources = ["type XrMode = 'AR' | 'VR';", "const label = 'TREES'; strings[label];"];

    expect(classifyKeys(['AR', 'TREES'], sources)).toEqual({ unused: [], possiblyUnused: ['AR', 'TREES'] });
  });

  test('counts a key as used if any source reads it from the strings table', () => {
    const sources = ["type XrMode = 'AR' | 'VR';", 'strings.AR'];

    expect(classifyKeys(['AR'], sources)).toEqual({ unused: [], possiblyUnused: [] });
  });

  test('preserves the order of the keys it was given', () => {
    expect(classifyKeys(['C', 'A', 'B'], [''])).toEqual({ unused: ['C', 'A', 'B'], possiblyUnused: [] });
  });

  test('reports every key as unused when there are no sources', () => {
    expect(classifyKeys(['SAVE'], [])).toEqual({ unused: ['SAVE'], possiblyUnused: [] });
  });
});

describe('findSourceFiles', () => {
  test('finds files with matching extensions in nested directories', async () => {
    await writeFiles({
      'a.ts': '',
      'nested/b.tsx': '',
      'nested/deeper/c.js': '',
      'nested/styles.scss': '',
      'README.md': '',
    });

    expect(await findSourceFiles(rootDir)).toEqual(
      [path.join(rootDir, 'a.ts'), path.join(rootDir, 'nested/b.tsx'), path.join(rootDir, 'nested/deeper/c.js')].sort()
    );
  });

  test('skips the strings directory at any depth by default', async () => {
    await writeFiles({
      'strings/strings-en.ts': '',
      'feature/strings/table.ts': '',
      'feature/component.tsx': '',
    });

    expect(await findSourceFiles(rootDir)).toEqual([path.join(rootDir, 'feature/component.tsx')]);
  });

  test('honors custom extensions and excluded directories', async () => {
    await writeFiles({
      'a.ts': '',
      'b.mjs': '',
      'strings/c.mjs': '',
      'generated/d.mjs': '',
    });

    expect(await findSourceFiles(rootDir, ['.mjs'], ['generated'])).toEqual([
      path.join(rootDir, 'b.mjs'),
      path.join(rootDir, 'strings/c.mjs'),
    ]);
  });
});

describe('findUnusedStrings', () => {
  test('classifies every key in the CSV against the source directory', async () => {
    await writeFiles({
      'csv/en.csv': `key_name,en,comment
SAVE,Save,
DELETE,Delete,
DIAMETER_CM,Diameter (cm),
EDIT,Edit,
CONFIRM,"Are you sure?
This can't be undone.",
`,
      'src/Form.tsx': "strings.SAVE; strings.CROWN_DIAMETER_CM; const icon = 'EDIT';",
      'src/strings/strings-en.ts': 'DELETE CONFIRM',
    });

    expect(await findUnusedStrings({ csvPath: path.join(rootDir, 'csv/en.csv'), sourceDir: path.join(rootDir, 'src') }))
      .toEqual({ unused: ['DELETE', 'DIAMETER_CM', 'CONFIRM'], possiblyUnused: ['EDIT'] });
  });
});

describe('formatUnusedStrings', () => {
  test('says so when nothing is unused', () => {
    expect(formatUnusedStrings({ unused: [], possiblyUnused: [] })).toBe('No unused entries found.\n');
  });

  test('lists unused keys', () => {
    expect(formatUnusedStrings({ unused: ['SAVE', 'DELETE'], possiblyUnused: [] })).toBe(
      'Unused entries found:\nSAVE\nDELETE\n'
    );
  });

  test('lists possibly unused keys in their own section', () => {
    expect(formatUnusedStrings({ unused: [], possiblyUnused: ['DIAMETER_CM'] })).toBe(
      'No unused entries found.\n\nPossibly unused entries (never read from strings, but the name appears elsewhere; check manually):\nDIAMETER_CM\n'
    );
  });

  test('lists both sections together', () => {
    expect(formatUnusedStrings({ unused: ['SAVE'], possiblyUnused: ['DIAMETER_CM'] })).toBe(
      'Unused entries found:\nSAVE\n\nPossibly unused entries (never read from strings, but the name appears elsewhere; check manually):\nDIAMETER_CM\n'
    );
  });
});
