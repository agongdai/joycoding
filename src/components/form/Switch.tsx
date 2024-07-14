import React from 'react';

import FormControlLabel from '@mui/material/FormControlLabel';
import MuiSwitch, { SwitchProps } from '@mui/material/Switch';

interface Props extends SwitchProps {
  label?: string | React.ReactNode;
}

export default function Switch({ label, ...props }: Props) {
  return (
    <FormControlLabel
      control={<MuiSwitch {...props} checked={Boolean(props.value)} />}
      label={label}
    />
  );
}
