import React from 'react';

import { fetchTradingPairs } from '@jses/app/serverActions';
import JsesFavorite from '@jses/components/JsesFavorite';
import { JsesStyledPageWrapper } from '@jses/components/JsesStyled';
import { ColumnData } from '@jses/components/JsesTable/types';
import MarketsTable from '@jses/components/MarketsTable';
import { BfxTradingPair } from '@jses/types/bitfinex';
import { ValueFormat } from '@jses/types/common';

export const revalidate = 10;

const columns: ColumnData<BfxTradingPair>[] = [
  {
    label: 'Name',
    dataKey: 'symbol',
    format: ValueFormat.Coin,
    sortable: true,
  },
  {
    label: 'Price',
    dataKey: 'lastPrice',
    format: ValueFormat.Price,
    sortable: true,
  },
  {
    label: '24H Change',
    dataKey: 'dailyChange',
    format: ValueFormat.Price,
  },
  {
    label: '24H Change %',
    dataKey: 'dailyChangePerc',
    format: ValueFormat.Percentage,
    sortable: true,
  },
  {
    label: 'Daily Volume',
    dataKey: '_volumeAmount',
    format: ValueFormat.Volume,
    sortable: true,
  },
  {
    widthRem: 2,
    label: <JsesFavorite toToggleShowFavorites />,
    dataKey: 'symbol',
    format: ValueFormat.UserActions,
    sortable: false,
  },
];

export default async function MarketsPage() {
  const tradingPairs = await fetchTradingPairs();
  return (
    <JsesStyledPageWrapper>
      <h1>Markets</h1>
      <MarketsTable tradingPairs={tradingPairs} columns={columns} />
    </JsesStyledPageWrapper>
  );
}
