import React from 'react';

import { fetchTradingPairs } from '@myex/app/serverActions';
import MarketsTable from '@myex/components/MarketsTable';
import MyexFavorite from '@myex/components/MyexFavorite';
import MyexLink from '@myex/components/MyexLink';
import { MyexStyledPageWrapper } from '@myex/components/MyexStyled';
import { ColumnData } from '@myex/components/MyexTable/types';
import TradingView from '@myex/components/TradingView';
import { BfxTradingPair } from '@myex/types/bitfinex';
import { ValueFormat } from '@myex/types/common';

export const revalidate = 10;

const columns: ColumnData<BfxTradingPair>[] = [
  {
    label: 'Coin',
    dataKey: '_currency',
    format: ValueFormat.Coin,
    sortable: true,
  },
  {
    label: 'Price',
    dataKey: 'lastPrice',
    format: ValueFormat.Money,
    sortable: true,
  },
  {
    label: '24H Change',
    dataKey: 'dailyChange',
    format: ValueFormat.Money,
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
    label: <MyexFavorite toToggleShowFavorites />,
    dataKey: 'symbol',
    format: ValueFormat.UserActions,
    sortable: false,
  },
];

export default async function MarketsPage() {
  const tradingPairs = await fetchTradingPairs();
  return (
    <MyexStyledPageWrapper>
      <h1>Markets</h1>
      <p>
        Only{' '}
        <MyexLink href='https://github.com/agongdai/myex.ai/blob/main/src/data/coins.json'>
          some coins
        </MyexLink>{' '}
        are listed.
      </p>
      <TradingView />
      <MarketsTable tradingPairs={tradingPairs} columns={columns} />
    </MyexStyledPageWrapper>
  );
}
