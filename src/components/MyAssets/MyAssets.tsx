import React from 'react';

import MyexTable from '@myex/components/MyexTable';
import { ColumnData } from '@myex/components/MyexTable/types';
import { BfxTradingPair, BfxWallet } from '@myex/types/bitfinex';
import { ValueFormat } from '@myex/types/common';
import { MyexAsset } from '@myex/types/trading';
import { composeAssetsInfo } from '@myex/utils/trading';

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
    label: 'Balance (USD)',
    dataKey: '_balanceUsd',
    format: ValueFormat.Money,
    sortable: true,
  },
  {
    label: '24H Change %',
    dataKey: 'dailyChangePerc',
    format: ValueFormat.Percentage,
    sortable: true,
  },
];

export default function MyAssets({ bfxWallets, tradingPairs }: Props) {
  const myexAssets = composeAssetsInfo(bfxWallets, tradingPairs);
  return (
    <MyexTable<MyexAsset>
      data={myexAssets}
      columns={columns}
      defaultSortingField='_balanceUsd'
      defaultSortingDirection='-'
    />
  );
}
