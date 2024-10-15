'use client';

import React from 'react';

import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { toggleWsLive } from '@myex/store/trading/actions';
import { selectExchangeWsLive } from '@myex/store/trading/selectors';
import { Exchange } from '@myex/types/exchange';

export default function LiveIndicator() {
  const isLive = useMyexSelector(selectExchangeWsLive(Exchange.Game));
  const dispatch = useMyexDispatch();
  const toggle = () => {
    dispatch(toggleWsLive(Exchange.Game));
  };

  return (
    <div title='Toggle WebSocket connection'>
      <div className='inline-block cursor-pointer mx-2' onClick={toggle}>
        {isLive ? (
          <div className='relative flex h-3 w-3'>
            <div className='animate-ping absolute inline-flex h-full w-full rounded-full bg-exchange-bitfinex opacity-75' />
            <div className='relative inline-flex rounded-full h-3 w-3 bg-exchange-bitfinex' />
          </div>
        ) : (
          <div className='relative inline-flex rounded-full h-3 w-3 bg-slate-500' />
        )}
      </div>
    </div>
  );
}
