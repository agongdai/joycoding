import _difference from 'lodash/difference.js';
import _uniq from 'lodash/uniq.js';

import WebSocketConnector from './WebSocketConnector.mjs';

const binanceWs = (function() {
  const ws = new WebSocketConnector('wss://stream.binance.com:9443/ws');
  let subscribedPairs = [];

  /**
   * Send data to the Binance WebSocket server
   * @param data
   */
  const send = (data) => {
    ws.send(data);
  };

  const connect = (myexWs) => {
    ws.connect(
      (data) => {
        console.log('Got message from Binance WebSocket', data);
        const isTicker = data.e === '24hrMiniTicker';
        // send({
        //   event: 'subscribe',
        //   channel: 'ticker',
        //   symbol: bitfinexCurrencyToSymbol(currency),
        // });
      }, (connection) => {
      });
  };

  /**
   * Subscribe to the ticket price of a pair
   * @param pairs
   */
  const subscribeTicketsPrice = (pairs) => {
    if (_difference(pairs, subscribedPairs).length === 0) {
      return;
    }

    subscribedPairs = _uniq([
      ...subscribedPairs,
      ...pairs,
    ]);
    console.log('subscribedPairs', subscribedPairs);
    send({
      'method': 'SUBSCRIBE',
      'params': subscribedPairs.map(pair => `${pair.toLowerCase()}usdt@miniTicker`),
      'id': subscribedPairs.join('-'),
    });
  };

  return {
    connect,
    send,
    subscribeTicketsPrice,
  };
})();

export default binanceWs;
