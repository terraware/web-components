import { useSyncExternalStore } from 'react';

import { LocaleDetails, findLocaleDetails, supportedLocales } from './locales';
import { strings as en } from './strings-en';
import { strings as gx } from './strings-gx';

/**
 * The set of strings every locale provides. The English table is the source of truth for the list
 * of keys.
 */
export type ComponentStrings = typeof en;

const tables: Partial<Record<string, ComponentStrings>> = { en, gx };

/**
 * Locales we have a bundled string table for. A locale can be supported -- listed in a locale
 * selector -- before its table lands, and resolving against the tables we actually have keeps
 * `getLocale` and `getStrings` describing the same language.
 */
const localesWithTables = (): LocaleDetails[] => supportedLocales.filter((locale) => locale.id in tables);

let currentLocale = 'en';
let currentStrings = en;

const listeners = new Set<() => void>();

/**
 * Sets the locale these components render in. Consumers own the locale -- a component library has
 * no reliable way to know whether the browser's language or a user's profile setting should win --
 * so nothing here changes until an application calls this. Accepts a bare language tag or one with
 * a region ('es' or 'es-MX').
 */
export const setLocale = (locale: string): void => {
  const resolved = findLocaleDetails(localesWithTables(), locale).id;
  if (resolved === currentLocale) {
    return;
  }

  currentLocale = resolved;
  currentStrings = tables[resolved] ?? en;
  listeners.forEach((notify) => notify());
};

/** The resolved locale, which is also the locale to hand to Intl and other formatters. */
export const getLocale = (): string => currentLocale;

/**
 * The current string table. For components, prefer `useStrings`, which re-renders on a locale
 * change; this is for the imperative code that can't hold a hook, such as PlayCanvas scripts.
 */
export const getStrings = (): ComponentStrings => currentStrings;

const subscribe = (notify: () => void): (() => void) => {
  listeners.add(notify);

  return () => {
    listeners.delete(notify);
  };
};

export const useStrings = (): ComponentStrings => useSyncExternalStore(subscribe, getStrings, getStrings);
