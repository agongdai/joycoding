// @doc https://docs.bitfinex.com/reference/rest-auth-wallets#wallet-arrays
export type BfxWallet = {
  type: string;
  currency: string;
  balance: string;
  unsettledInterest: number;
  availableBalance: string;
  lastChange: string;
  tradeDetails: string;
};
