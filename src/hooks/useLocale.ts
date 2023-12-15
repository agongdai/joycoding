'use client';
import { usePathname } from 'next/navigation';
import _compact from 'lodash/compact';

import { locales } from '@jses/i18n/config';
import { Locale } from '@jses/types/i18n';

export default function useLocale() {
  const pathName = usePathname();
  const segments = _compact(pathName.split('/'));

  if (!segments || segments.length <= 0) {
    return {
      locale: '',
      pathName: '/' + segments.join('/'),
    };
  }

  const localeInUrl: Locale = segments[0] as Locale;
  const isLocaleInUrl = locales.includes(localeInUrl);
  const locale = isLocaleInUrl ? localeInUrl : '';

  return {
    locale,
    pathName: '/' + segments.slice(isLocaleInUrl ? 1 : 0).join('/'),
  };
}
