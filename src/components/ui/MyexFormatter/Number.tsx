import React from 'react';
import BigNumber from 'bignumber.js';

import {
  NUMBER_DECIMALS_FOR_SHORTENED,
  PRICE_DEFAULT_DECIMAL_PLACES,
  PRICE_MAX_DECIMAL_PLACES,
} from '@myex/config';
import { Value } from '@myex/types/common';
import { shortenNumber } from '@myex/utils/number';

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

interface Props {
  value: Value;
  nDecimals?: number;
  keepTrailingZeros?: boolean;
  shorten?: boolean;
}

function Number({ value, nDecimals = 0, keepTrailingZeros = false, shorten = false }: Props) {
  const n = BigNumber(String(value));
  if (n.isNaN()) {
    return <span>N.A.</span>;
  }

  let [displayedN, unit] = shorten ? shortenNumber(n.toString()) : [n.toString(), ''];

  const displayedDecimals = BigNumber(String(value)).isLessThan(1)
    ? PRICE_MAX_DECIMAL_PLACES
    : PRICE_DEFAULT_DECIMAL_PLACES;

  const decimals = !!unit ? NUMBER_DECIMALS_FOR_SHORTENED : nDecimals || displayedDecimals;

  let formatted = BigNumber(displayedN).toFormat(decimals, priceFormat);

  if (!keepTrailingZeros) {
    formatted = formatted.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1'); // Remove trailing zeros
  }

  return (
    <span className=''>
      <span className='inline-block w-[0.2rem]' />
      {formatted}
      {!!unit ? <span className='ml-[1px] font-semibold'>{unit}</span> : null}
    </span>
  );
}

export default React.memo(Number);
