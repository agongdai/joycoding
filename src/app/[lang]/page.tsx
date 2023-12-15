import React from 'react';
import { Metadata } from 'next';

import { JsesStyledPageWrapper } from '@jses/components/JsesStyled';
import Seo from '@jses/data/seo.json';
import { getTranslations } from '@jses/i18n/translations';
import { ParamsWithLng } from '@jses/types/i18n';

export const metadata: Metadata = {
  title: Seo.title,
  description: Seo.description,
  keywords: Seo.keywords,
  openGraph: {
    title: Seo.title,
    description: Seo.description,
  },
  twitter: {
    title: Seo.title,
    description: Seo.description,
  },
};

export default async function Home({ params: { lang } }: { params: ParamsWithLng }) {
  const messages = await getTranslations(lang);
  return <JsesStyledPageWrapper>JoyCoding</JsesStyledPageWrapper>;
}
