'use client';
import React from 'react';

import useMuiTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Timeline } from './index';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const MyexTimeline = ({ children, className = '' }: Props) => {
  const muiTheme = useMuiTheme();
  const mdUp = useMediaQuery(muiTheme.breakpoints.up('md'));
  return (
    <Timeline position={mdUp ? 'alternate' : 'right'} classes={{ root: className }}>
      {children}
    </Timeline>
  );
};

export default MyexTimeline;
