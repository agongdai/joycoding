import { WalletProvider } from '@myex/types/trading';

export interface IFormOnChainWallet {
  myexId?: number;
  name: string;
  address: string;
  protocol: string;
  network: string;
  addedTimestamp: string;
  provider?: WalletProvider | string | null;
  coinMyexId: number;
  userMyexId: number;
}
