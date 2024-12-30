'use client';

import React, { useEffect, useState } from 'react';

import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@myex/components/form/Select';
import BookSides from '@myex/components/OrderBook/BookSides';
import CoinIcon from '@myex/components/ui/MyexFormatter/CoinIcon';
import useMyexRestFetch from '@myex/hooks/useMyexRestFetch';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { selectBookMessages } from '@myex/store/book/selectors';
import { selectWssLive } from '@myex/store/wss/selectors';
import { Coin } from '@prisma/client';

export default function OrderBook() {
  const [symbol, setSymbol] = useState<string | null>('tBTCUST');
  const isLive = useMyexSelector(selectWssLive);
  const dispatch = useMyexDispatch();
  const bookMessages = useMyexSelector(selectBookMessages);
  const { isLoading, data: coins } = useMyexRestFetch<Coin[]>('coins', []);
  const { chanId } = bookMessages;

  // When page loads, connect to the websocket, and keep it connected
  useEffect(() => {
    if (!isLive) {
      dispatch({
        type: 'socket/connect',
      });
    }
  }, [dispatch, isLive]);

  useEffect(() => {
    if (!chanId && symbol && isLive) {
      dispatch({
        type: 'socket/subscribe',
        payload: { channel: 'book', symbol, freq: 'F1' },
      });
    }
  }, [isLive, chanId, dispatch, symbol]);

  const switchSymbol = (e: SelectChangeEvent<unknown>) => {
    const newSymbol = e.target.value as string;
    if (newSymbol !== symbol) {
      setSymbol(newSymbol);
      if (chanId) {
        dispatch({
          type: 'socket/unsubscribe',
          payload: { chanId },
        });
      }
    }
  };

  return (
    <div className='rounded-lg shadow-lg bg-bg-dark-light'>
      <div className='flex justify-between py-3 px-4 items-center'>
        <div className='flex gap-2 items-center'>
          <h2 className='text-xl font-semibold w-48 text-primary'>Order Book</h2>
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
        <div
          className='text-sm'
          onClick={() => {
            dispatch({
              type: 'socket/unsubscribe',
              payload: { chanId },
            });
          }}
        >
          Precision
        </div>
        <div className='text-sm flex gap-2 cursor-pointer items-center'>Real Time</div>
      </div>
    </div>
  );
}
