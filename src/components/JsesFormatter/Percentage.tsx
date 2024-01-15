import React from 'react';
import cx from 'classnames';

import { Value } from '@jses/types/common';

export default function Percentage({ value }: { value: Value }) {
  const num = Number(value);
  return (
    <span
      className={cx(
        'text-white w-20 text-center font-semibold p-2 leading-none inline-block rounded',
        {
          'bg-go-down': num < 0,
          'bg-go-up': num > 0,
        },
      )}
    >
      {(num * 100).toFixed(2)}
      <span className='inline-block w-[0.2rem]' />%
    </span>
  );
}
