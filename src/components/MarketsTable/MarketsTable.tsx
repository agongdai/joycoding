'use client';
import React, { useMemo } from 'react';

import MyexFavorite from '@myex/components/operation/MyexFavorite';
import MyexTable from '@myex/components/ui/MyexTable';
import { ColumnData } from '@myex/components/ui/MyexTable/types';
import useFavorite from '@myex/hooks/useFavorite';
import useWsMarketCoins from '@myex/hooks/useWsMarketCoins';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setCurrentCurrency } from '@myex/store/trading/actions';
import { selectShowTradingView } from '@myex/store/trading/selectors';
import { MarketCoin } from '@myex/types/coin';
import { ValueFormat } from '@myex/types/common';

const columns = (showFavorites: boolean, favorites: string[]): ColumnData<MarketCoin>[] => [
  {
    label: 'Coin',
    dataKey: 'currency',
    format: ValueFormat.Coin,
    sortable: true,
    widthRem: 25,
    responsiveClassName: 'md:!basis-[12rem] xs:!basis-[7rem]',
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
    label: (
      <MyexFavorite
        toToggleShowFavorites
        showFavoritesServer={showFavorites}
        favoritesServer={favorites}
      />
    ),
    dataKey: 'currency',
    renderComponent: (currency) => (
      <MyexFavorite
        currency={String(currency)}
        showFavoritesServer={showFavorites}
        favoritesServer={favorites}
      />
    ),
    sortable: false,
    responsiveClassName: 'sm:hidden',
  },
];

interface Props {
  marketCoins: MarketCoin[];
  showFavoritesServer: boolean;
  favoritesServer: string[];
}

export default function MarketsTable({ marketCoins, showFavoritesServer, favoritesServer }: Props) {
  const dispatch = useMyexDispatch();
  const showTradingView = useMyexSelector(selectShowTradingView);
  const { showFavorites, favorites } = useFavorite(showFavoritesServer, favoritesServer);

  const onSetCurrentCurrency = (row: MarketCoin) => {
    dispatch(setCurrentCurrency(row.currency));
  };

  const marketCoinsWithVisibleFlag = useMemo(
    () =>
      showFavorites
        ? marketCoins.map((coin) => ({
            ...coin,
            invisible: !favorites.includes(coin.currency.toUpperCase()),
          }))
        : marketCoins,
    [favorites, showFavorites, marketCoins],
  );

  const realTimeData = useWsMarketCoins(marketCoinsWithVisibleFlag);
  const tableCoins = realTimeData.filter((coin) => !coin.invisible);

  return (
    <MyexTable<MarketCoin>
      uniqueKey='currency'
      data={tableCoins}
      columns={columns(showFavorites, favorites)}
      defaultSortingField='priceChangePercentage24h'
      defaultSortingDirection='-'
      onRowClick={showTradingView ? onSetCurrentCurrency : undefined}
    />
  );
}
