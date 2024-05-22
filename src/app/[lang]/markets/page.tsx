import React from 'react';

import { fetchMarketCoins } from '@myex/app/serverActions/market';
import MarketsTable from '@myex/components/MarketsTable';
import MyexFavorite from '@myex/components/operation/MyexFavorite';
import TradingView from '@myex/components/TradingView';
import { MyexStyledPageWrapper } from '@myex/components/ui/MyexStyled';
import { ColumnData } from '@myex/components/ui/MyexTable/types';
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
    responsiveClassName: 'md:!basis-[12rem] xs:!basis-[6rem]',
  },
  {
    label: 'Rating',
    dataKey: 'rating',
    format: ValueFormat.Number,
    sortable: true,
    widthRem: 8,
    responsiveClassName: 'sm:hidden',
  },
  {
    label: 'Price',
    dataKey: 'price',
    format: ValueFormat.Money,
    sortable: true,
    responsiveClassName: 'md:!basis-[15rem] xs:!basis-[8rem] xs:px-0',
  },
  {
    label: '24H Change %',
    dataKey: 'priceChangePercentage24h',
    format: ValueFormat.Percentage,
    widthRem: 14,
    sortable: true,
    responsiveClassName: 'sm:!basis-[11rem] xs:!basis-[7.2rem] sm:justify-end sm:mr-2',
  },
  {
    label: 'Daily Volume',
    dataKey: 'volume24h',
    format: ValueFormat.Volume,
    sortable: true,
    responsiveClassName: 'lg:hidden',
  },
  {
    label: 'Market Cap',
    dataKey: 'marketCap',
    format: ValueFormat.Volume,
    sortable: true,
    responsiveClassName: 'xxl:hidden',
  },
  {
    label: 'Market Cap Rank',
    dataKey: 'marketCapRank',
    format: ValueFormat.Number,
    sortable: true,
    responsiveClassName: 'xl:hidden',
  },
  {
    label: 'Exchanges',
    dataKey: 'exchanges',
    format: ValueFormat.Exchange,
    widthRem: 11,
    sortable: true,
    className: 'justify-center',
    responsiveClassName: 'sm:hidden',
  },
  {
    widthRem: 2,
    label: <MyexFavorite toToggleShowFavorites />,
    dataKey: 'currency',
    format: ValueFormat.UserActions,
    sortable: false,
    responsiveClassName: 'sm:hidden',
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
