import React from 'react';

import Typography from '@mui/material/Typography';
import MyexImage from '@myex/components/MyexImage';
import MyexLink from '@myex/components/MyexLink';
import coins from '@myex/data/coins.json';
import { Value } from '@myex/types/common';
import { symbolToCurrency } from '@myex/utils/trading';

export default function Coin({ value }: { value: Value }) {
  const strValue = String(value);
  const currency = symbolToCurrency(strValue);
  const name = coins.find((coin) => coin.currency === currency)?.name || '';

  return (
    <MyexLink
      href={`https://coinmarketcap.com/currencies/${name.toLowerCase().replaceAll(/[ .]/g, '-')}`}
      className='inline-flex hover:no-underline'
    >
      <MyexImage
        src={`https://static.bitfinex.com/images/icons/${currency}.svg`}
        alt=''
        width={28}
        height={28}
      />
      <div className='flex flex-col ml-4 justify-center text-left'>
        <span className='text-lg font-semibold'>{currency}</span>
        <Typography color='secondary' variant='caption' classes={{ root: 'leading-none' }}>
          {name}
        </Typography>
      </div>
    </MyexLink>
  );
}
