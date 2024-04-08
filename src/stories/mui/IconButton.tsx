import React from 'react';

import MuiIconButton, { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';

// Only include variant, size, color from MuiButtonProps
type IconButtonBaseProps = Pick<MuiIconButtonProps, 'size' | 'color' | 'disabled' | 'children'>;

export type ButtonProps = IconButtonBaseProps;

export const IconButton = ({ children, ...rest }: ButtonProps): React.ReactElement => (
  <MuiIconButton {...rest}>{children}</MuiIconButton>
);

IconButton.defaultProps = {
  variant: 'contained',
  size: 'medium',
  color: 'primary',
};
