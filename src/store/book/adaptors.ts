import _isArray from 'lodash/isArray';
import _map from 'lodash/map';
import _omit from 'lodash/omit';
import _orderBy from 'lodash/orderBy';

import { BookState } from '@myex/store/book/slice';
import { BookMessageRaw, BookRowParsed, BookRowRaw, BookSide } from '@myex/types/book';

function getRawData(payload: BookMessageRaw) {
  if (_isArray(payload[1])) {
    return payload[1];
  }
  throw new Error('Invalid book message');
}

function getId(row: BookRowParsed) {
  return Number(row.price);
}

function adapter(data: BookRowRaw) {
  return {
    price: data[0],
    count: data[1],
    amount: data[2],
  } as BookRowParsed;
}

function isBid(row: BookRowParsed) {
  return row.amount > 0;
}

function getSides(row: BookRowParsed) {
  return isBid(row)
    ? { side: BookSide.Bids, other: BookSide.Asks }
    : { side: BookSide.Asks, other: BookSide.Bids };
}

function getPsnap(data: Record<number, BookRowParsed>, side: BookSide) {
  const psnap = _map(data, getId);

  return _orderBy(psnap, undefined, side === BookSide.Bids ? 'desc' : 'asc');
}

function getTsnap(data: Record<number, BookRowParsed>, psnap: number[]) {
  const totals = psnap.map((p) => Math.abs(data[p].amount));
  for (let i = 1; i < totals.length; i++) {
    totals[i] += totals[i - 1];
  }
  return totals;
}

function update(payload: BookMessageRaw, state: BookState) {
  const rawData = getRawData(payload);
  const row = adapter(rawData);
  const id = getId(row);
  const { side, other } = getSides(row);

  // delete the price level
  if (row.count <= 0) {
    const data = _omit(state[side], id);
    const pSnap = getPsnap(data, side);

    return {
      ...state,
      [side]: data,
      [`p${side}`]: pSnap,
      [`t${side}`]: getTsnap(data, pSnap),
    };
  }

  // add/update the price level
  const sideData = {
    ...state[side],
    [id]: row,
  };
  const otherData = _omit(state[other], id);
  const pSideSnap = getPsnap(sideData, side);
  const pOtherSnap = getPsnap(otherData, other);

  return {
    [side]: sideData,
    [other]: otherData,
    [`p${side}`]: pSideSnap,
    [`p${other}`]: pOtherSnap,
    [`t${side}`]: getTsnap(sideData, pSideSnap),
    [`t${other}`]: getTsnap(otherData, pOtherSnap),
  };
}

export default {
  update,
};
