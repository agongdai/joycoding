import React from 'react';

import { BookSide } from '@myex/types/book';

import { getFieldsForSide } from './utils';

interface Props {
  side: BookSide;
}

function BookFields({ side }: Props) {
  const fields = getFieldsForSide(side);
  return (
    <div className='grid grid-cols-4 gap-1 uppercase font-semibold bg-bg-dark-dark opacity-60 py-0.5 items-center'>
      {fields.map((field) => (
        <div key={field} className='text-xs text-center'>
          {field}
        </div>
      ))}
    </div>
  );
}

export default React.memo(BookFields);
