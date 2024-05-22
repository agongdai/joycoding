import React from 'react';

import MyexImage from '@myex/components/ui/MyexImage';
import { Coin } from '@prisma/client';

interface Props {
  coin: Coin | undefined;
  size?: number;
}

export default function CoinIcon({ coin, size = 28 }: Props) {
  if (!coin) return null;
  const currency = coin?.currency || 'UST';
  const icon = coin?.icon || `https://static.bitfinex.com/images/icons/${currency}.svg`;
  return <MyexImage src={icon} alt='' width={size} height={size} className='rounded-full' />;
}
