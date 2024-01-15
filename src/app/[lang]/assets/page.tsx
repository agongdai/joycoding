import React from 'react';

import { fetchTradingPairs, fetchWallets } from '@jses/app/serverActions';
import { JsesStyledPageWrapper } from '@jses/components/JsesStyled';
import MyAssets from '@jses/components/MyAssets';

export default async function Assets() {
  const bfxWallets = await fetchWallets();
  const tradingPairs = await fetchTradingPairs();
  return (
    <JsesStyledPageWrapper>
      <h1>Assets</h1>
      <MyAssets bfxWallets={bfxWallets} tradingPairs={tradingPairs} />
    </JsesStyledPageWrapper>
  );
}
