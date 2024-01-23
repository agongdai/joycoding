'use client';
import React, { useMemo } from 'react';

import MyexTable from '@myex/components/MyexTable';
import { ColumnData } from '@myex/components/MyexTable/types';
import useWsTradingPairs from '@myex/hooks/useWsTradingPairs';
import { useMyexSelector } from '@myex/store';
import { selectFavorites, selectShowFavorites } from '@myex/store/trading/selectors';
import { BfxTradingPair } from '@myex/types/bitfinex';

interface Props {
  tradingPairs: BfxTradingPair[];
  columns: ColumnData<BfxTradingPair>[];
}

export default function MarketsTable({ tradingPairs, columns }: Props) {
  const showFavoritesState = useMyexSelector(selectShowFavorites);
  const favoritesState = useMyexSelector(selectFavorites);

  const tableData = useMemo(
    () =>
      showFavoritesState
        ? tradingPairs.filter((pair) => favoritesState.includes(pair.symbol))
        : tradingPairs,
    [favoritesState, showFavoritesState, tradingPairs],
  );

  const realTimeData = useWsTradingPairs(tableData);

  return (
    <MyexTable<BfxTradingPair>
      data={realTimeData}
      columns={columns}
      defaultSortingField='dailyChangePerc'
      defaultSortingDirection='-'
    />
  );
}
