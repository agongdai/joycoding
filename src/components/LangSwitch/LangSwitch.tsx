'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import JsesDropdown from '@jses/components/JsesDropdown';
import useLocale from '@jses/hooks/useLocale';
import { defaultLocale, languages } from '@jses/i18n/config';
import TranslateIcon from '@mui/icons-material/Translate';
import { IconButton } from '@mui/material';

export default function LangSwitch() {
  const { locale, pathName } = useLocale();
  const router = useRouter();

  const setLocale = (locale: string | number) => {
    router.push(`/${locale}${pathName}`);
  };

  return (
    <JsesDropdown
      tooltip='Switch Language'
      menus={languages.map((lang) => ({ label: lang.name, value: lang.code }))}
      activeValue={locale || defaultLocale}
      onChange={setLocale}
    >
      <IconButton>
        <TranslateIcon color='tertiary' />
      </IconButton>
    </JsesDropdown>
  );
}
