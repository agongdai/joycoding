import React from 'react';
import classNames from 'classnames';

import Number from '@myex/components/ui/MyexFormatter/Number';
import { BookRowParsed, BookSide } from '@myex/types/book';

interface Props {
  side: BookSide;
  row: BookRowParsed;
  total: number;
  allTotal: number;
}

function BookRow({ row, side, total, allTotal }: Props) {
  const isBids = side === BookSide.Bids;
  return (
    <div className='grid grid-cols-4 gap-1 hover:bg-hover-bg-light relative'>
      <div
        className={classNames('absolute h-full right-0 top-0 bottom-0 opacity-20', {
          'bg-go-up right-0': isBids,
          'bg-go-down left-0': !isBids,
        })}
        style={{ width: `${((total / allTotal) * 100).toFixed(2)}%` }}
      />
      {isBids ? (
        <>
          <div className='text-xs text-center text-secondary'>{row.count}</div>
          <div className='text-xs text-center text-secondary'>
            <Number value={Math.abs(row.amount)} nDecimals={4} />
          </div>
          <div className='text-xs text-center text-secondary'>
            <Number value={total} nDecimals={4} />
          </div>
          <div className='text-xs text-center text-secondary'>{row.price}</div>
        </>
      ) : (
        <>
          <div className='text-xs text-center text-secondary'>{row.price}</div>
          <div className='text-xs text-center text-secondary'>
            <Number value={total} nDecimals={4} />
          </div>
          <div className='text-xs text-center text-secondary'>
            <Number value={Math.abs(row.amount)} nDecimals={4} />
          </div>
          <div className='text-xs text-center text-secondary'>{row.count}</div>
        </>
      )}
    </div>
  );
}

export default React.memo(BookRow);
