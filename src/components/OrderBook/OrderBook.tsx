'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@myex/components/form/Select';
import BookSides from '@myex/components/OrderBook/BookSides';
import CoinIcon from '@myex/components/ui/MyexFormatter/CoinIcon';
import { WSS_CONNECTION_TRY_TIMES } from '@myex/config';
import useMyexRestFetch from '@myex/hooks/useMyexRestFetch';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { selectBookMessages } from '@myex/store/book/selectors';
import { selectWssLive, selectWssNTryTimes } from '@myex/store/wss/selectors';
import { Frequency, Precision } from '@myex/types/book';
import { Coin } from '@prisma/client';

export default function OrderBook() {
  const [symbol, setSymbol] = useState<string | null>('tBTCUST');
  const isLive = useMyexSelector(selectWssLive);
  const wssNTryTimes = useMyexSelector(selectWssNTryTimes);
  const dispatch = useMyexDispatch();
  const bookMessages = useMyexSelector(selectBookMessages);
  const { isLoading, data: coins } = useMyexRestFetch<Coin[]>('coins', []);
  const { chanId, freq, prec } = bookMessages;
  const [frequency, setFrequency] = useState<Frequency>(freq);
  const [precision, setPrecision] = useState<Precision>(prec);

  // When page loads, connect to the websocket, and keep it connected
  useEffect(() => {
    if (wssNTryTimes < WSS_CONNECTION_TRY_TIMES && !isLive) {
      setTimeout(
        () =>
          dispatch({
            type: 'socket/connect',
          }),
        wssNTryTimes === 0 ? 0 : 3000,
      );
    }
  }, [dispatch, wssNTryTimes, isLive]);

  // Subscribe to the order book channel
  useEffect(() => {
    if (!chanId && symbol && isLive) {
      dispatch({
        type: 'socket/subscribe',
        payload: { channel: 'book', symbol, freq: frequency, prec: precision },
      });
    }
  }, [isLive, chanId, dispatch, symbol, frequency, precision]);

  const unsubscribe = () => {
    if (chanId) {
      dispatch({
        type: 'socket/unsubscribe',
        payload: { chanId },
      });
    }
  };

  const switchSymbol = (e: SelectChangeEvent<unknown>) => {
    const newSymbol = e.target.value as string;
    if (newSymbol !== symbol) {
      setSymbol(newSymbol);
      unsubscribe();
    }
  };

  const switchFrequency = (freq: Frequency) => () => {
    if (freq !== frequency) {
      setFrequency(freq);
      unsubscribe();
    }
  };

  const switchPrecision = (prec: Precision) => () => {
    if (prec !== precision) {
      setPrecision(prec);
      unsubscribe();
    }
  };

  const PrecisionSelect = (prec: Precision) => (
    <span
      onClick={switchPrecision(prec)}
      className={classNames('cursor-pointer', {
        'text-highlight-dark': precision === prec,
      })}
    >
      {prec}
    </span>
  );

  return (
    <div className='rounded-lg shadow-lg bg-bg-dark-light'>
      <div className='flex justify-between py-3 px-4 items-center'>
        <div className='flex gap-2 items-center'>
          <h2 className='text-xl font-semibold text-primary'>Bitfinex Order Book</h2>
          <Select
            labelId='coin-select-label'
            id='coin-select'
            label='Coin'
            variant='filled'
            ref={null}
            value={symbol}
            onChange={switchSymbol}
          >
            <MenuItem disabled value={0}>
              <em>Select a coin ...</em>
            </MenuItem>
            {!isLoading &&
              coins.map((coin) => (
                <MenuItem
                  key={coin.myexId}
                  value={`t${coin.currency}UST`}
                  classes={{ root: 'py-3' }}
                >
                  <ListItemIcon>
                    <CoinIcon coin={coin} />
                  </ListItemIcon>
                  <ListItemText>
                    {coin.name} - {coin.currency}
                  </ListItemText>
                </MenuItem>
              ))}
          </Select>
        </div>
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
      </div>

      <BookSides />

      <div className='flex justify-between py-3 px-4 items-center'>
        <div className='text-sm flex gap-2 items-center'>
          Precision
          {PrecisionSelect(Precision.P0)}|{PrecisionSelect(Precision.P1)}|
          {PrecisionSelect(Precision.P2)}|{PrecisionSelect(Precision.P3)}|
          {PrecisionSelect(Precision.P4)}
        </div>
        <div className='text-sm flex gap-2 items-center'>
          Frequency:
          <span
            onClick={switchFrequency(Frequency.F0)}
            className={classNames('cursor-pointer', {
              'text-highlight-dark': frequency === Frequency.F0,
            })}
          >
            Real Time
          </span>
          |
          <span
            onClick={switchFrequency(Frequency.F1)}
            className={classNames('cursor-pointer', {
              'text-highlight-dark': frequency === Frequency.F1,
            })}
          >
            5 Sec
          </span>
        </div>
      </div>
    </div>
  );
}
