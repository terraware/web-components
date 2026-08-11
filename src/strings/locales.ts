export interface LocaleDetails {
  /**
   * Locale identifier. This must start with a language tag (2 or 3 letters) and may optionally
   * have a hyphen and a location code. For example, 'en' or 'en-US'.
   */
  id: string;
  /**
   * Name of the locale as it appears in a locale selector. This will typically be the name of the
   * locale in whatever language the locale uses. That is, 'Español' and not 'Spanish'.
   */
  name: string;
  /**
   * Whether this locale is in development and not ready for production.
   */
  inDevelopment?: boolean;
}

/** Supported locales in the order they should appear in a locale selector. */
export const supportedLocales: LocaleDetails[] = [
  { id: 'en', name: 'English' },
  { id: 'es', name: 'Español' },
  { id: 'fr', name: 'Français' },
  { id: 'gx', name: 'Gibberish', inDevelopment: true },
];

/**
 * Returns the locales that should be offered to users. Locales still in development are left out
 * unless they're asked for, which is how a consumer exposes them outside of production.
 */
export const getSupportedLocales = (includeInDevelopment = false): LocaleDetails[] =>
  includeInDevelopment ? supportedLocales : supportedLocales.filter((locale) => !locale.inDevelopment);

/**
 * Returns the locale from a list of locales that matches the user's selected language.
 *
 * The user's locale can include both a language and a country code, but entries in a list of
 * languages usually don't have country codes. So we need to find the entry that is the longest
 * prefix of the user's locale.
 *
 * If the locale is es-MX and the list of locales only has es, we want the es item to be selected.
 * But if the locale is zh-CN and the list has both zh-CN and zh-TW, we want zh-CN to be selected.
 *
 * If none of the locales in the list matches, returns the first locale from the list. The list
 * must not be empty.
 */
export const findLocaleDetails = (locales: LocaleDetails[], locale: string): LocaleDetails =>
  locales.reduce((bestMatch, candidate) =>
    // The best match so far is only worth keeping if it's a prefix of the requested locale too.
    // reduce() seeds with the first locale without checking it, so a leading 'en-US' would
    // otherwise be treated as a match for 'en' and never replaced.
    locale.startsWith(candidate.id) && (!locale.startsWith(bestMatch.id) || candidate.id.length > bestMatch.id.length)
      ? candidate
      : bestMatch
  );
