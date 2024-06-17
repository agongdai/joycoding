import Exchange from './exchange.mjs';
import shared from './shared.mjs';
import { bitfinexCurrencyToSymbol } from './utils.mjs';
import ws from './ws.mjs';

const bitfinexWs = (function() {
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
    ws.connect('wss://api-pub.bitfinex.com/ws/2',
      function(data) {
        console.log('Got message from Bitfinex WebSocket', data);
        console.log('Bitfinex shared', shared.setWsBaseUrl(String(Math.random())));
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
