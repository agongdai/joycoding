import BigNumber from 'bignumber.js';
import _compact from 'lodash/compact';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';

import { IGNORED_USD_THRESHOLD } from '@myex/config';
import { BinanceWallet } from '@myex/types/binance';
import { BfxWallet } from '@myex/types/bitfinex';
import { CoinInMarket } from '@myex/types/coin';
import { Exchange } from '@myex/types/exchange';
import { Balance, BalanceBreakdown, MyexAsset, MyexWallet } from '@myex/types/trading';

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
 * Get UST balance from wallets
 * @param bfxWallets
 * @param binanceWallets
 */
export function getUstBalance(bfxWallets: BfxWallet[], binanceWallets: BinanceWallet[]): Balance {
  const ustWallet = bfxWallets.find((wallet) => wallet.currency === 'UST');
  const total = ustWallet?.balance || 0;
  const available = ustWallet?.availableBalance || 0;

  const bfxBalance: BalanceBreakdown = {
    total: BigNumber(total),
    available: BigNumber(available),
    exchange: Exchange.Bitfinex,
  };

  const binanceUstWallet = binanceWallets.find((wallet) => wallet.asset === 'USDT');
  const free = BigNumber(binanceUstWallet?.free || 0);
  const locked = BigNumber(binanceUstWallet?.locked || 0);

  const binanceBalance: BalanceBreakdown = {
    total: free.plus(locked),
    available: free,
    exchange: Exchange.Binance,
  };

  return {
    total: bfxBalance.total.plus(binanceBalance.total),
    available: bfxBalance.available.plus(binanceBalance.available),
    breakdown: [bfxBalance, binanceBalance],
  };
}

/**
 * Bitfinex coins might have different coin symbol, sync them.
 * @param bitfinexWallets
 * @param marketCoins
 */
export function syncBitfinexCurrencies(bitfinexWallets: BfxWallet[], marketCoins: CoinInMarket[]) {
  let syned = bitfinexWallets;
  marketCoins.forEach((marketCoin) => {
    const exchangeSymbols = marketCoin?.myexCoin?.exchangeSymbols;
    if (!exchangeSymbols) {
      return;
    }

    const exchangeWithSymbols = exchangeSymbols.split(',');
    const bitfinexSymbol = exchangeWithSymbols.find((s) => s.includes(Exchange.Bitfinex));
    if (bitfinexSymbol) {
      const bitfinexCurrency = bitfinexSymbol.split(':')[1];
      if (bitfinexCurrency) {
        syned = syned.map((wallet) => {
          if (wallet.currency === bitfinexCurrency) {
            wallet.currency = marketCoin.currency;
          }
          return wallet;
        });
      }
    }
  });

  return syned;
}

/**
 * Compose assets info from wallet and trading pairs
 * @param binanceWallets
 * @param bitfinexWallets
 * @param marketCoins
 */
export function composeAssetsInfo(
  binanceWallets: BinanceWallet[],
  bitfinexWallets: BfxWallet[],
  marketCoins: CoinInMarket[],
): MyexAsset[] {
  const bitfinexWalletsWithAmount = bitfinexWallets.filter((wallet) => wallet.balance > 0);
  const synedBitfinexWallets = syncBitfinexCurrencies(bitfinexWalletsWithAmount, marketCoins);

  const binanceWalletsWithAmount = binanceWallets.filter(
    (wallet) => Number(wallet.free) + Number(wallet.locked) > 0,
  );

  const currencies = _uniq([
    ..._map(synedBitfinexWallets, 'currency'),
    ..._map(binanceWalletsWithAmount, 'asset'),
  ]);

  return _compact(
    currencies.map((currency) => {
      const marketCoin = marketCoins.find(
        (marketCoin: CoinInMarket) => marketCoin.currency.toLowerCase() === currency.toLowerCase(),
      );

      if (!marketCoin) {
        return null;
      }

      const bfxAsset = synedBitfinexWallets.find((wallet) => wallet.currency === currency);
      const binanceAsset = binanceWalletsWithAmount.find((wallet) => wallet.asset === currency);

      const walletsOfCurrency: MyexWallet[] = _compact([
        bfxAsset &&
        BigNumber(bfxAsset.balance).multipliedBy(marketCoin.price).gt(IGNORED_USD_THRESHOLD)
          ? {
              totalAmount: BigNumber(bfxAsset.balance),
              availableAmount: BigNumber(bfxAsset.availableBalance),
              exchange: Exchange.Bitfinex,
            }
          : null,
        binanceAsset &&
        BigNumber(binanceAsset.free)
          .plus(BigNumber(binanceAsset.locked))
          .multipliedBy(marketCoin.price)
          .gt(IGNORED_USD_THRESHOLD)
          ? {
              totalAmount: BigNumber(binanceAsset.free).plus(BigNumber(binanceAsset.locked)),
              availableAmount: BigNumber(binanceAsset.free),
              exchange: Exchange.Binance,
            }
          : null,
      ]);

      const walletTotalAmount = walletsOfCurrency.reduce(
        (sum, wallet) => sum.plus(wallet.totalAmount),
        BigNumber(0),
      );

      if (walletTotalAmount.lt(BigNumber(IGNORED_USD_THRESHOLD))) {
        return null;
      }

      return {
        currency,
        amount: walletTotalAmount,
        priceChangePercentage24h: marketCoin.priceChangePercentage24h,
        price: marketCoin.price,
        _balanceUst: walletTotalAmount.multipliedBy(BigNumber(marketCoin.price)), // @composed balance in USDt
        wallets: walletsOfCurrency,
        myexCoin: marketCoin.myexCoin,
      } as MyexAsset;
    }),
  );
}
