'use client';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import _debounce from 'lodash/debounce';
import { Provider as ReduxProvider } from 'react-redux';

import store from '@jses/store';
import { saveState } from '@jses/store/localStorage';
import { JsesTheme } from '@jses/theme';

// here we subscribe to the store changes
store.subscribe(
  // we use debounce to save the state once each 1000ms
  // for better performances in case multiple changes occur in a short time
  _debounce(() => {
    saveState(store.getState());
  }, 1000),
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme={JsesTheme.Dark} attribute='class'>
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}
