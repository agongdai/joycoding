import React from 'react';

import Box from '@mui/material/Box';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

type ProgressBaseProps = Pick<CircularProgressProps, 'variant' | 'size' | 'color' | 'value'>;

export interface ProgressProps extends ProgressBaseProps {
  label?: string;
}

export default function Progress(props: ProgressProps): React.ReactElement {
  return (
    <Box sx={{ position: 'relative', display: 'flex' }}>
      <CircularProgress variant={props.value ? 'determinate' : 'indeterminate'} value={25} />
      {props.label && (
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant='caption' component='div' color='text.secondary'>
            {props.label}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

Progress.defaultProps = {
  value: 50,
  variant: 'contained',
  size: '5rem',
  color: 'primary',
};
