import binanceWs from './binance.mjs';
import bitfinexWs from './bitfinex.mjs';

// binanceWs.connect();
// binanceWs.subscribeTicketsPrice(['BTC', 'ETH']);
bitfinexWs.connect();
bitfinexWs.subscribeTicketsPrice(['BTC', 'ETH']);
