'use client';

import React, { useMemo } from 'react';
import BigNumber from 'bignumber.js';

import ExchangeIcon from '@myex/components/ExchangeIcon';
import Money from '@myex/components/MyexFormatter/Money';
import MyexTable from '@myex/components/MyexTable';
import { ColumnData } from '@myex/components/MyexTable/types';
import TradingView from '@myex/components/TradingView';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setCurrentCurrency } from '@myex/store/trading/actions';
import { selectShowTradingView } from '@myex/store/trading/selectors';
import { BinanceWallet } from '@myex/types/binance';
import { BfxWallet } from '@myex/types/bitfinex';
import { CoinInMarket } from '@myex/types/coin';
import { ValueFormat } from '@myex/types/common';
import { GateWallet } from '@myex/types/gate';
import { MyexAsset } from '@myex/types/trading';
import { composeAssetsInfo, getUstBalance } from '@myex/utils/trading';

import AssetsSummary from './AssetsSummary';

interface Props {
  binanceWallets: BinanceWallet[];
  bfxWallets: BfxWallet[];
  marketCoins: CoinInMarket[];
  gateWallets: GateWallet[];
}

const columns: ColumnData<MyexAsset>[] = [
  {
    label: 'Coin',
    dataKey: 'currency',
    format: ValueFormat.Coin,
    sortable: true,
    widthRem: 25,
  },
  {
    label: 'Price',
    dataKey: 'price',
    format: ValueFormat.Money,
    sortable: true,
  },
  {
    label: 'Amount',
    dataKey: 'amount',
    format: ValueFormat.Number,
  },
  {
    label: 'Worth (UST)',
    dataKey: '_balanceUst',
    format: ValueFormat.Money,
    sortable: true,
    className: 'text-lg',
  },
  {
    label: '24H Change %',
    dataKey: 'priceChangePercentage24h',
    format: ValueFormat.Percentage,
    sortable: true,
  },
  {
    label: 'Location',
    dataKey: 'wallets',
    renderComponent: (value, row) => {
      return value ? (
        <div className='flex'>
          {(value as MyexAsset['wallets']).map((wallet) => (
            <ExchangeIcon
              key={wallet.exchange}
              exchange={wallet.exchange}
              tooltip={`${wallet.availableAmount.multipliedBy(row.price).toFixed(0).toString()} USDT`}
            />
          ))}
        </div>
      ) : null;
    },
  },
];

export default function MyAssets({ binanceWallets, bfxWallets, marketCoins, gateWallets }: Props) {
  const dispatch = useMyexDispatch();
  const showTradingView = useMyexSelector(selectShowTradingView);
  const marketCoinsForAssets = useMemo(
    () =>
      marketCoins.filter(
        (marketCoin) =>
          bfxWallets.find((w) => w.currency.toLowerCase() === marketCoin.currency.toLowerCase()) ||
          binanceWallets.find((w) => w.asset.toLowerCase() === marketCoin.currency.toLowerCase()) ||
          gateWallets.find((w) => w.currency.toLowerCase() === marketCoin.currency.toLowerCase()),
      ),
    [bfxWallets, binanceWallets, gateWallets, marketCoins],
  );

  const myexAssets = composeAssetsInfo(
    marketCoinsForAssets,
    binanceWallets,
    bfxWallets,
    gateWallets,
  );
  const ustBalance = getUstBalance(bfxWallets, binanceWallets);

  const onSetCurrentCurrency = (row: MyexAsset) => {
    dispatch(setCurrentCurrency(row.currency));
  };

  const totalBalance = myexAssets.reduce((acc, asset) => acc.plus(asset._balanceUst), BigNumber(0));

  return (
    <>
      <pre>{JSON.stringify(myexAssets, null, 2)}</pre>
      <h1 className='mb-12'>
        Assets &#8776; <Money value={totalBalance.plus(ustBalance.total).toNumber()} flash />
      </h1>
      <AssetsSummary assets={myexAssets} ustBalance={ustBalance} />
      <TradingView />
      <MyexTable<MyexAsset>
        data={myexAssets}
        columns={columns}
        defaultSortingField='_balanceUst'
        defaultSortingDirection='-'
        onRowClick={showTradingView ? onSetCurrentCurrency : undefined}
      />
    </>
  );
}
