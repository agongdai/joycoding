'use client';

import React from 'react';

import { Theme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import useMyexTheme from '@myex/hooks/useMyexTheme';
import { MyexTheme } from '@myex/theme/index';
import DarkTheme from '@myex/theme/myex-dark';
import LightTheme from '@myex/theme/myex-light';
import { PropsWithChildren } from '@myex/types/common';

export default function MuiThemeCacheProvider({ children }: PropsWithChildren) {
  const { theme } = useMyexTheme();
  const appTheme: Theme = theme === MyexTheme.Dark ? DarkTheme : LightTheme;

  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
