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
import { CoinInMarket } from '@myex/types/coin';
import { ValueFormat } from '@myex/types/common';
import { BalanceBreakdownFromExchange, MyexAsset } from '@myex/types/trading';
import { Wallet } from '@myex/types/wallet';
import { composeAssetsInfo, getUstBalance } from '@myex/utils/trading';

import AssetsSummary from './AssetsSummary';

interface Props {
  marketCoins: CoinInMarket[];
  exchangeWallets: BalanceBreakdownFromExchange[];
  onChainBalances: Wallet[];
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
    label: 'Exchanges',
    dataKey: 'wallets',
    renderComponent: (value, row) => {
      return value ? (
        <div className='flex'>
          {(value as MyexAsset['wallets']).map((wallet) => (
            <ExchangeIcon
              key={wallet.exchange}
              exchange={wallet.exchange}
              tooltip={`${wallet.totalAmount.multipliedBy(row.price).toFixed(0).toString()} USDT`}
            />
          ))}
        </div>
      ) : null;
    },
  },
];

export default function MyAssets({ marketCoins, exchangeWallets, onChainBalances }: Props) {
  const dispatch = useMyexDispatch();
  const showTradingView = useMyexSelector(selectShowTradingView);
  const marketCoinsForAssets = useMemo(
    () =>
      marketCoins.filter((marketCoin) =>
        exchangeWallets.find((w) => w.currency.toLowerCase() === marketCoin.currency.toLowerCase()),
      ),
    [exchangeWallets, marketCoins],
  );

  const myexAssets = composeAssetsInfo(marketCoinsForAssets, exchangeWallets);
  const ustBalance = getUstBalance(exchangeWallets);

  const onSetCurrentCurrency = (row: MyexAsset) => {
    dispatch(setCurrentCurrency(row.currency));
  };

  const totalBalance = myexAssets.reduce((acc, asset) => acc.plus(asset._balanceUst), BigNumber(0));

  const walletsWithBalance = onChainBalances.map((wallet) => ({
    ...wallet,
    _balanceUst: BigNumber(wallet.amount).multipliedBy(
      BigNumber(
        marketCoins.find((coin) => coin.currency.toLowerCase() === wallet.currency.toLowerCase())
          ?.price || 0,
      ),
    ),
  }));

  const onChainTotalBalance = walletsWithBalance.reduce(
    (acc, asset) => BigNumber(acc).plus(asset?._balanceUst || 0),
    BigNumber(0),
  );

  return (
    <>
      <h1 className='mb-8'>
        Assets &#8776;{' '}
        <Money
          value={totalBalance.plus(ustBalance.totalAmount).plus(onChainTotalBalance).toNumber()}
          flash
        />
      </h1>
      <AssetsSummary
        assets={myexAssets}
        ustBalance={ustBalance}
        onChainWallets={walletsWithBalance}
      />
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
