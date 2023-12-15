import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { dir } from 'i18next';

import { config } from '@fortawesome/fontawesome-svg-core';
import Loading from '@jses/app/[lang]/loading';
import Providers from '@jses/app/Providers';
import Footer from '@jses/components/Footer';
import Header from '@jses/components/Header';
import JsesScrollToTop from '@jses/components/JsesScrollToTop';
import ScrollTopHolder from '@jses/components/ScrollTopHolder';
import Sidebar from '@jses/components/Sidebar';
import Seo from '@jses/data/seo.json';
import { languages } from '@jses/i18n/config';
import colors from '@jses/theme/colors';
import fonts from '@jses/theme/font';
import ThemeRegistry from '@jses/theme/ThemeRegistry';
import { Language, ParamsWithLng } from '@jses/types/i18n';
import { Analytics } from '@vercel/analytics/react';

import '@fortawesome/fontawesome-svg-core/styles.css';
import '@jses/app/globals.css';

config.autoAddCss = false;

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

export async function generateStaticParams() {
  return languages.map((lang: Language) => ({ lang: lang.code }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: ParamsWithLng;
}) {
  return (
    <html lang={lang} dir={dir(lang)} suppressHydrationWarning className={fonts.spaceMono.variable}>
      <body className={fonts.default.className} id='root'>
        <NextTopLoader color={colors.primaryMain} shadow='none' />
        <Providers>
          <ThemeRegistry options={{ key: 'mui' }}>
            <main className='flex'>
              <Sidebar />
              <ScrollTopHolder>
                <Header />
                <Suspense fallback={<Loading />}>{children}</Suspense>
                <JsesScrollToTop />
                <Footer />
              </ScrollTopHolder>
            </main>
          </ThemeRegistry>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
