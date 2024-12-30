'use client';

import React from 'react';

import { useMyexSelector } from '@myex/store';
import { selectBookMessages } from '@myex/store/book/selectors';
import { BookSide } from '@myex/types/book';

import BookSideList from './BookSideList';

export default function BookSides() {
  const bookMessages = useMyexSelector(selectBookMessages);
  const { bids, asks, pbids, pasks, tasks, tbids } = bookMessages;

  return (
    <div className='grid grid-cols-2 border-t border-border-dark border-b py-3'>
      <BookSideList side={BookSide.Bids} data={bids} psnap={pbids} tsnap={tbids} />
      <BookSideList side={BookSide.Asks} data={asks} psnap={pasks} tsnap={tasks} />
    </div>
  );
}
