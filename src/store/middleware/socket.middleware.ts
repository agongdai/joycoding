import _isArray from 'lodash/isArray';

import {
  chanSubscribed,
  chanUnsubscribed,
  setLoading,
  updateBulkyMessages,
  updateMessage,
} from '@myex/store/book/actions';
import { setLive } from '@myex/store/wss/actions';
import { BookBulkyMessagesRaw, BookMessageRaw, ChanMeta } from '@myex/types/book';

import { Socket } from '../Socket';

function isHb(payload = []) {
  const [, secondPart, thirdPart] = payload;
  return secondPart === 'hb' || thirdPart === 'hb';
}

function isBulkyMessage(message: any) {
  return _isArray(message) && _isArray(message[1]) && _isArray(message[1][0]);
}

export const socketMiddleware = (socket: Socket) => (params) => (next) => (action) => {
  const { dispatch, getState } = params;
  const { type, payload } = action;
  const { channel, symbol, freq, chanId, prec } = payload || {};

  switch (type) {
    case 'socket/connect':
      console.log('connecting to socket');
      socket.connect(process.env.NEXT_PUBLIC_BITFINEX_WSS || '');

      socket.on('open', () => {
        console.log('socket opened');
        dispatch(setLive(true));
      });

      socket.on('message', (message) => {
        const data = JSON.parse(message?.data || '{}');

        if (data?.event === 'subscribed') {
          dispatch(chanSubscribed(data as ChanMeta));
        }

        if (data?.event === 'unsubscribed') {
          dispatch(chanUnsubscribed());
        }

        if (_isArray(data) && _isArray(data[1])) {
          if (isBulkyMessage(data)) {
            dispatch(updateBulkyMessages(data as BookBulkyMessagesRaw));
          } else {
            dispatch(updateMessage(data as BookMessageRaw));
          }
        }
      });

      socket.on('close', () => {
        console.log('socket closed');
        dispatch(setLive(false));
      });
      break;

    case 'socket/disconnect':
      if (socket.disconnect()) {
        dispatch(setLive(false));
      }
      break;

    case 'socket/subscribe':
      socket.send({ event: 'subscribe', channel, symbol, freq, prec, len: '25' });
      dispatch(setLoading(true));
      break;

    case 'socket/unsubscribe':
      socket.send({ event: 'unsubscribe', chanId });
      break;

    default:
      break;
  }

  return next(action);
};
