'use client';
import React, { useMemo } from 'react';

import MyexTable from '@myex/components/ui/MyexTable';
import { ColumnData } from '@myex/components/ui/MyexTable/types';
import useWsMarketCoins from '@myex/hooks/useWsMarketCoins';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setCurrentCurrency } from '@myex/store/trading/actions';
import {
  selectFavorites,
  selectShowFavorites,
  selectShowTradingView,
} from '@myex/store/trading/selectors';
import { MarketCoin } from '@myex/types/coin';

interface Props {
  marketCoins: MarketCoin[];
  columns: ColumnData<MarketCoin>[];
}

export default function MarketsTable({ marketCoins, columns }: Props) {
  const showFavoritesState = useMyexSelector(selectShowFavorites);
  const favoritesState = useMyexSelector(selectFavorites);
  const dispatch = useMyexDispatch();
  const showTradingView = useMyexSelector(selectShowTradingView);

  const onSetCurrentCurrency = (row: MarketCoin) => {
    dispatch(setCurrentCurrency(row.currency));
  };

  const marketCoinsWithVisibleFlag = useMemo(
    () =>
      showFavoritesState
        ? marketCoins.map((coin) => ({
            ...coin,
            invisible: !favoritesState.includes(coin.currency.toUpperCase()),
          }))
        : marketCoins,
    [favoritesState, showFavoritesState, marketCoins],
  );

  const realTimeData = useWsMarketCoins(marketCoinsWithVisibleFlag);
  const tableCoins = realTimeData.filter((coin) => !coin.invisible);

  return (
    <MyexTable<MarketCoin>
      uniqueKey='currency'
      data={tableCoins}
      columns={columns}
      defaultSortingField='priceChangePercentage24h'
      defaultSortingDirection='-'
      onRowClick={showTradingView ? onSetCurrentCurrency : undefined}
    />
  );
}
