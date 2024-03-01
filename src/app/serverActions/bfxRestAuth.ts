'use server';
import BigNumber from 'bignumber.js';
import crypto from 'crypto';

import { BfxEndpoints } from '@myex/api/endpoints';
import { auth } from '@myex/auth';
import { BfxWallet } from '@myex/types/bitfinex';
import { Exchange } from '@myex/types/exchange';

export async function fetchWallets(): Promise<BfxWallet[]> {
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
  return data
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
    )
    .filter((wallet: BfxWallet) => BigNumber(wallet.balance).isGreaterThan(BigNumber('1e-6')));
}
