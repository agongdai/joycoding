'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { faLanguage } from '@fortawesome/pro-duotone-svg-icons';
import { IconButton } from '@mui/material';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import MyexDropdown from '@myex/components/MyexDropdown';
import useLocale from '@myex/hooks/useLocale';
import { defaultLocale, languages } from '@myex/i18n/config';

export default function LangSwitch() {
  const { locale, pathName } = useLocale();
  const router = useRouter();

  const setLocale = (locale: string | number) => {
    router.push(`/${locale}${pathName}`);
  };

  return (
    <MyexDropdown
      tooltip='Switch language'
      menus={languages.map((lang) => ({ label: lang.name, value: lang.code }))}
      activeValue={locale || defaultLocale}
      onChange={setLocale}
    >
      <IconButton>
        <AwesomeIcon icon={faLanguage} size='sm' />
      </IconButton>
    </MyexDropdown>
  );
}
