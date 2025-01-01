'use client';

import React from 'react';
import cx from 'classnames';

import { FIAT_CURRENCY_SYMBOL } from '@myex/config';
import useFlashOnChange from '@myex/hooks/useFlashOnChange';
import { Value } from '@myex/types/common';

import Number from './Number';

interface Props {
  value: Value;
  nDecimals?: number;
  currencySymbol?: string;
  flash?: boolean;
  keepTrailingZeros?: boolean;
  shorten?: boolean;
}

function Money({
  value,
  nDecimals = 0,
  currencySymbol = FIAT_CURRENCY_SYMBOL,
  flash = false,
  keepTrailingZeros = false,
  shorten = false,
}: Props) {
  const flashClass = useFlashOnChange(value);

  return (
    <span className={cx('transition px-1 relative -left-1', flash ? flashClass : '')}>
      <span className='myex-monospace'>{currencySymbol}</span>
      <Number
        value={value}
        nDecimals={nDecimals}
        keepTrailingZeros={keepTrailingZeros}
        shorten={shorten}
      />
    </span>
  );
}

export default React.memo(Money);
