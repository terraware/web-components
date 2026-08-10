import { LocaleDetails, findLocaleDetails, getSupportedLocales, supportedLocales } from './locales';

const locales = (...ids: string[]): LocaleDetails[] => ids.map((id) => ({ id, name: id }));

test('findLocaleDetails matches an exact locale', () => {
  expect(findLocaleDetails(locales('en', 'es', 'fr'), 'es').id).toBe('es');
});

test('findLocaleDetails matches a language whose locale carries a region', () => {
  expect(findLocaleDetails(locales('en', 'es', 'fr'), 'es-MX').id).toBe('es');
});

test('findLocaleDetails prefers the longest matching prefix', () => {
  expect(findLocaleDetails(locales('zh', 'zh-CN', 'zh-TW'), 'zh-CN').id).toBe('zh-CN');
  expect(findLocaleDetails(locales('zh', 'zh-CN', 'zh-TW'), 'zh-HK').id).toBe('zh');
});

test('findLocaleDetails ignores a locale the request is not a prefix of, whatever its position', () => {
  expect(findLocaleDetails(locales('en-US', 'en'), 'en').id).toBe('en');
  expect(findLocaleDetails(locales('en', 'en-US'), 'en').id).toBe('en');
});

test('findLocaleDetails does not depend on the order of the locales', () => {
  expect(findLocaleDetails(locales('zh-CN', 'zh', 'zh-TW'), 'zh-CN').id).toBe('zh-CN');
  expect(findLocaleDetails(locales('zh-TW', 'zh-CN', 'zh'), 'zh-CN').id).toBe('zh-CN');
});

test('findLocaleDetails falls back to the first locale when nothing matches', () => {
  expect(findLocaleDetails(locales('en', 'es', 'fr'), 'ja').id).toBe('en');
});

test('getSupportedLocales leaves out in-development locales by default', () => {
  const ids = getSupportedLocales().map((locale) => locale.id);

  expect(ids).not.toContain('gx');
  expect(ids).toContain('en');
});

test('getSupportedLocales includes in-development locales when asked', () => {
  expect(getSupportedLocales(true)).toEqual(supportedLocales);
  expect(getSupportedLocales(true).map((locale) => locale.id)).toContain('gx');
});
