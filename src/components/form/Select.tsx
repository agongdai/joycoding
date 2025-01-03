import React from 'react';

import { Select as MuiSelect, SelectProps } from '@mui/material';

export default function Select(props: SelectProps) {
  return (
    <MuiSelect
      {...props}
      displayEmpty
      fullWidth
      variant='filled'
      classes={{ select: 'py-[1.7rem] flex' }}
    />
  );
}

export * from '@mui/material/Select';
