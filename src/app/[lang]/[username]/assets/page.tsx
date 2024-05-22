import React from 'react';

import { fetchAssetsFromExchanges } from '@myex/app/serverActions/exchanges';
import { fetchMarketCoins } from '@myex/app/serverActions/market';
import { myexFetchOpenTransactions } from '@myex/app/serverActions/myexTransaction';
import { fetchOnChainBalances } from '@myex/app/serverActions/onchain';
import MyAssets from '@myex/components/MyAssets';
import { MyexStyledPageWrapper } from '@myex/components/ui/MyexStyled';
import { composeAssetsInfo, getUstBalance } from '@myex/utils/trading';

export const revalidate = 10;

export default async function AssetsPage() {
  const marketCoins = await fetchMarketCoins();
  const [exchangeWallets, onChainBalances] = await Promise.all([
    fetchAssetsFromExchanges(marketCoins),
    fetchOnChainBalances(),
  ]);
  const myexAssets = composeAssetsInfo(marketCoins, exchangeWallets);
  const myexAssetsWithTx = await myexFetchOpenTransactions(myexAssets);
  const ustBalance = getUstBalance(exchangeWallets);
  return (
    <MyexStyledPageWrapper>
      <MyAssets
        marketCoins={marketCoins}
        myexAssets={myexAssetsWithTx}
        onChainBalances={onChainBalances}
        ustBalance={ustBalance}
      />
    </MyexStyledPageWrapper>
  );
}
