import React from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select';

type SelectBaseProps = Pick<MuiSelectProps, 'label' | 'error'>;

export interface SelectProps extends SelectBaseProps {
  options: { label: string; value: string }[];
}

export const Select = ({ label, options, ...rest }: SelectProps): React.ReactElement => (
  <FormControl>
    <InputLabel htmlFor='select'>{label}</InputLabel>
    <MuiSelect id='select' {...rest}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MuiSelect>
  </FormControl>
);

Select.defaultProps = {};
