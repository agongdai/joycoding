// @doc https://docs.bitfinex.com/reference/rest-auth-wallets#wallet-arrays
export type BfxWallet = {
  type: string;
  currency: string;
  balance: number;
  unsettledInterest: number;
  availableBalance: number;
  lastChange: string;
  tradeDetails: string;
};
