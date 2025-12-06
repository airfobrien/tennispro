/**
 * i18n configuration
 * Supported locales: English, Spanish, French, Portuguese
 */

export const locales = ['en', 'es', 'fr', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
};

export const localeCurrencies: Record<Locale, string> = {
  en: 'USD',
  es: 'EUR',
  fr: 'EUR',
  pt: 'BRL',
};

export const localeCountries: Record<Locale, string> = {
  en: 'US',
  es: 'ES',
  fr: 'FR',
  pt: 'BR',
};
