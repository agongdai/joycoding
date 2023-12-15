'use client';
import React from 'react';

import { useMediaQuery } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';

import { Timeline } from './index';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const JsesTimeline = ({ children, className = '' }: Props) => {
  const muiTheme = useMuiTheme();
  const mdUp = useMediaQuery(muiTheme.breakpoints.up('md'));
  return (
    <Timeline position={mdUp ? 'alternate' : 'right'} classes={{ root: className }}>
      {children}
    </Timeline>
  );
};

export default JsesTimeline;
