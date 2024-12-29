import React from 'react';

import { BookRowParsed, BookSide } from '@myex/types/book';

import BookFields from './BookFields';
import BookRow from './BookRow';

interface Props {
  side: BookSide;
  data: Record<number, BookRowParsed>;
  psnap: number[];
}

function BookSideList({ side, data, psnap }: Props) {
  return (
    <div>
      <BookFields side={side} />
      {psnap.map((price) => {
        const row = data[price];
        return (
          <div key={price}>
            <BookRow row={row} side={side} />
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(BookSideList);
