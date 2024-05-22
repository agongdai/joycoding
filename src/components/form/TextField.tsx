import React from 'react';

import MuiTextField, { TextFieldProps } from '@mui/material/TextField';

export default function TextField(props: TextFieldProps) {
  return (
    <MuiTextField
      {...props}
      variant='filled'
      hiddenLabel
      fullWidth
      margin='dense'
      // @doc https://stackoverflow.com/a/72468914/978320
      InputLabelProps={{ shrink: true }}
      classes={{ root: 'mb-0', ...(props.classes || {}) }}
    />
  );
}
