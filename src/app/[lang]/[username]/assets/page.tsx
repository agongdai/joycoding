import React from 'react';

import { fetchTradingPairs, fetchWallets } from '@myex/app/serverActions';
import { getBalances } from '@myex/app/serverActions/binanceRestAuth';
import MyAssets from '@myex/components/MyAssets';
import { MyexStyledPageWrapper } from '@myex/components/MyexStyled';

// export const revalidate = 30;

export default async function Assets() {
  const bfxWallets = await fetchWallets();
  const tradingPairs = await fetchTradingPairs();
  const binanceWallets = await getBalances();
  return (
    <MyexStyledPageWrapper>
      <MyAssets
        bfxWallets={bfxWallets}
        binanceWallets={binanceWallets}
        tradingPairs={tradingPairs}
      />
    </MyexStyledPageWrapper>
  );
}
