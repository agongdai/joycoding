'use client';

import React from 'react';

import MyexTooltip from '@myex/components/@mui/material/Tooltip';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { toggleLive } from '@myex/store/trading/actions';
import { selectLive } from '@myex/store/trading/selectors';

export default function LiveIndicator() {
  const isLive = useMyexSelector(selectLive);
  const dispatch = useMyexDispatch();
  const toggle = () => {
    dispatch(toggleLive());
  };

  return (
    <MyexTooltip title='Live data from WebSocket'>
      <div className='inline-block cursor-pointer mx-2' onClick={toggle}>
        {isLive ? (
          <span className='relative flex h-3 w-3'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-go-down opacity-75' />
            <span className='relative inline-flex rounded-full h-3 w-3 bg-go-down' />
          </span>
        ) : (
          <span className='relative inline-flex rounded-full h-3 w-3 bg-slate-500' />
        )}
      </div>
    </MyexTooltip>
  );
}
