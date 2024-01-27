'use client';

import React, { useMemo } from 'react';

import MyexTable from '@myex/components/MyexTable';
import { ColumnData } from '@myex/components/MyexTable/types';
import TradingView from '@myex/components/TradingView';
import useWsTradingPairs from '@myex/hooks/useWsTradingPairs';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setCurrentPair } from '@myex/store/trading/actions';
import { selectShowTradingView } from '@myex/store/trading/selectors';
import { BfxTradingPair, BfxWallet } from '@myex/types/bitfinex';
import { ValueFormat } from '@myex/types/common';
import { MyexAsset } from '@myex/types/trading';
import { composeAssetsInfo, currencyToSymbol, getUsdBalance } from '@myex/utils/trading';

import AssetsSummary from './AssetsSummary';

interface Props {
  bfxWallets: BfxWallet[];
  tradingPairs: BfxTradingPair[];
}

const columns: ColumnData<MyexAsset>[] = [
  {
    label: 'Coin',
    dataKey: 'currency',
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
    label: 'Amount',
    dataKey: 'balance',
    format: ValueFormat.Number,
  },
  {
    label: 'Worth (USD)',
    dataKey: '_balanceUsd',
    format: ValueFormat.Money,
    sortable: true,
    className: 'text-lg',
  },
  {
    label: '24H Change %',
    dataKey: 'dailyChangePerc',
    format: ValueFormat.Percentage,
    sortable: true,
  },
];

export default function MyAssets({ bfxWallets, tradingPairs }: Props) {
  const dispatch = useMyexDispatch();
  const showTradingView = useMyexSelector(selectShowTradingView);
  const tradingPairsForAssets = useMemo(
    () => tradingPairs.filter((pair) => bfxWallets.find((w) => w.currency === pair._currency)),
    [bfxWallets, tradingPairs],
  );

  const realTimeData = useWsTradingPairs(tradingPairsForAssets);
  const myexAssets = composeAssetsInfo(bfxWallets, realTimeData);
  const usdBalance = getUsdBalance(bfxWallets);

  const onSetCurrentPair = (row: MyexAsset) => {
    dispatch(setCurrentPair(currencyToSymbol(row.currency)));
  };

  return (
    <>
      <h1>Assets</h1>
      <AssetsSummary assets={myexAssets} usdBalance={usdBalance} />
      <TradingView />
      <MyexTable<MyexAsset>
        data={myexAssets}
        columns={columns}
        defaultSortingField='_balanceUsd'
        defaultSortingDirection='-'
        onRowClick={showTradingView ? onSetCurrentPair : undefined}
      />
    </>
  );
}
