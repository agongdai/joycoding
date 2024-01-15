'use client';
import React from 'react';

import JsesTable from '@jses/components/JsesTable';
import { ColumnData } from '@jses/components/JsesTable/types';
import { useJsesSelector } from '@jses/store';
import { selectFavorites, selectShowFavorites } from '@jses/store/trading/selectors';
import { BfxTradingPair } from '@jses/types/bitfinex';

interface Props {
  tradingPairs: BfxTradingPair[];
  columns: ColumnData<BfxTradingPair>[];
}

export default function MarketsTable({ tradingPairs, columns }: Props) {
  const showFavoritesState = useJsesSelector(selectShowFavorites);
  const favoritesState = useJsesSelector(selectFavorites);
  const tableData = showFavoritesState
    ? tradingPairs.filter((pair) => favoritesState.includes(pair.symbol))
    : tradingPairs;

  return (
    <JsesTable<BfxTradingPair>
      data={tableData}
      columns={columns}
      defaultSortingField='dailyChangePerc'
      defaultSortingDirection='-'
    />
  );
}
