'use client';

import React from 'react';
import _take from 'lodash/take';
import memoizeOne from 'memoize-one';

import { useMyexSelector } from '@myex/store';
import { selectBookMessages } from '@myex/store/book/selectors';
import {
  selectHasExceededMaxTrials,
  selectWssLive,
  selectWssNTryTimes,
} from '@myex/store/wss/selectors';
import { BookSide } from '@myex/types/book';

import BookSideList from './BookSideList';

export default function BookSides() {
  const bookMessages = useMyexSelector(selectBookMessages);
  const wssNTryTimes = useMyexSelector(selectWssNTryTimes);
  const hasExceededMaxTrials = useMyexSelector(selectHasExceededMaxTrials);
  const { bids, asks, pbids, pasks, tasks, tbids, loading, len } = bookMessages;
  const isLive = useMyexSelector(selectWssLive);

  const memo = memoizeOne((psnap) => _take(psnap, Number(len) - 1));
  const pbidsShown = memo(pbids) as number[];
  const pasksShown = memo(pasks) as number[];

  const failedMessage = hasExceededMaxTrials
    ? 'Failed. Please refresh the page later.'
    : 'Failed. Will retry connecting shortly ...';

  const doingMessage = isLive ? 'Loading ...' : 'Connecting ...';

  return (
    <div className='grid grid-cols-2 border-t border-border-dark border-b py-3 h-[52rem] relative overflow-hidden'>
      {(!isLive || loading) && (
        <div className='absolute top-0 bottom-0 left-0 right-0 bg-bg-light-dark/10 flex items-center justify-center'>
          {wssNTryTimes > 0 ? failedMessage : doingMessage}
        </div>
      )}
      <BookSideList side={BookSide.Bids} data={bids} psnap={pbidsShown} tsnap={tbids} />
      <BookSideList side={BookSide.Asks} data={asks} psnap={pasksShown} tsnap={tasks} />
    </div>
  );
}
