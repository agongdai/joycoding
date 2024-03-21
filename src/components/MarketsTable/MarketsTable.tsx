'use client';
import React, { useMemo } from 'react';

import MyexTable from '@myex/components/MyexTable';
import { ColumnData } from '@myex/components/MyexTable/types';
import useWsTradingPairs from '@myex/hooks/useWsTradingPairs';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setCurrentCurrency } from '@myex/store/trading/actions';
import {
  selectFavorites,
  selectShowFavorites,
  selectShowTradingView,
} from '@myex/store/trading/selectors';
import { CoinInMarket } from '@myex/types/coin';

interface Props {
  marketCoins: CoinInMarket[];
  columns: ColumnData<CoinInMarket>[];
}

export default function MarketsTable({ marketCoins, columns }: Props) {
  const showFavoritesState = useMyexSelector(selectShowFavorites);
  const favoritesState = useMyexSelector(selectFavorites);
  const dispatch = useMyexDispatch();
  const showTradingView = useMyexSelector(selectShowTradingView);

  const onSetCurrentCurrency = (row: CoinInMarket) => {
    dispatch(setCurrentCurrency(row.currency));
  };

  const tableData = useMemo(
    () =>
      showFavoritesState
        ? marketCoins.filter((pair) => favoritesState.includes(pair.currency))
        : marketCoins,
    [favoritesState, showFavoritesState, marketCoins],
  );

  // const realTimeData = useWsTradingPairs(tableData);

  return (
    <MyexTable<CoinInMarket>
      data={tableData}
      columns={columns}
      defaultSortingField='priceChangePercentage24h'
      defaultSortingDirection='-'
      onRowClick={showTradingView ? onSetCurrentCurrency : undefined}
    />
  );
}
