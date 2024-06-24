import Exchange from './exchange.mjs';
import { bitfinexCurrencyToSymbol } from './utils.mjs';
import WebSocketConnector from './WebSocketConnector.mjs';

const bitfinexWs = (function() {
  const ws = new WebSocketConnector('wss://api-pub.bitfinex.com/ws/2');

  /**
   * Send data to the Bitfinex WebSocket server
   * @param data
   */
  const send = (data) => {
    ws.send(data);
  };

  /**
   * Connect to the Bitfinex WebSocket server
   * @param myexWs
   */
  const connect = (myexWs) => {
    ws.connect((data) => {
      console.log('Got message from Bitfinex WebSocket', data);
      const isTicker = Array.isArray(data) && Array.isArray(data[1]) && data[1].length === 10;

      // Send data to the MyEx WebSocket
      myexWs && myexWs.send(JSON.stringify({
        e: Exchange.Bitfinex.myexId,    // exchange
        p: isTicker ? [                // payload
          data[0],                     // channelId
          [
            data[1][5],                // priceChangePercentage24h
            data[1][6],                // price
          ]] : data,
      }));
    });
  };

  /**
   * Subscribe to the ticket price of currencies against USDT
   * @param currencies
   */
  const subscribeTicketsPrice = (currencies) => {
    currencies.forEach(currency => {
      send({
        event: 'subscribe',
        channel: 'ticker',
        symbol: bitfinexCurrencyToSymbol(currency),
      });
    });
  };

  return {
    send,
    connect,
    subscribeTicketsPrice,
  };
})();

export default bitfinexWs;
