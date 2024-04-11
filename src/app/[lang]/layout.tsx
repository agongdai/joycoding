import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';

import { config } from '@fortawesome/fontawesome-svg-core';
import Loading from '@myex/app/[lang]/loading';
import Providers from '@myex/app/Providers';
import { checkBfxApiStatus } from '@myex/app/serverActions/exchangeStatus';
import { auth } from '@myex/auth';
import ExStatus from '@myex/components/ExStatus';
import Footer from '@myex/components/Footer';
import Header from '@myex/components/Header';
import MyexScrollToTop from '@myex/components/MyexScrollToTop';
import NewUserCheck from '@myex/components/NewUserCheck';
import ScrollTopHolder from '@myex/components/ScrollTopHolder';
import Sidebar from '@myex/components/Sidebar';
import Seo from '@myex/data/seo.json';
import { languages } from '@myex/i18n/config';
import colors from '@myex/theme/colors';
import fonts from '@myex/theme/font';
import ThemeRegistry from '@myex/theme/ThemeRegistry';
import { Language, ParamsWithLng } from '@myex/types/i18n';
import { Analytics } from '@vercel/analytics/react';

import '@myex/app/globals.css';

config.autoAddCss = false;

// revalidate at some frequency
export const revalidate = 600;

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
  const bfxApiStatus = await checkBfxApiStatus();
  const session = await auth();
  return (
    <html lang={lang} suppressHydrationWarning className={fonts.spaceMono.variable}>
      <body className={fonts.default.className} id='root'>
        <NextTopLoader color={colors.primaryMain} shadow='none' />
        <Providers>
          <ThemeRegistry options={{ key: 'mui' }}>
            <main className='flex'>
              <SessionProvider session={session}>
                <NewUserCheck />
                <Sidebar />
              </SessionProvider>
              <ScrollTopHolder>
                <SessionProvider session={session}>
                  <Header statusNode={<ExStatus status={bfxApiStatus} />} />
                </SessionProvider>
                <Suspense fallback={<Loading />}>{children}</Suspense>
                <MyexScrollToTop />
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
