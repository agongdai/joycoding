import BigNumber from 'bignumber.js';
import _compact from 'lodash/compact';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';

import { IGNORED_USD_THRESHOLD } from '@myex/config';
import { BinanceWallet } from '@myex/types/binance';
import { BfxWallet } from '@myex/types/bitfinex';
import { CoinInMarket } from '@myex/types/coin';
import { Exchange } from '@myex/types/exchange';
import { GateWallet } from '@myex/types/gate';
import { OkxWallet } from '@myex/types/okx';
import {
  Balance,
  BalanceBreakdown,
  BalanceBreakdownFromExchange,
  MyexAsset,
  MyexWallet,
  WalletProvider,
} from '@myex/types/trading';

export function getWalletProviderImageUrl(provider: WalletProvider) {
  switch (provider) {
    case WalletProvider.MetaMask:
      return '/images/metamask.svg';
    case WalletProvider.Ledger:
      return '/images/ledger.svg';
    case WalletProvider.BitGetWallet:
      return '/images/bitget-wallet.png';
    default:
      return '/images/ledger.svg';
  }
}

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
 *
 * @param exchangeWallets
 */
export function getUstBalance(exchangeWallets: BalanceBreakdownFromExchange[]): Balance {
  const ustWallets = exchangeWallets.filter((wallet) => wallet.currency === 'USDT');

  return {
    totalAmount: ustWallets.reduce(
      (sum, exchange) => BigNumber(exchange.totalAmount).plus(sum),
      BigNumber(0),
    ),
    availableAmount: ustWallets.reduce(
      (sum, exchange) => BigNumber(exchange.availableAmount).plus(sum),
      BigNumber(0),
    ),
    breakdown: ustWallets,
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
 * Filter wallets with value
 * @param wallets
 * @param marketCoins
 */
export function filterWalletsWithValue(
  wallets: BalanceBreakdownFromExchange[],
  marketCoins: CoinInMarket[],
) {
  return wallets
    .filter((wallet) => !BigNumber(wallet.totalAmount).isZero())
    .filter((wallet) => {
      const marketCoin = marketCoins.find(
        (marketCoin) => marketCoin.currency.toLowerCase() === wallet.currency.toLowerCase(),
      );
      return BigNumber(wallet.totalAmount)
        .multipliedBy(marketCoin?.price || 0)
        .gt(IGNORED_USD_THRESHOLD);
    });
}

/**
 * Compose assets info from exchanges
 * @param marketCoins
 * @param exchangeWallets
 */
export function composeAssetsInfo(
  marketCoins: CoinInMarket[],
  exchangeWallets: BalanceBreakdownFromExchange[],
): MyexAsset[] {
  const walletsWithoutUst = exchangeWallets.filter((wallet) => wallet.currency !== 'USDT');

  const currencies = _uniq([..._map(walletsWithoutUst, 'currency')]);

  return _compact(
    currencies.map((currency) => {
      const marketCoin = marketCoins.find(
        (marketCoin: CoinInMarket) => marketCoin.currency.toLowerCase() === currency.toLowerCase(),
      );

      if (!marketCoin) {
        return null;
      }

      const walletsOfCurrency: MyexWallet[] = exchangeWallets
        .filter((wallet) => wallet.currency === currency)
        .map((wallet) => ({
          totalAmount: BigNumber(wallet.totalAmount),
          availableAmount: BigNumber(wallet.availableAmount),
          exchange: wallet.exchange,
        }));

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
        _balanceUst: walletTotalAmount.multipliedBy(BigNumber(marketCoin.price)).toNumber(), // @composed balance in USDt
        wallets: walletsOfCurrency,
        myexCoin: marketCoin.myexCoin,
      } as MyexAsset;
    }),
  );
}
