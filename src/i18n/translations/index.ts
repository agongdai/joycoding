import { Locale } from '@jses/types/i18n';

import 'server-only';

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  zh: () => import('./zh.json').then((module) => module.default),
};

export const getTranslations = async (locale: Locale) => {
  const loader = dictionaries[locale];
  return loader && loader();
};
