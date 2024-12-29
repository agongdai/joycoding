'use client';

import React, { useEffect } from 'react';

import BookSides from '@myex/components/OrderBook/BookSides';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { selectWssLive } from '@myex/store/wss/selectors';

export default function OrderBook() {
  const isLive = useMyexSelector(selectWssLive);
  const dispatch = useMyexDispatch();

  const toggle = () => {
    dispatch({
      type: 'socket/' + (isLive ? 'disconnect' : 'connect'),
    });
  };

  useEffect(() => {
    if (isLive) {
      dispatch({
        type: 'socket/subscribe',
        payload: { channel: 'book', symbol: 'tBTCUSD', freq: 'F1' },
      });
    }
  }, [dispatch, isLive]);

  return (
    <div className='rounded-lg shadow-lg bg-bg-dark-light'>
      <div className='flex justify-between py-3 px-4 items-center'>
        <div className='flex gap-2 items-center'>
          <h2 className='text-xl font-semibold text-primary'>Order Book</h2>
          <button className='text-secondary'>BTC/USD</button>
        </div>
        <div className='text-sm'>Precision</div>
      </div>

      <BookSides />

      <div className='flex justify-between py-3 px-4 items-center'>
        <div></div>
        <div className='text-sm flex gap-2 cursor-pointer items-center' onClick={toggle}>
          <div>
            {isLive ? (
              <div className='relative flex h-3 w-3 items-center'>
                <div className='animate-ping absolute inline-flex h-full w-full rounded-full bg-exchange-bitfinex opacity-75' />
                <div className='relative inline-flex rounded-full h-3 w-3 bg-exchange-bitfinex' />
              </div>
            ) : (
              <div className='relative inline-flex rounded-full h-3 w-3 bg-slate-500' />
            )}
          </div>
          Real Time
        </div>
      </div>
    </div>
  );
}
