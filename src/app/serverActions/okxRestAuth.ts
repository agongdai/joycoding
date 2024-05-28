'use server';
import BigNumber from 'bignumber.js';
import crypto from 'crypto';
import _get from 'lodash/get';

import { auth } from '@myex/auth';
import { MarketCoin } from '@myex/types/coin';
import { Exchange } from '@myex/types/exchange';
import { OkxWallet } from '@myex/types/okx';
import { BalanceBreakdownFromExchange } from '@myex/types/trading';
import { filterWalletsWithValue } from '@myex/utils/trading';

/**
 * @doc https://www.okx.com/docs-v5/en/#overview-rest-authentication
 */
export async function fetchOkxWallets(
  marketCoins: MarketCoin[],
): Promise<BalanceBreakdownFromExchange[]> {
  const session = await auth();
  const okxKey = (session?.user?.exchangeApis || []).find(
    (exchange) => exchange.exchangeId === Exchange.OKX,
  );
  if (!session?.user || !okxKey) {
    return [];
  }

  const apiKey = okxKey.apiKey;
  const apiSecret = okxKey.apiSecret;
  const apiPassphrase = okxKey.apiPassphrase;

  const nonce = new Date().toISOString();
  const signaturePayload = nonce + 'GET' + '/api/v5/account/balance';
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(signaturePayload)
    .digest('base64');

  try {
    console.debug('fetching okx wallets ...');
    const res = await fetch(`https://www.okx.com/api/v5/account/balance`, {
      method: 'GET',
      // @ts-ignore
      headers: {
        'Content-Type': 'application/json',
        'OK-ACCESS-KEY': apiKey,
        'OK-ACCESS-SIGN': signature,
        'OK-ACCESS-TIMESTAMP': nonce,
        'OK-ACCESS-PASSPHRASE': apiPassphrase,
      },
    });
    const resJson = await res.json();
    const wallets: OkxWallet[] = _get(resJson, 'data.0.details', []).map(
      (wallet: any) =>
        ({
          ccy: wallet?.ccy,
          availBal: wallet?.availBal,
          frozenBal: wallet?.frozenBal,
        }) as OkxWallet,
    );

    const myexWallets: BalanceBreakdownFromExchange[] = wallets.map((wallet) => ({
      currency: wallet.ccy,
      totalAmount: BigNumber(wallet.availBal).plus(BigNumber(wallet.frozenBal)).toString(),
      availableAmount: wallet.availBal,
      exchange: Exchange.OKX,
    }));
    return filterWalletsWithValue(myexWallets, marketCoins);
  } catch (error) {
    console.error('okx error', error);
    return [];
  }
}
