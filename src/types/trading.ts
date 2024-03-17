import BigNumber from 'bignumber.js';

import { BfxTradingPair, BfxWallet } from '@myex/types/bitfinex';
import { Exchange } from '@myex/types/exchange';
import { Coin } from '@prisma/client';

export type Balance = {
  total: number;
  available?: number;
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
  _balanceUst: BigNumber; // @composed balance in USDt
  wallets: MyexWallet[];
  myexCoin?: Coin | null;
} & Pick<BfxTradingPair, 'dailyChangePerc' | 'lastPrice'>;
