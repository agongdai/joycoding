import React from 'react';

import { fetchMarketCoins } from '@myex/app/serverActions/market';
import MarketsTable from '@myex/components/MarketsTable';
import MyexFavorite from '@myex/components/MyexFavorite';
import { MyexStyledPageWrapper } from '@myex/components/MyexStyled';
import { ColumnData } from '@myex/components/MyexTable/types';
import TradingView from '@myex/components/TradingView';
import { CoinInMarket } from '@myex/types/coin';
import { ValueFormat } from '@myex/types/common';

export const revalidate = 10;

const columns: ColumnData<CoinInMarket>[] = [
  {
    label: 'Coin',
    dataKey: 'currency',
    format: ValueFormat.Coin,
    sortable: true,
    widthRem: 25,
  },
  {
    label: 'Rating',
    dataKey: 'rating',
    format: ValueFormat.Number,
    sortable: true,
    widthRem: 8,
  },
  {
    label: 'Price',
    dataKey: 'price',
    format: ValueFormat.Money,
    sortable: true,
  },
  {
    label: '24H Change %',
    dataKey: 'priceChangePercentage24h',
    format: ValueFormat.Percentage,
    widthRem: 14,
    sortable: true,
  },
  {
    label: 'Daily Volume',
    dataKey: 'volume24h',
    format: ValueFormat.Volume,
    sortable: true,
  },
  {
    label: 'Market Cap',
    dataKey: 'marketCap',
    format: ValueFormat.Volume,
    sortable: true,
  },
  {
    label: 'Market Cap Rank',
    dataKey: 'marketCapRank',
    format: ValueFormat.Number,
    sortable: true,
  },
  {
    widthRem: 2,
    label: <MyexFavorite toToggleShowFavorites />,
    dataKey: 'currency',
    format: ValueFormat.UserActions,
    sortable: false,
  },
];

export default async function MarketsPage() {
  const marketCoins = await fetchMarketCoins();
  return (
    <MyexStyledPageWrapper>
      <h1>Markets</h1>
      <TradingView />
      <MarketsTable marketCoins={marketCoins} columns={columns} />
    </MyexStyledPageWrapper>
  );
}
