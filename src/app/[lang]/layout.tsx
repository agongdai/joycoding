import React from 'react';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';

import { config } from '@fortawesome/fontawesome-svg-core';
import Providers from '@myex/app/Providers';
import { auth } from '@myex/auth';
import Footer from '@myex/components/Footer';
import Header from '@myex/components/Header';
import MyexScrollToTop from '@myex/components/operation/MyexScrollToTop';
import PermissionGard from '@myex/components/operation/PermissionGard';
import ScrollTopHolder from '@myex/components/operation/ScrollTopHolder';
import Sidebar from '@myex/components/Sidebar';
import Seo from '@myex/data/seo.json';
import { languages } from '@myex/i18n/config';
import colors from '@myex/theme/colors';
import fonts from '@myex/theme/font';
import MuiThemeCacheProvider from '@myex/theme/MuiThemeCacheProvider';
import { Language, ParamsWithLng } from '@myex/types/i18n';

// @doc https://docs.fontawesome.com/web/use-with/react/use-with
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@myex/app/globals.css';

config.autoAddCss = false;

// revalidate at some frequency
export const revalidate = 60;

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
  const session = await auth();
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={fonts.default.className} id='root'>
        <NextTopLoader color={colors.primaryMain} shadow='none' />
        <Providers>
          <MuiThemeCacheProvider>
            <main className='flex'>
              <SessionProvider session={session}>
                <PermissionGard />
                <Sidebar />
              </SessionProvider>
              <ScrollTopHolder>
                <SessionProvider session={session}>
                  <Header />
                </SessionProvider>
                {children}
                <MyexScrollToTop />
                <Footer />
              </ScrollTopHolder>
            </main>
          </MuiThemeCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
