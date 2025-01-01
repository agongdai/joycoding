import React from 'react';
import classNames from 'classnames';

import Money from '@myex/components/ui/MyexFormatter/Money';
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
    <div
      className={classNames('grid grid-cols-4 gap-1 hover:bg-hover-bg-light relative', {
        'book-row-bid': isBids,
        'book-row-ask': !isBids,
      })}
    >
      <div
        className={classNames(
          'absolute h-full right-0 top-0 bottom-0 opacity-20 transition-[width] duration-150',
          {
            'bg-go-up right-0': isBids,
            'bg-go-down left-0': !isBids,
          },
        )}
        style={{ width: `${((total / allTotal) * 100).toFixed(2)}%` }}
      />
      {isBids ? (
        <>
          <div className='text-xs text-center text-secondary'>
            <Number value={row.count} nDecimals={0} shorten />
          </div>
          <div className='text-xs text-center text-secondary'>
            <Number value={Math.abs(row.amount)} nDecimals={4} keepTrailingZeros shorten />
          </div>
          <div className='text-xs text-center text-secondary'>
            <Number value={total} nDecimals={4} keepTrailingZeros shorten />
          </div>
          <div className='text-xs text-center text-secondary'>
            <Money value={row.price} currencySymbol='' keepTrailingZeros />
          </div>
        </>
      ) : (
        <>
          <div className='text-xs text-center text-secondary'>
            <Money value={row.price} currencySymbol='' keepTrailingZeros />
          </div>
          <div className='text-xs text-center text-secondary'>
            <Number value={total} nDecimals={4} keepTrailingZeros shorten />
          </div>
          <div className='text-xs text-center text-secondary'>
            <Number value={Math.abs(row.amount)} nDecimals={4} keepTrailingZeros shorten />
          </div>
          <div className='text-xs text-center text-secondary'>
            <Number value={row.count} nDecimals={0} shorten />
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(BookRow);
