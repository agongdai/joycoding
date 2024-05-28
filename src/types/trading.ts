import BigNumber from 'bignumber.js';

import { MarketCoin } from '@myex/types/coin';
import { Exchange } from '@myex/types/exchange';
import { Coin, Transaction } from '@prisma/client';

export type BalanceBreakdown = {
  totalAmount: string;
  availableAmount: string;
  exchange: Exchange;
};

export type BalanceBreakdownFromExchange = BalanceBreakdown & {
  currency: string;
};

export type Balance = {
  totalAmount: string;
  availableAmount: string;
  breakdown?: BalanceBreakdown[];
};

export type MyexWallet = {
  totalAmount: string;
  availableAmount: string;
  exchange: Exchange;
  address?: string;
};

export type MyexAsset = {
  currency: string;
  amount: string;
  price: string;
  priceChangePercentage24h: string;
  _balanceUst: number; // @composed balance in USDt
  wallets: MyexWallet[];
  myexCoin?: Coin | null;
  myexTransaction?: Transaction | null;
};

export enum WalletProvider {
  Ledger = 'Ledger',
  BitGetWallet = 'BitGetWallet',
  MetaMask = 'MetaMask',
  Unknown = '',
}

export type WsRealTimeData = Pick<
  MarketCoin,
  'currency' | 'price' | 'priceChangePercentage24h' | 'volume24h'
>;
