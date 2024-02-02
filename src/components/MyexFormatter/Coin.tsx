import React from 'react';

import Typography from '@mui/material/Typography';
import MyexImage from '@myex/components/MyexImage';
import MyexLink from '@myex/components/MyexLink';
import coins from '@myex/data/coins.json';
import { Value } from '@myex/types/common';

export default function Coin({ value }: { value: Value }) {
  const currency = String(value);
  const coin = coins.find((coin) => coin.currency === currency);
  const name = coin?.name || '';
  const icon = coin?.icon || `https://static.bitfinex.com/images/icons/${currency}.svg`;

  return (
    <MyexLink
      href={`https://coinmarketcap.com/currencies/${name.toLowerCase().replaceAll(/[ .]/g, '-')}`}
      className='inline-flex hover:no-underline'
    >
      <MyexImage src={icon} alt='' width={28} height={28} />
      <div className='flex flex-col ml-4 justify-center text-left'>
        <span className='text-lg font-semibold'>{currency}</span>
        <Typography color='secondary' variant='caption' classes={{ root: 'leading-none' }}>
          {name}
        </Typography>
      </div>
    </MyexLink>
  );
}
