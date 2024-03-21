import React from 'react';

import MyexImage from '@myex/components/MyexImage';
import { Coin } from '@prisma/client';

export default function CoinIcon({ coin }: { coin: Coin }) {
  const currency = coin?.currency || 'UST';
  const icon = coin?.icon || `https://static.bitfinex.com/images/icons/${currency}.svg`;
  return <MyexImage src={icon} alt='' width={28} height={28} className='rounded-full' />;
}
