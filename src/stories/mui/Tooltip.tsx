import React from 'react';

import Button from '@mui/material/Button';
import MuiTooltip, { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';

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
