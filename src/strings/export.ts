/**
 * Renders the CSV string tables as TypeScript source.
 *
 * This runs at build time, not at runtime. Nothing in the component runtime imports it, so its Node
 * and CSV dependencies never reach a browser bundle. It's published rather than kept in scripts/ so
 * that applications sharing these string tables can drive the same conversion.
 */
import { parse } from 'csv-parse/sync';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { format, resolveConfig } from 'prettier';

export type StringsMap = Record<string, string>;

const GENERATED_HEADER = '/* Generated from the CSV files in csv/ by `yarn generate-strings`. Do not edit. */';

/**
 * Loads a CSV strings file into an object, taking keys and values from the first two columns.
 */
export const csvToStrings = (csvData: string): StringsMap => {
  const rows: string[][] = parse(csvData, {
    // Skip header row
    from: 2,
    // Only rows for strings that have comments have 3 fields.
    relax_column_count_less: true,
    // Skip empty "row" that is really just the terminating linefeed
    skip_empty_lines: true,
  });

  return rows.reduce<StringsMap>((result, row) => {
    result[row[0]] = row[1];

    return result;
  }, {});
};

/**
 * Renders a strings object as a TypeScript module that exports a constant called "strings",
 * formatted the way the repository's Prettier configuration wants it so that generating a table and
 * formatting the tree don't fight over the result.
 */
export const stringsToTypeScript = async (stringsMap: StringsMap, targetPath: string): Promise<string> => {
  const source = `${GENERATED_HEADER}\nexport const strings = ${JSON.stringify(stringsMap, null, 2)};\n`;
  const prettierConfig = await resolveConfig(targetPath);

  return format(source, { ...prettierConfig, filepath: targetPath });
};

/**
 * Transforms the English strings table into gibberish, which makes untranslated text obvious
 * without waiting on a translation.
 *
 * 1. Split the English string into whitespace-delimited words.
 * 2. Reverse the order of the words.
 * 3. Render each word as a base64 encoding of its UTF-8 representation, except for words that look
 *    like format string placeholders.
 */
export const generateGibberish = (english: StringsMap): StringsMap =>
  Object.fromEntries(
    Object.entries(english).map(([key, value]) => [
      key,
      value
        .split(' ')
        .reverse()
        .map((word) => (word.startsWith('{') ? word : Buffer.from(word, 'utf-8').toString('base64').replace(/=/g, '')))
        .join(' '),
    ])
  );

const exportStrings = async (
  englishStrings: StringsMap,
  localizedStrings: StringsMap,
  locale: string,
  targetDir: string,
  defaultToEnglish: boolean
): Promise<void> => {
  const stringsMap: StringsMap = {};

  for (const key of Object.keys(englishStrings)) {
    if (key in localizedStrings) {
      stringsMap[key] = localizedStrings[key];
    } else {
      console.warn(`Locale ${locale} has no translation for ${key}`);
      if (defaultToEnglish) {
        stringsMap[key] = englishStrings[key];
      }
    }
  }

  const targetPath = path.resolve(targetDir, `strings-${locale}.ts`);

  await writeFile(targetPath, await stringsToTypeScript(stringsMap, targetPath), { encoding: 'utf-8' });
};

/**
 * Converts a CSV strings file to a TypeScript source file that exports a constant called "strings".
 * This will be an object that has the same keys as the English strings file; the English strings
 * will be used for any keys that aren't translated yet.
 *
 * The filename is assumed to be the locale code with a ".csv" suffix. Converting the English file
 * also writes the gibberish table, which is derived from English rather than translated.
 */
export const convertCsvFile = async (csvPath: string, targetDir: string, defaultToEnglish = true): Promise<void> => {
  if (!csvPath.endsWith('.csv')) {
    throw new Error('Cannot convert a non-CSV file');
  }

  const locale = path.basename(csvPath, '.csv');
  const stringsMap = csvToStrings(await readFile(csvPath, { encoding: 'utf-8' }));

  let englishStringsMap: StringsMap;
  if (locale === 'en') {
    englishStringsMap = stringsMap;
  } else {
    const englishPath = path.resolve(path.dirname(csvPath), 'en.csv');
    englishStringsMap = csvToStrings(await readFile(englishPath, { encoding: 'utf-8' }));
  }

  await exportStrings(englishStringsMap, stringsMap, locale, targetDir, defaultToEnglish);

  if (locale === 'en') {
    await exportStrings(englishStringsMap, generateGibberish(englishStringsMap), 'gx', targetDir, defaultToEnglish);
  }
};

/**
 * Converts the CSV files for all locales to TypeScript source files. The list of locales is
 * determined by the presence of CSV files.
 */
export const convertAllLocales = async (
  csvDir: string,
  stringsDir: string,
  defaultToEnglish = true
): Promise<string[]> => {
  const csvFiles = (await readdir(csvDir)).filter((filename) => filename.endsWith('.csv'));

  await Promise.all(
    csvFiles.map((filename) => convertCsvFile(path.join(csvDir, filename), stringsDir, defaultToEnglish))
  );

  return csvFiles;
};
