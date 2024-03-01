import React from 'react';

import { fetchTradingPairs, fetchWallets } from '@myex/app/serverActions';
import { getExchanges } from '@myex/app/serverActions/ccxt';
import MyAssets from '@myex/components/MyAssets';
import { MyexStyledPageWrapper } from '@myex/components/MyexStyled';

export default async function Assets() {
  const bfxWallets = await fetchWallets();
  const tradingPairs = await fetchTradingPairs();
  const exchanges = await getExchanges();
  return (
    <MyexStyledPageWrapper>
      Exchanges: {JSON.stringify(exchanges)}
      <MyAssets bfxWallets={bfxWallets} tradingPairs={tradingPairs} />
    </MyexStyledPageWrapper>
  );
}
