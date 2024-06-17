import React from 'react';

import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

type Props = TooltipProps & {
  children: React.ReactNode;
};

const MyexTooltip = ({ children, ...props }: Props) => (
  <Tooltip arrow TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }} {...props}>
    {children}
  </Tooltip>
);

export default MyexTooltip;
