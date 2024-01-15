import { Language, Locale } from '@myex/types/i18n';

export const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'zh',
    name: '中文',
  },
];

export const locales: Locale[] = languages.map((language) => language.code);

export const defaultLocale: Locale = 'en';
