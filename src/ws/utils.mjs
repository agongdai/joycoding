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
