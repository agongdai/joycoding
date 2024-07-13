'use client';

import React from 'react';
import { enqueueSnackbar } from 'notistack';

import { Switch } from '@mui/material';
import { myexSetParameterEnabled } from '@myex/app/serverActions/myexParameter';
import { Parameter } from '@prisma/client';

export default function SetEnabledButton({ parameter }: { parameter: Parameter }) {
  const [checked, setChecked] = React.useState<boolean>(parameter.enabled);

  const onToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    const res = await myexSetParameterEnabled(parameter.myexId, e.target.checked);
    if (res.success) {
      enqueueSnackbar(`The parameter has been ${e.target.checked ? 'enabled' : 'disabled'}.`, {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
      setChecked(!e.target.checked);
    }
  };

  return <Switch checked={checked} onChange={onToggle} />;
}
