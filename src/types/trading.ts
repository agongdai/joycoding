import BigNumber from 'bignumber.js';

import { BfxTradingPair, BfxWallet } from '@myex/types/bitfinex';
import { Exchange } from '@myex/types/exchange';

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
} & Pick<BfxTradingPair, 'dailyChangePerc' | 'lastPrice'>;
