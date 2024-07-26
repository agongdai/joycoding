'use client';
import React from 'react';

import { faMoonStars, faSunBright } from '@fortawesome/pro-duotone-svg-icons';
import { IconButton } from '@mui/material';
import { myexUpdateUserParameter } from '@myex/app/serverActions/myexUserParameter';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import MyexTooltip from '@myex/components/ui/MyexTooltip';
import useMyexTheme from '@myex/hooks/useMyexTheme';
import { MyexTheme } from '@myex/theme';
import { SystemParameter } from '@myex/types/system';

export default function ThemeSwitch() {
  const { theme, setTheme } = useMyexTheme();

  if (!theme) {
    return null;
  }

  const toggleTheme = () => {
    const targetTheme = theme === MyexTheme.Dark ? MyexTheme.Light : MyexTheme.Dark;
    setTheme(targetTheme);
    // sync this setting to database
    myexUpdateUserParameter(SystemParameter.Theme, targetTheme);
  };

  return (
    <MyexTooltip title='Switch theme'>
      <IconButton onClick={toggleTheme}>
        <AwesomeIcon icon={theme === MyexTheme.Dark ? faSunBright : faMoonStars} size='sm' />
      </IconButton>
    </MyexTooltip>
  );
}
