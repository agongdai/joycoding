import React from 'react';

import { fetchWallets } from '@myex/app/serverActions';
import { getBalances } from '@myex/app/serverActions/binanceRestAuth';
import { fetchMarketCoins } from '@myex/app/serverActions/market';
import MyAssets from '@myex/components/MyAssets';
import { MyexStyledPageWrapper } from '@myex/components/MyexStyled';

export const revalidate = 10;

export default async function Assets() {
  const bfxWallets = await fetchWallets();
  const marketCoins = await fetchMarketCoins();
  const binanceWallets = await getBalances();
  return (
    <MyexStyledPageWrapper>
      <MyAssets bfxWallets={bfxWallets} binanceWallets={binanceWallets} marketCoins={marketCoins} />
    </MyexStyledPageWrapper>
  );
}
