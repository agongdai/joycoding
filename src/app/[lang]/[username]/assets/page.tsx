import React from 'react';

import { fetchBitfinexWallets } from '@myex/app/serverActions';
import { getBinanceBalances } from '@myex/app/serverActions/binanceRestAuth';
import { getGateSpotAccounts } from '@myex/app/serverActions/gateRestAuth';
import { fetchMarketCoins } from '@myex/app/serverActions/market';
import { fetchOkxWallets } from '@myex/app/serverActions/okxRestAuth';
import MyAssets from '@myex/components/MyAssets';
import { MyexStyledPageWrapper } from '@myex/components/MyexStyled';

export const revalidate = 10;

export default async function Assets() {
  const marketCoins = await fetchMarketCoins();
  const bfxWallets = await fetchBitfinexWallets();
  const binanceWallets = await getBinanceBalances();
  const gateWallets = await getGateSpotAccounts();
  const okxWallets = await fetchOkxWallets();
  return (
    <MyexStyledPageWrapper>
      <MyAssets
        marketCoins={marketCoins}
        bfxWallets={bfxWallets}
        binanceWallets={binanceWallets}
        gateWallets={gateWallets}
        okxWallets={okxWallets}
      />
    </MyexStyledPageWrapper>
  );
}
