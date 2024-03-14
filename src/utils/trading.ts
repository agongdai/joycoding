import BigNumber from 'bignumber.js';
import _compact from 'lodash/compact';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';

import { BinanceWallet } from '@myex/types/binance';
import { BfxTradingPair, BfxWallet } from '@myex/types/bitfinex';
import { Exchange } from '@myex/types/exchange';
import { Balance, MyexAsset, MyexWallet } from '@myex/types/trading';

/**
 * `BTC` => `tBTCUSD`
 * @param currency
 */
export function currencyToSymbol(currency: string) {
  return `t${currency}${currency.length === 3 ? '' : ':'}UST`;
}

/**
 * `tBTCUSD` => `BTC`
 * @param symbol
 */
export function symbolToCurrency(symbol: string) {
  return symbol.slice(1, -3).replace(':', '');
}

/**
 * `tBTCUSD` => `BTCUSD`
 * @param symbol
 */
export function symbolToPair(symbol: string) {
  return symbol.slice(1);
}

/**
 * `LUNA2:USD` => `LUNA2USD`
 * @param pair
 */
export function pairToTradingViewSymbol(pair: string) {
  return pair.replace(':', '');
}

/**
 * Get USD balance from wallets
 * @param wallets
 */
export function getUsdBalance(wallets: BfxWallet[]): Balance {
  const usdWallet = wallets.find((wallet) => wallet.currency === 'USD');
  const total = usdWallet?.balance || 0;
  const available = usdWallet?.availableBalance || 0;

  return {
    total,
    available,
  };
}

/**
 * Get USD balance from wallets
 * @param wallets
 */
export function getUstBalance(wallets: BfxWallet[]): Balance {
  const usdWallet = wallets.find((wallet) => wallet.currency === 'UST');
  const total = usdWallet?.balance || 0;
  const available = usdWallet?.availableBalance || 0;

  return {
    total,
    available,
  };
}

/**
 * Compose assets info from wallet and trading pairs
 * @param binanceWallets
 * @param bitfinexWallets
 * @param tradingPairs
 */
export function composeAssetsInfo(
  binanceWallets: BinanceWallet[],
  bitfinexWallets: BfxWallet[],
  tradingPairs: BfxTradingPair[],
): MyexAsset[] {
  const currencies = _uniq([
    ..._map(bitfinexWallets, 'currency'),
    ..._map(binanceWallets, 'asset'),
  ]);
  console.log('currencies', currencies);

  return _compact(
    currencies.map((currency) => {
      const tradingPair = tradingPairs.find((pair: BfxTradingPair) => pair._currency === currency);

      if (!tradingPair) {
        return null;
      }

      const bfxAsset = bitfinexWallets.find((wallet) => wallet.currency === currency);
      const binanceAsset = binanceWallets.find((wallet) => wallet.asset === currency);

      const walletsOfCurrency: MyexWallet[] = _compact([
        bfxAsset
          ? {
              totalAmount: BigNumber(bfxAsset.balance),
              availableAmount: BigNumber(bfxAsset.availableBalance),
              exchange: Exchange.Bitfinex,
            }
          : null,
        binanceAsset
          ? {
              totalAmount: BigNumber(binanceAsset.free).plus(BigNumber(binanceAsset.locked)),
              availableAmount: BigNumber(binanceAsset.free),
              exchange: Exchange.Bitfinex,
            }
          : null,
      ]);

      const walletTotalAmount = walletsOfCurrency.reduce(
        (sum, wallet) => sum.plus(wallet.totalAmount),
        BigNumber(0),
      );

      return {
        currency,
        amount: walletTotalAmount,
        dailyChangePerc: tradingPair.dailyChangePerc,
        lastPrice: tradingPair.lastPrice,
        _balanceUst: walletTotalAmount.multipliedBy(BigNumber(tradingPair.lastPrice)), // @composed balance in USDt
        wallets: walletsOfCurrency,
      } as MyexAsset;
    }),
  );
}
