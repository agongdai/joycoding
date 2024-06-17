/**
 * Bitfinex symbol to currency: 'tBTCUSD' => 'BTC'
 * @param symbol
 * @returns {*}
 */
export const bitfinexSymbolToCurrency = (symbol) => {
  return symbol.slice(1, -3).replace(':', '');
};

/**
 * Bitfinex symbol to pair: 'tBTCUSD' => 'BTCUSD'
 * @param symbol
 * @returns {*}
 */
export const bitfinexSymbolToPair = (symbol) => {
  return symbol.slice(1);
};

/**
 * Currency to Bitfinex symbol: 'BTC' => 'tBTCUSD'
 * @param currency
 * @returns {`t${string}${string}UST`}
 */
export const bitfinexCurrencyToSymbol = (currency) => {
  return `t${currency.toUpperCase()}${currency.length === 3 ? '' : ':'}UST`;
};
