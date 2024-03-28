import BigNumber from 'bignumber.js';

import { WalletProvider } from '@myex/types/trading';
import { Coin, OnChainWallet } from '@prisma/client';

export interface IFormOnChainWallet {
  myexId?: number;
  name: string;
  address: string;
  amount?: string;
  protocol: string;
  network: string;
  addedTimestamp: string;
  provider?: WalletProvider | string | null;
  coinMyexId: number;
  userMyexId: number;
}

export type WalletWithCoin = OnChainWallet & {
  myexCoin: Coin;
};

export type BlockDaemonWallet = {
  currency: {
    asset_path: string;
    symbol: string;
    name: string;
    decimals: number;
    type: string;
  };
  confirmed_balance: string;
  pending_balance: string;
  confirmed_block: number;
};

export type Wallet = {
  currency: string;
  address: string;
  name: string;
  provider: WalletProvider;
  amount: string;
  pendingAmount: string;
  myexCoin?: Coin;
  _balanceUst?: BigNumber;
};
