'use client';

import React from 'react';

import { Theme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import useMyexTheme from '@myex/hooks/useMyexTheme';
import { MyexTheme } from '@myex/theme/index';
import DarkTheme from '@myex/theme/myex-dark';
import LightTheme from '@myex/theme/myex-light';

interface Props {
  children: React.ReactNode;
  theme: MyexTheme;
}

export default function MuiThemeCacheProvider({ children, theme }: Props) {
  const { theme: clientTheme } = useMyexTheme();
  const appTheme: Theme = (clientTheme || theme) === MyexTheme.Dark ? DarkTheme : LightTheme;

  return (
    <AppRouterCacheProvider options={{ key: 'mui', enableCssLayer: false }}>
      <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
