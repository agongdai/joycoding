import React from 'react';

import { Value } from '@myex/types/common';

export default function Volume({ value }: { value: Value }) {
  const num = Number(value);
  let displayedNum = num.toFixed(2);
  let scale = '';
  if (num > 1000000000) {
    displayedNum = (num / 1000000000).toFixed(2);
    scale = 'B';
  } else if (num > 1000000) {
    displayedNum = (num / 1000000).toFixed(2);
    scale = 'M';
  } else if (num > 1000) {
    displayedNum = (num / 1000).toFixed(2);
    scale = 'K';
  }

  return (
    <span className=''>
      {displayedNum}
      <span className='inline-block w-[0.2rem]' />
      <strong>{scale}</strong>
    </span>
  );
}
