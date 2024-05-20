import React from 'react';

import Typography from '@mui/material/Typography';
import MyexImage from '@myex/components/MyexImage';
import MyexLink from '@myex/components/MyexLink';
import MyexWindowOpenLink from '@myex/components/MyexWindowOpenLink';
import { Coin as MyexCoin } from '@prisma/client';

export default function Coin({ coin = null }: { coin?: MyexCoin | null }) {
  if (!coin) {
    return <div>No coin</div>;
  }

  const currency = coin.currency;
  const name = coin?.name || '';
  const icon = coin?.icon || `https://static.bitfinex.com/images/icons/${currency}.svg`;
  const cmcUrl =
    coin?.cmcUrl ||
    `https://coinmarketcap.com/currencies/${name.toLowerCase().replaceAll(/[ .]/g, '-')}`;
  const geokoUrl = `https://www.coingecko.com/en/coins/${coin?.coinGeckoId}`;

  return (
    <div className='flex items-center'>
      <div className='flex-shrink-0'>
        <MyexImage src={icon} alt='' width={28} height={28} className='rounded-full' />
      </div>
      <div className='flex flex-col ml-4 justify-center text-left'>
        <MyexLink href={coin.projectUrl} className='inline-flex hover:no-underline'>
          <span className='text-lg font-semibold'>{currency}</span>
        </MyexLink>
        <div className='flex items-center'>
          <Typography
            color='secondary'
            variant='caption'
            classes={{ root: 'leading-none mr-1 md:hidden' }}
          >
            {name}
          </Typography>
          <MyexWindowOpenLink url={cmcUrl} className='flex-shrink-0 mr-1 md:hidden'>
            <MyexImage src='/images/cmc.svg' alt='' width={16} height={16} />
          </MyexWindowOpenLink>
          <MyexWindowOpenLink url={geokoUrl} className='flex-shrink-0 md:hidden'>
            <MyexImage src='/images/geoko.png' alt='' width={16} height={16} />
          </MyexWindowOpenLink>
        </div>
      </div>
    </div>
  );
}
