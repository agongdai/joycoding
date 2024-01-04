import React from 'react';

import { Value, ValueFormat } from '@jses/types/common';

import Coin from './Coin';
import Percentage from './Percentage';
import Price from './Price';
import Volume from './Volume';

export default function JsesFormatter({
  value,
  format = ValueFormat.String,
}: {
  value: Value;
  format: ValueFormat;
}) {
  if (ValueFormat.Price === format) {
    return <Price value={value} />;
  }

  if (ValueFormat.Percentage === format) {
    return <Percentage value={value} />;
  }

  if (ValueFormat.Volume === format) {
    return <Volume value={value} />;
  }

  if (ValueFormat.Coin === format) {
    return <Coin value={value} />;
  }

  return <div>{String(value)}</div>;
}
