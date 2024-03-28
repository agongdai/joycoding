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
 * Get UST balance from wallets
 * @param bfxWallets
 * @param binanceWallets
 * @param gateWallets
 * @param okxWallets
 */
export function getUstBalance(
  bfxWallets: BfxWallet[],
  binanceWallets: BinanceWallet[],
  gateWallets: GateWallet[],
  okxWallets: OkxWallet[],
): Balance {
  const ustWallet = bfxWallets.find((wallet) => wallet.currency === 'UST');
  const total = ustWallet?.balance || 0;
  const available = ustWallet?.availableBalance || 0;

  const bfxBalance: BalanceBreakdown = {
    total: BigNumber(total),
    available: BigNumber(available),
    exchange: Exchange.Bitfinex,
  };

  const binanceUstWallet = binanceWallets.find((wallet) => wallet.asset === 'USDT');
  const binanceFree = BigNumber(binanceUstWallet?.free || 0);
  const binanceLocked = BigNumber(binanceUstWallet?.locked || 0);

  const binanceBalance: BalanceBreakdown = {
    total: binanceFree.plus(binanceLocked),
    available: binanceFree,
    exchange: Exchange.Binance,
  };

  const gateUstWallet = gateWallets.find((wallet) => wallet.currency === 'USDT');
  const gateAvailable = gateUstWallet?.available || 0;
  const gateLocked = gateUstWallet?.locked || 0;

  const gateBalance: BalanceBreakdown = {
    total: BigNumber(gateAvailable).plus(gateLocked),
    available: BigNumber(gateAvailable),
    exchange: Exchange.Gate,
  };

  const okxUstWallet = okxWallets.find((wallet) => wallet.ccy === 'USDT');
  const okxAvailable = okxUstWallet?.availBal || 0;
  const okxLocked = okxUstWallet?.frozenBal || 0;

  const okxBalance: BalanceBreakdown = {
    total: BigNumber(okxAvailable).plus(okxLocked),
    available: BigNumber(okxAvailable),
    exchange: Exchange.OKX,
  };

  const breakdown = _compact([bfxBalance, binanceBalance, gateBalance, okxBalance]);

  return {
    total: breakdown.reduce((sum, exchange) => exchange.total.plus(sum), BigNumber(0)),
    available: breakdown.reduce((sum, exchange) => exchange.available.plus(sum), BigNumber(0)),
    breakdown,
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
 * @param marketCoins
 * @param binanceWallets
 * @param bitfinexWallets
 * @param gateWallets
 * @param okxWallets
 */
export function composeAssetsInfo(
  marketCoins: CoinInMarket[],
  binanceWallets: BinanceWallet[],
  bitfinexWallets: BfxWallet[],
  gateWallets: GateWallet[],
  okxWallets: OkxWallet[],
): MyexAsset[] {
  const bitfinexWalletsWithAmount = bitfinexWallets.filter(
    (wallet) => wallet.currency !== 'UST' && wallet.balance > 0,
  );
  const synedBitfinexWallets = syncBitfinexCurrencies(bitfinexWalletsWithAmount, marketCoins);

  const binanceWalletsWithAmount = binanceWallets.filter(
    (wallet) => wallet.asset !== 'USDT' && Number(wallet.free) + Number(wallet.locked) > 0,
  );

  const gateWalletsWithAmount = gateWallets.filter(
    (wallet) => wallet.currency !== 'USDT' && Number(wallet.available) + Number(wallet.locked) > 0,
  );

  const okxWalletsWithAmount = okxWallets.filter(
    (wallet) => wallet.ccy !== 'USDT' && Number(wallet.availBal) + Number(wallet.frozenBal) > 0,
  );

  const currencies = _uniq([
    ..._map(synedBitfinexWallets, 'currency'),
    ..._map(binanceWalletsWithAmount, 'asset'),
    ..._map(gateWalletsWithAmount, 'currency'),
    ..._map(okxWalletsWithAmount, 'ccy'),
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
      const gateAsset = gateWalletsWithAmount.find((wallet) => wallet.currency === currency);
      const okxAsset = okxWalletsWithAmount.find((wallet) => wallet.ccy === currency);

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
        gateAsset &&
        BigNumber(gateAsset.available)
          .plus(BigNumber(gateAsset.locked))
          .multipliedBy(marketCoin.price)
          .gt(IGNORED_USD_THRESHOLD)
          ? {
              totalAmount: BigNumber(gateAsset.available).plus(BigNumber(gateAsset.locked)),
              availableAmount: BigNumber(gateAsset.available),
              exchange: Exchange.Gate,
            }
          : null,
        okxAsset &&
        BigNumber(okxAsset.availBal)
          .plus(BigNumber(okxAsset.frozenBal))
          .multipliedBy(marketCoin.price)
          .gt(IGNORED_USD_THRESHOLD)
          ? {
              totalAmount: BigNumber(okxAsset.availBal).plus(BigNumber(okxAsset.frozenBal)),
              availableAmount: BigNumber(okxAsset.availBal),
              exchange: Exchange.OKX,
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
        _balanceUst: walletTotalAmount.multipliedBy(BigNumber(marketCoin.price)).toNumber(), // @composed balance in USDt
        wallets: walletsOfCurrency,
        myexCoin: marketCoin.myexCoin,
      } as MyexAsset;
    }),
  );
}
