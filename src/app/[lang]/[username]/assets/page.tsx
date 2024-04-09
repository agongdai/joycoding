import React from 'react';

import { fetchBitfinexWallets } from '@myex/app/serverActions';
import { getBinanceBalances } from '@myex/app/serverActions/binanceRestAuth';
import { getGateSpotAccounts } from '@myex/app/serverActions/gateRestAuth';
import { fetchMarketCoins } from '@myex/app/serverActions/market';
import { fetchOkxWallets } from '@myex/app/serverActions/okxRestAuth';
import { fetchOnChainBalances } from '@myex/app/serverActions/onchain';
import MyAssets from '@myex/components/MyAssets';
import { MyexStyledPageWrapper } from '@myex/components/MyexStyled';

export const revalidate = 10;

export default async function Assets() {
  const marketCoins = await fetchMarketCoins();
  const [bfxWallets, binanceWallets, gateWallets, okxWallets, onChainBalances] = await Promise.all([
    fetchBitfinexWallets(marketCoins),
    getBinanceBalances(marketCoins),
    getGateSpotAccounts(marketCoins),
    fetchOkxWallets(marketCoins),
    fetchOnChainBalances(),
  ]);
  return (
    <MyexStyledPageWrapper>
      <MyAssets
        marketCoins={marketCoins}
        exchangeWallets={[...bfxWallets, ...binanceWallets, ...gateWallets, ...okxWallets]}
        onChainBalances={onChainBalances}
      />
    </MyexStyledPageWrapper>
  );
}
