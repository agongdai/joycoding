import React, { Suspense } from 'react';

import { myexFetchUserParameters } from '@myex/app/serverActions/myexUserParameter';
import MarketsTableLoader from '@myex/components/MarketsTable/MarketsTableLoader';
import TradingView from '@myex/components/TradingView';
import MyexSkeleton from '@myex/components/ui/MyexSkeleton';
import { MyexStyledPageWrapper } from '@myex/components/ui/MyexStyled';
import { EmptySystemParameterSettings } from '@myex/types/system';

export const revalidate = 10;

export default async function MarketsPage() {
  const userParametersRest = await myexFetchUserParameters();
  const userParameters = userParametersRest?.data || EmptySystemParameterSettings;

  return (
    <MyexStyledPageWrapper>
      <h1>Markets</h1>
      <TradingView />
      <Suspense fallback={<MyexSkeleton />}>
        <MarketsTableLoader userParameters={userParameters} />
      </Suspense>
    </MyexStyledPageWrapper>
  );
}
