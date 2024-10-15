import { PrismaClient } from '@prisma/client';
import http from 'http';
import websocket from 'websocket';

import binanceWs from './binance.mjs';
import bitfinexWs from './bitfinex.mjs';
import Exchange from './exchange.mjs';
import { bitfinexSymbolToPair } from './utils.mjs';

const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

const WebSocketServer = websocket.server;

let myexWs = null;
let mapSymbolToChannelId = {};

const EXCHANGE_ID_BITFINEX = 1;

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


  connection.on('message', async function(message) {
    if (message.type !== 'utf8') {
      return;
    }

    const data = JSON.parse(message.utf8Data);

    if (data.exchange === 6) {
      console.log('data', data);
      const existingGame = await prisma.tugOfWar.findUnique({
        where: {
          myexId: data.gameId,
        },
      });
      if (existingGame) {
        if (data.action === 'pull') {
          const updatedGame = await prisma.tugOfWar.update({
            where: { myexId: data.gameId },
            data: {
              ...existingGame,
              punches: `${existingGame.punches ? existingGame.punches + ',' : ''}${data.playerId}-${new Date().getTime()}`,
            },
          });
          connection.send(JSON.stringify({
            success: true,
            punches: updatedGame.punches,
          }));
        }
      }
    }

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
              note: 'MyEx.AI will still send the data as the underlying channel is shared among all users. Discard it if you don\'t need it.',
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

