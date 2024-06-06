import http from 'http';
import websocket from 'websocket';

import { bitfinexSymbolToPair } from './utils.mjs';

const WebSocketClient = websocket.client;
const WebSocketServer = websocket.server;

const EXCHANGE_ID_BITFINEX = 1;

const client = new WebSocketClient();
let bitfinexWs = null;
let myexWs = null;

const bitfinexQueue = [];
let mapSymbolToChannelId = {};
client.on('connectFailed', function(error) {
  console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(ws) {
  console.log('Bitfinex WebSocket client connected');

  while (bitfinexQueue.length > 0) {
    ws.send(bitfinexQueue.pop());
  }

  ws.on('error', function(error) {
    console.log('Bitfinex connection error: ' + error.toString());
  });

  ws.on('close', function() {
    console.log('Bitfinex connection closed');
    mapSymbolToChannelId = {};
  });

  ws.on('message', function(message) {
    console.log('Got message from Bitfinex Ws', message.utf8Data);
    const data = JSON.parse(message.utf8Data);

    if (data.event === 'subscribed') {
      mapSymbolToChannelId[data.symbol] = `${EXCHANGE_ID_BITFINEX}-${data.chanId}`;
    }

    if (data.event === 'unsubscribed') {
      delete mapSymbolToChannelId[data.symbol];
    }

    if (myexWs && myexWs.connected) {
      const isTicker = Array.isArray(data) && Array.isArray(data[1]) && data[1].length === 10;
      myexWs.send(JSON.stringify({
        exchange: EXCHANGE_ID_BITFINEX,
        payload: isTicker ? [
          data[0], // channelId
          [
            data[1][5], // priceChangePercentage24h
            data[1][6], // price
          ]] : data,
      }));
    }
  });

  bitfinexWs = ws;
});

const server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});

server.listen(8080, function() {
  console.log((new Date()) + ' Server is listening on port 8080');
});

const wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false,
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  console.log('origin', origin);
  return true;
}

wsServer.on('request', function(request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }

  const connection = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection accepted.');

  connection.on('message', function(message) {
    if (message.type !== 'utf8') {
      return;
    }

    const data = JSON.parse(message.utf8Data);

    // forward request to bitfinex ws if it's connected, otherwise connect to bitfinex ws
    if (data.exchange === EXCHANGE_ID_BITFINEX) {
      if (bitfinexWs && bitfinexWs.connected) {
        // If the request is a subscribe event and the symbol is already subscribed, send the subscribed event back
        if (data.payload?.event === 'subscribe' && mapSymbolToChannelId[data.payload?.symbol]) {
          console.log('already subscribed', data.payload.symbol, 'from Bitfinex', mapSymbolToChannelId[data.payload.symbol]);
          const channelId = mapSymbolToChannelId[data.payload.symbol];
          connection.send(JSON.stringify({
            exchange: EXCHANGE_ID_BITFINEX,
            payload: {
              chanId: Number(channelId.split('-')[1]),
              channel: 'ticker',
              event: 'subscribed',
              symbol: data.payload.symbol,
              pair: bitfinexSymbolToPair(data.payload.symbol),
            },
          }));
        } else if (data.payload?.event === 'unsubscribe') {
          // unsubscribe, but still send the data because the underlying Bitfinex websocket is shared.
          connection.send(JSON.stringify({
            exchange: EXCHANGE_ID_BITFINEX,
            payload: {
              event: 'unsubscribed',
              chanId: Number(data.payload.chanId),
              status: 'OK',
              note: 'MyEx.AI will still send the data, discard it if you don\'t need it.',
            },
          }));
        } else {
          console.log('send to bitfinex', data.payload);
          bitfinexWs.send(JSON.stringify(data.payload));
        }
      } else {
        // queue the request, connect to bitfinex ws, then send the queued requests
        bitfinexQueue.unshift(JSON.stringify(data.payload));
        client.connect('wss://api-pub.bitfinex.com/ws/2');
      }
    }
  });

  connection.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });

  myexWs = connection;
});

