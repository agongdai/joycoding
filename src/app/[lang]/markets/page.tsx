import React, { Suspense } from 'react';

import MarketsTableLoader from '@myex/components/MarketsTable/MarketsTableLoader';
import TradingView from '@myex/components/TradingView';
import MyexSkeleton from '@myex/components/ui/MyexSkeleton';
import { MyexStyledPageWrapper } from '@myex/components/ui/MyexStyled';

export const revalidate = 10;

export default function MarketsPage() {
  return (
    <MyexStyledPageWrapper>
      <h1>Markets</h1>
      <TradingView />
      <Suspense fallback={<MyexSkeleton />}>
        <MarketsTableLoader />
      </Suspense>
    </MyexStyledPageWrapper>
  );
}
