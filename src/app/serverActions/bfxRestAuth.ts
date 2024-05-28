'use server';
import crypto from 'crypto';

import { auth } from '@myex/auth';
import { BfxWallet } from '@myex/types/bitfinex';
import { MarketCoin } from '@myex/types/coin';
import { Exchange } from '@myex/types/exchange';
import { BalanceBreakdownFromExchange } from '@myex/types/trading';
import { BfxEndpoints } from '@myex/utils/endpoints';
import { filterWalletsWithValue, syncBitfinexCurrencies } from '@myex/utils/trading';

export async function fetchBitfinexWallets(
  marketCoins: MarketCoin[],
): Promise<BalanceBreakdownFromExchange[]> {
  const session = await auth();
  const bitfinexKey = (session?.user?.exchangeApis || []).find(
    (exchange) => exchange.exchangeId === Exchange.Bitfinex,
  );
  if (!session?.user || !bitfinexKey) {
    return [];
  }

  const apiKey = bitfinexKey.apiKey;
  const apiSecret = bitfinexKey.apiSecret;

  const nonce = (Date.now() * 1000).toString();
  const signaturePayload = `/api/${BfxEndpoints.wallets.apiPath}${nonce}`;
  const signature = crypto.createHmac('sha384', apiSecret).update(signaturePayload).digest('hex');

  try {
    console.debug('fetching bitfinex wallets ...');
    const res = await fetch(`${BfxEndpoints.wallets.path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'bfx-nonce': nonce,
        'bfx-apikey': apiKey,
        'bfx-signature': signature,
      },
    });
    const data = await res.json();
    const wallets: BfxWallet[] = data
      .filter((wallet: (string | number)[]) => wallet[0] === 'exchange')
      .map(
        (wallet: (string | number)[]) =>
          ({
            type: wallet[0],
            currency: wallet[1],
            balance: wallet[2],
            unsettledInterest: wallet[3],
            availableBalance: wallet[4],
            lastChange: wallet[5],
            tradeDetails: wallet[6],
          }) as BfxWallet,
      );
    const syncWallets = syncBitfinexCurrencies(wallets, marketCoins);
    const myexWallets: BalanceBreakdownFromExchange[] = syncWallets.map((wallet) => ({
      currency: wallet.currency === 'UST' ? 'USDT' : wallet.currency,
      totalAmount: wallet.balance,
      availableAmount: wallet.availableBalance,
      exchange: Exchange.Bitfinex,
    }));
    return filterWalletsWithValue(myexWallets, marketCoins);
  } catch (error) {
    console.error('bitfinex error', error);
    return [];
  }
}
