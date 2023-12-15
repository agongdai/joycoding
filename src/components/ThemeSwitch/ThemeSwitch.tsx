'use client';
import React from 'react';

import JsesTooltip from '@jses/components/@mui/material/Tooltip';
import useJsesTheme from '@jses/hooks/useJsesTheme';
import { JsesTheme } from '@jses/theme';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';

export default function ThemeSwitch() {
  const { theme, setTheme } = useJsesTheme();

  if (!theme) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === JsesTheme.Dark ? JsesTheme.Light : JsesTheme.Dark);
  };

  return (
    <JsesTooltip title='Switch Theme'>
      <IconButton onClick={toggleTheme}>
        {theme === JsesTheme.Dark ? (
          <LightModeIcon color='tertiary' />
        ) : (
          <DarkModeIcon color='tertiary' />
        )}
      </IconButton>
    </JsesTooltip>
  );
}
