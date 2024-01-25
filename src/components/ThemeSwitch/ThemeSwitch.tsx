'use client';
import React from 'react';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';
import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import useMyexTheme from '@myex/hooks/useMyexTheme';
import { MyexTheme } from '@myex/theme';

export default function ThemeSwitch() {
  const { theme, setTheme } = useMyexTheme();

  if (!theme) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === MyexTheme.Dark ? MyexTheme.Light : MyexTheme.Dark);
  };

  return (
    <MyexTooltip title='Switch theme'>
      <IconButton onClick={toggleTheme}>
        {theme === MyexTheme.Dark ? (
          <LightModeIcon color='tertiary' />
        ) : (
          <DarkModeIcon color='tertiary' />
        )}
      </IconButton>
    </MyexTooltip>
  );
}
