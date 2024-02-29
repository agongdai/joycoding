import React from 'react';

import { fetchTradingPairs, fetchWallets } from '@myex/app/serverActions';
import MyAssets from '@myex/components/MyAssets';
import { MyexStyledPageWrapper } from '@myex/components/MyexStyled';

export default async function Assets() {
  const bfxWallets = await fetchWallets();
  const tradingPairs = await fetchTradingPairs();
  return (
    <MyexStyledPageWrapper>
      <MyAssets bfxWallets={bfxWallets} tradingPairs={tradingPairs} />
    </MyexStyledPageWrapper>
  );
}
