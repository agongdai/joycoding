import binanceWs from './binance.mjs';
import bitfinexWs from './bitfinex.mjs';
import WebSocketConnector from './WebSocketConnector.mjs';

binanceWs.connect();
binanceWs.subscribeTicketsPrice(['BTC', 'ETH']);
bitfinexWs.connect();
bitfinexWs.subscribeTicketsPrice(['BTC', 'ETH']);

// const wsConnector = new WebSocketConnector('wss://stream.binance.com:9443/ws');
// wsConnector.connect();
// wsConnector.send({
//   'method': 'SUBSCRIBE',
//   'params': ['btcusdt@miniTicker'],
//   'id': 'btcusdt',
// });
// const wsConnector2 = new WebSocketConnector('wss://api-pub.bitfinex.com/ws/2');
// wsConnector2.connect();
// wsConnector2.send({
//   event: 'subscribe',
//   channel: 'ticker',
//   symbol: 'tETHUSD',
// });
