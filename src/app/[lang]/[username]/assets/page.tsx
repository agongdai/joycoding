import React from 'react';

import { fetchTradingPairs, fetchWallets } from '@myex/app/serverActions';
import { auth } from '@myex/auth';
import MyAssets from '@myex/components/MyAssets';
import { MyexStyledPageWrapper } from '@myex/components/MyexStyled';

export default async function Assets() {
  const session = await auth();
  // @todo only fetch shaojiang's assets right now.
  const bfxWallets = session?.user?.email === 'caishaojiang@gmail.com' ? await fetchWallets() : [];
  const tradingPairs = await fetchTradingPairs();
  return (
    <MyexStyledPageWrapper>
      <h1>Assets</h1>
      <MyAssets bfxWallets={bfxWallets} tradingPairs={tradingPairs} />
    </MyexStyledPageWrapper>
  );
}
