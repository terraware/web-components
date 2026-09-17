import { csvToStrings } from './export';

// Jest 27 does not resolve the package's conditional subpath export, so expose its real CJS build.
jest.mock('csv-parse/sync', () => jest.requireActual('csv-parse/dist/cjs/sync.cjs'), { virtual: true });
// Prettier's ESM loader is unrelated to CSV parsing and is unsupported by this Jest version.
jest.mock('prettier', () => ({ format: jest.fn(), resolveConfig: jest.fn() }));

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
