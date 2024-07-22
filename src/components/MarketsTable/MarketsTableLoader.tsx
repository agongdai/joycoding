import React from 'react';

import { fetchMarketCoins } from '@myex/app/serverActions/market';
import { myexFetchUserParameters } from '@myex/app/serverActions/myexUserParameter';
import MarketsTable from '@myex/components/MarketsTable/MarketsTable';
import ErrorIndicator from '@myex/components/operation/ErrorIndicator';
import { EmptySystemParameterSettings, SystemParameter } from '@myex/types/system';

export default async function MarketsTableLoader() {
  const marketCoinsRes = await fetchMarketCoins();
  const userParametersRest = await myexFetchUserParameters();
  const userParameters = userParametersRest?.data || EmptySystemParameterSettings;
  const showFavorites = Boolean(
    JSON.parse(userParameters[SystemParameter.ShowFavorites] || 'false'),
  );
  const favorites = JSON.parse(userParameters[SystemParameter.Favorites] || '[]') as string[];

  return (
    <div>
      <ErrorIndicator error={marketCoinsRes.success ? '' : marketCoinsRes.message || 'Failed'} />
      <MarketsTable
        marketCoins={marketCoinsRes.data || []}
        showFavoritesServer={showFavorites}
        favoritesServer={favorites}
      />
    </div>
  );
}
