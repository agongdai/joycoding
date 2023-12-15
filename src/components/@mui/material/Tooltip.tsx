import React from 'react';

import { Tooltip, TooltipProps, Zoom } from '@mui/material';

type Props = TooltipProps & {
  children: React.ReactNode;
};

const JsesTooltip = ({ children, ...props }: Props) => (
  <Tooltip arrow TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }} {...props}>
    {children}
  </Tooltip>
);

export default JsesTooltip;
