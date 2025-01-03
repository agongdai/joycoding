import React from 'react';

import { BookRowParsed, BookSide } from '@myex/types/book';

import BookFields from './BookFields';
import BookRow from './BookRow';

interface Props {
  side: BookSide;
  data: Record<number, BookRowParsed>;
  psnap: number[];
  tsnap: number[];
}

function BookSideList({ side, data, psnap, tsnap }: Props) {
  return (
    <div>
      <BookFields side={side} />
      {psnap.map((price, index) => {
        const row = data[price];
        return (
          <div key={price}>
            <BookRow
              row={row}
              side={side}
              total={tsnap[index] || 0}
              allTotal={tsnap[tsnap.length - 1]}
            />
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(BookSideList);
