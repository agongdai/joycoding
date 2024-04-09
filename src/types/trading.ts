import BigNumber from 'bignumber.js';

import { Exchange } from '@myex/types/exchange';
import { Coin } from '@prisma/client';

export type BalanceBreakdown = {
  totalAmount: string;
  availableAmount: string;
  exchange: Exchange;
};

export type BalanceBreakdownFromExchange = BalanceBreakdown & {
  currency: string;
};

export type Balance = {
  totalAmount: BigNumber;
  availableAmount: BigNumber;
  breakdown?: BalanceBreakdown[];
};

export type MyexWallet = {
  totalAmount: BigNumber;
  availableAmount: BigNumber;
  exchange: Exchange;
  address?: string;
};

export type MyexAsset = {
  currency: string;
  amount: BigNumber;
  price: BigNumber;
  priceChangePercentage24h: BigNumber;
  _balanceUst: number; // @composed balance in USDt
  wallets: MyexWallet[];
  myexCoin?: Coin | null;
};

export enum WalletProvider {
  Ledger = 'Ledger',
  BitGetWallet = 'BitGetWallet',
  MetaMask = 'MetaMask',
  Unknown = '',
}
