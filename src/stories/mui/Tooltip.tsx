import React from 'react';

import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from '@mui/material';
import Button from '@mui/material/Button';

type TooltipBaseProps = Pick<MuiTooltipProps, 'placement' | 'arrow'>;

export interface TooltipProps extends TooltipBaseProps {
  title: string;
}

export const Tooltip = ({ title, ...rest }: TooltipProps): React.ReactElement => (
  <MuiTooltip {...rest} title={title}>
    <Button>Label</Button>
  </MuiTooltip>
);

Tooltip.defaultProps = {
  title: 'label',
  arrow: false,
};
