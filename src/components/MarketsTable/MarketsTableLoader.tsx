import React from 'react';

import { fetchMarketCoins } from '@myex/app/serverActions/market';
import MarketsTable from '@myex/components/MarketsTable/MarketsTable';
import ErrorIndicator from '@myex/components/operation/ErrorIndicator';
import { SystemParameter, SystemParameterSettings } from '@myex/types/system';

export default async function MarketsTableLoader({
  userParameters,
}: {
  userParameters: SystemParameterSettings;
}) {
  const marketCoinsRes = await fetchMarketCoins();
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
