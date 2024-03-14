import React from 'react';

import Typography from '@mui/material/Typography';
import { myexFetchCoinById, myexFetchCoins } from '@myex/app/serverActions';
import MyexImage from '@myex/components/MyexImage';
import MyexLink from '@myex/components/MyexLink';

export default async function Coin({ myexId }: { myexId: number }) {
  const coin = await myexFetchCoinById(myexId);
  if (!coin) {
    return <div>No coin</div>;
  }

  const currency = coin.currency;
  const name = coin?.name || '';
  const icon = coin?.icon || `https://static.bitfinex.com/images/icons/${currency}.svg`;
  const cmcUrl =
    coin?.cmcUrl ||
    `https://coinmarketcap.com/currencies/${name.toLowerCase().replaceAll(/[ .]/g, '-')}`;

  return (
    <MyexLink href={coin.projectUrl} className='inline-flex hover:no-underline'>
      <MyexImage src={icon} alt='' width={28} height={28} />
      <div className='flex flex-col ml-4 justify-center text-left'>
        <span className='text-lg font-semibold'>{currency}</span>
        <div className='flex items-center'>
          <Typography color='secondary' variant='caption' classes={{ root: 'leading-none' }}>
            {name}
          </Typography>
          <MyexLink href={cmcUrl}>
            <MyexImage src='/images/cmc.svg' alt='' width={24} height={24} />
          </MyexLink>
        </div>
      </div>
    </MyexLink>
  );
}
