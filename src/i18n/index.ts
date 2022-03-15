import { ru } from 'src/i18n/dictionaries/ru';

/**
 * As keys are used BCP 47 locale identifiers
 * (see ECMAScript Intl standard)
 */
export const locales = {
  ru: {
    title: 'Русский',
    dictionary: ru,
  },
} as const;

export const LOCALES: Locales[] = Object.keys(locales) as never[];
export const defaultLocale: Locales = 'ru';
export const defaultDictionary = locales[defaultLocale].dictionary;

export type Locales = keyof typeof locales;
export type Dictionary = typeof defaultDictionary;
export type DictionaryKey = keyof Dictionary;
