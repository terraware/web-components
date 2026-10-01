/**
 * Lists keys in src/strings/csv/en.csv that nothing in src references.
 */
import { findUnusedStrings, formatUnusedStrings } from '../src/strings/export.ts';

const result = await findUnusedStrings({ csvPath: 'src/strings/csv/en.csv', sourceDir: 'src' });

process.stdout.write(formatUnusedStrings(result));
