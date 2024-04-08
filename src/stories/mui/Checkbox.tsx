import React from 'react';

import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// Only include size, color from MuiCheckboxProps
type CheckboxBaseProps = Pick<MuiCheckboxProps, 'size' | 'color' | 'disabled'>;

export interface CheckboxProps extends CheckboxBaseProps {
  label: string;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
}

export const Checkbox = ({ label, disabled, ...rest }: CheckboxProps): React.ReactElement => (
  <FormControlLabel control={<MuiCheckbox {...rest} />} label={label} disabled={disabled} />
);

Checkbox.defaultProps = {
  size: 'medium',
  color: 'primary',
};
