import React from 'react';

import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
} from '@mui/material';

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
