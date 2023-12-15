'use client';
import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import useJsesTheme from '@jses/hooks/useJsesTheme';
import { JsesTheme } from '@jses/theme/index';
import DarkTheme from '@jses/theme/jses-dark';
import LightTheme from '@jses/theme/jses-light';
import { Theme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry({
  options,
  children,
}: {
  options: Parameters<typeof createCache>[0];
  children: React.ReactNode;
}) {
  const { theme } = useJsesTheme();
  const appTheme: Theme = theme === JsesTheme.Dark ? DarkTheme : LightTheme;

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  if (!theme) {
    return null;
  }

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
