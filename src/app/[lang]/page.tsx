import React from 'react';
import { Metadata } from 'next';

import OrderBook from '@myex/components/OrderBook/OrderBook';
import { MyexStyledPageWrapper } from '@myex/components/ui/MyexStyled';
import Seo from '@myex/data/seo.json';
import { getTranslations } from '@myex/i18n/translations';
import { ParamsWithLng } from '@myex/types/i18n';

export const metadata: Metadata = {
  metadataBase: new URL(Seo.siteUrl),
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
  return (
    <MyexStyledPageWrapper>
      <OrderBook />
    </MyexStyledPageWrapper>
  );
}
