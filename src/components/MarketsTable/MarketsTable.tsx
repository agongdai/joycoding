'use client';
import React, { useMemo } from 'react';

import MyexTable from '@myex/components/MyexTable';
import { ColumnData } from '@myex/components/MyexTable/types';
import useWsTradingPairs from '@myex/hooks/useWsTradingPairs';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setCurrentPair } from '@myex/store/trading/actions';
import {
  selectFavorites,
  selectShowFavorites,
  selectShowTradingView,
} from '@myex/store/trading/selectors';
import { BfxTradingPair } from '@myex/types/bitfinex';

interface Props {
  tradingPairs: BfxTradingPair[];
  columns: ColumnData<BfxTradingPair>[];
}

export default function MarketsTable({ tradingPairs, columns }: Props) {
  const showFavoritesState = useMyexSelector(selectShowFavorites);
  const favoritesState = useMyexSelector(selectFavorites);
  const dispatch = useMyexDispatch();
  const showTradingView = useMyexSelector(selectShowTradingView);

  const onSetCurrentPair = (row: BfxTradingPair) => {
    dispatch(setCurrentPair(row.symbol));
  };

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
      onRowClick={showTradingView ? onSetCurrentPair : undefined}
    />
  );
}
