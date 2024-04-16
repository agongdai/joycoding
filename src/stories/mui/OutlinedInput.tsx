import React from 'react';

import { faExclamation } from '@fortawesome/pro-solid-svg-icons';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MuiOutlinedInput, {
  OutlinedInputProps as MuiOutlinedInputProps,
} from '@mui/material/OutlinedInput';
import AwesomeIcon from '@myex/components/AwesomeIcon';

type OutlinedInputBaseProps = Pick<
  MuiOutlinedInputProps,
  'size' | 'color' | 'disabled' | 'label' | 'error' | 'fullWidth' | 'type'
>;

export interface OutlinedInputProps extends OutlinedInputBaseProps {
  endAdornment?: React.ReactNode;
  helperText?: string;
  placeholder?: string;
}

export const OutlinedInput = ({ label, ...rest }: OutlinedInputProps): React.ReactElement => (
  <FormControl variant='outlined'>
    <InputLabel htmlFor='outlined-input' error={rest.error} disabled={rest.disabled} shrink>
      {label}
    </InputLabel>
    <MuiOutlinedInput id='outlined-input' {...rest} />
    {rest.helperText && (
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.8rem' }}>
        <AwesomeIcon icon={faExclamation} size='sm' className='mr-1' />
        <FormHelperText id='component-error-text' error={rest.error}>
          {rest.helperText}
        </FormHelperText>
      </div>
    )}
  </FormControl>
);

OutlinedInput.defaultProps = {
  size: 'medium',
  color: 'primary',
};
