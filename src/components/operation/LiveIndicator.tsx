'use client';

import React from 'react';

import MyexTooltip from '@myex/components/ui/MyexTooltip';
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
          <div className='relative flex h-3 w-3'>
            <div className='animate-ping absolute inline-flex h-full w-full rounded-full bg-go-down opacity-75' />
            <div className='relative inline-flex rounded-full h-3 w-3 bg-go-down' />
          </div>
        ) : (
          <div className='relative inline-flex rounded-full h-3 w-3 bg-slate-500' />
        )}
      </div>
    </MyexTooltip>
  );
}
