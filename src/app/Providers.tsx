'use client';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Provider as ReduxProvider } from 'react-redux';

import store from '@jses/store';
import { JsesTheme } from '@jses/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme={JsesTheme.Dark} attribute='class'>
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}
