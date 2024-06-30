import React from 'react';
import cx from 'classnames';

import { Value } from '@myex/types/common';

export default function Percentage({ value }: { value: Value }) {
  if (value === null || value === undefined) return <span>-</span>;
  const num = Number(value);
  return (
    <span
      className={cx(
        'text-white min-w-[8rem] text-center font-semibold p-2 leading-none inline-block rounded xs:text-sm xs:min-w-[7rem]',
        {
          'bg-go-down': num < 0,
          'bg-go-up': num > 0,
        },
      )}
    >
      {num.toFixed(num >= 100 || num <= -100 ? 1 : 2)}
      <span className='inline-block w-[0.2rem]' />%
    </span>
  );
}
