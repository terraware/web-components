/**
 * Generates the string table for every locale that has a CSV strings file.
 *
 * Run this after editing src/strings/csv/en.csv, or after pulling new translations with
 * `yarn translate`. The generator itself lives in src so that it ships with the package.
 */
import { convertAllLocales } from '../src/strings/export.ts';

const csvFiles = await convertAllLocales('src/strings/csv', 'src/strings');

process.stdout.write(`Generated string tables from ${csvFiles.sort().join(', ')}\n`);
