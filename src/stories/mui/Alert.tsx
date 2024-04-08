import React from 'react';

import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';

type AlertBaseProps = Pick<MuiAlertProps, 'severity' | 'icon'>;

export interface AlertProps extends AlertBaseProps {
  info: string;
}

export const Alert = ({ info, ...rest }: AlertProps): React.ReactElement => (
  <MuiAlert {...rest}>{info}</MuiAlert>
);

Alert.defaultProps = {};
