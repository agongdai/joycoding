'use client';
import React from 'react';
import Link from 'next/link';
import cx from 'classnames';

import useLocale from '@jses/hooks/useLocale';
import { defaultLocale } from '@jses/i18n/config';
import { Locale } from '@jses/types/i18n';

interface Props {
  href: string;
  children: React.ReactNode;
  target?: string;
  isActive?: boolean;
  locale?: Locale;
  className?: string;
  disabled?: boolean;
  download?: boolean;
  inverted?: boolean;
  title?: string;
}

export default function JsesLink({
  href,
  children,
  target = '_self',
  isActive = false,
  locale,
  className = '',
  disabled = false,
  download = false,
  inverted = false,
  title = '',
}: Props) {
  const { locale: currentLocale, pathName } = useLocale();
  const isExternal =
    href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto');

  const localeForLink = locale || currentLocale;
  const localeInUrl =
    localeForLink === '' || localeForLink === defaultLocale || isExternal
      ? ''
      : `/${localeForLink}`;

  if (disabled) {
    return <span className='inline-flex items-center'>{children}</span>;
  }

  return (
    <Link
      download={download}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
        }
      }}
      href={`${localeInUrl}${href}`}
      target={isExternal ? '_blank' : target}
      className={cx('inline-flex items-center', className, {
        'text-text-highlight': isActive || pathName === href,
        'text-white': inverted,
      })}
      title={title}
    >
      {children}
    </Link>
  );
}
