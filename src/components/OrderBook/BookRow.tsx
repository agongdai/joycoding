import React from 'react';

import { BookRowParsed, BookSide } from '@myex/types/book';

import { getFieldsForSide } from './utils';

interface Props {
  side: BookSide;
  row: BookRowParsed;
}

function BookRow({ row, side }: Props) {
  const fields = getFieldsForSide(side);
  return (
    <div className='grid grid-cols-4 gap-1'>
      {fields.map((field) => (
        <div key={field} className='text-xs text-center text-neutral-400'>
          {row[field]}
        </div>
      ))}
    </div>
  );
}

export default React.memo(BookRow);
