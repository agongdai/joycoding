import React from 'react';
import BigNumber from 'bignumber.js';

import {
  FIAT_CURRENCY_SYMBOL,
  PRICE_DEFAULT_DECIMAL_PLACES,
  PRICE_MAX_DECIMAL_PLACES,
} from '@jses/config';
import { Value } from '@jses/types/common';

const priceFormat = {
  prefix: '',
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: '',
};

export default function Price({ value, nDecimals = 0 }: { value: Value; nDecimals?: number }) {
  const displayedDecimals = BigNumber(String(value)).isLessThan(BigNumber(0.01))
    ? PRICE_MAX_DECIMAL_PLACES
    : PRICE_DEFAULT_DECIMAL_PLACES;

  return (
    <span className=''>
      {FIAT_CURRENCY_SYMBOL}
      <span className='inline-block w-[0.2rem]' />
      {BigNumber(String(value))
        .toFormat(nDecimals || displayedDecimals, priceFormat)
        .replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1')}
    </span>
  );
}
