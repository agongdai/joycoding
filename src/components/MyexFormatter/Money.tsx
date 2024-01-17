import React from 'react';

import { FIAT_CURRENCY_SYMBOL } from '@myex/config';
import { Value } from '@myex/types/common';

import Number from './Number';

interface Props {
  value: Value;
  nDecimals?: number;
  currencySymbol?: string;
}

export default function Money({
  value,
  nDecimals = 0,
  currencySymbol = FIAT_CURRENCY_SYMBOL,
}: Props) {
  return (
    <span className=''>
      {currencySymbol}
      <Number value={value} nDecimals={nDecimals} />
    </span>
  );
}
