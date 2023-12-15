import * as React from 'react';
import { Box, CssBaseline, Theme, ThemeProvider } from '@mui/material';

import { DEFAULT_THEME, JsesTheme, themes } from '../src/theme';

import '../src/app/globals.css';

export const withMuiTheme = (Story: React.FC, context: Record<string, any>) => {
  const { theme: themeKey = DEFAULT_THEME } = context.globals;

  // only recompute the theme if the themeKey changes
  const theme: Theme = React.useMemo(
    () => themes[themeKey as JsesTheme] || themes[JsesTheme.Light],
    [themeKey],
  );

  React.useEffect(() => {
    const htmlTag = document.documentElement;

    // Set the "data-mode" attribute on the iFrame html tag
    htmlTag.setAttribute('data-mode', themeKey);
    if (themeKey === JsesTheme.Dark) {
      htmlTag.classList.add('dark');
    } else {
      htmlTag.classList.remove('dark');
    }
  }, [themeKey]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box p={8}>
        <Story />
      </Box>
    </ThemeProvider>
  );
};
