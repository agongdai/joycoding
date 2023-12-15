import React from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from '@mui/material';

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
