'use client';
import React from 'react';

import { faMoonStars, faSunBright } from '@fortawesome/pro-duotone-svg-icons';
import { IconButton } from '@mui/material';
import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import AwesomeIcon from '@myex/components/AwesomeIcon';
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
        <AwesomeIcon icon={theme === MyexTheme.Dark ? faSunBright : faMoonStars} size='sm' />
      </IconButton>
    </MyexTooltip>
  );
}
