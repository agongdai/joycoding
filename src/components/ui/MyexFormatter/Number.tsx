import React from 'react';
import BigNumber from 'bignumber.js';

import { PRICE_DEFAULT_DECIMAL_PLACES, PRICE_MAX_DECIMAL_PLACES } from '@myex/config';
import { Value } from '@myex/types/common';

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

export default function Number({ value, nDecimals = 0 }: { value: Value; nDecimals?: number }) {
  if (BigNumber(String(value)).isNaN()) {
    return <span>N.A.</span>;
  }

  const displayedDecimals = BigNumber(String(value)).isLessThan(BigNumber(10))
    ? PRICE_MAX_DECIMAL_PLACES
    : PRICE_DEFAULT_DECIMAL_PLACES;

  return (
    <span className=''>
      <span className='inline-block w-[0.2rem]' />
      {
        BigNumber(String(value))
          .toFormat(nDecimals || displayedDecimals, priceFormat)
          .replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1') // Remove trailing zeros
      }
    </span>
  );
}
