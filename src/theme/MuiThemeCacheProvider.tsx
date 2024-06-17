import React from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import DarkTheme from '@myex/theme/myex-dark';
import { PropsWithChildren } from '@myex/types/common';

export default function MuiThemeCacheProvider({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={DarkTheme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
