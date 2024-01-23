import React from 'react';

import { Value, ValueFormat } from '@myex/types/common';

import Coin from './Coin';
import Money from './Money';
import Number from './Number';
import Percentage from './Percentage';
import UserActions from './UserActions';
import Volume from './Volume';

export default function MyexFormatter({
  value,
  format = ValueFormat.String,
}: {
  value: Value;
  format: ValueFormat;
}) {
  if (ValueFormat.Money === format) {
    return <Money value={value} flash />;
  }

  if (ValueFormat.Number === format) {
    return <Number value={value} />;
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

  if (ValueFormat.UserActions === format) {
    return <UserActions symbol={String(value)} />;
  }

  return <div>{String(value)}</div>;
}
