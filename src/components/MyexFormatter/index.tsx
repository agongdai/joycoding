import React from 'react';

import MyexImage from '@myex/components/MyexImage';
import { Value, ValueFormat } from '@myex/types/common';

import Exchange from './Exchange';
import Link from './Link';
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

  if (ValueFormat.Link === format) {
    return <Link href={String(value)} />;
  }

  if (ValueFormat.Volume === format) {
    return <Volume value={value} />;
  }

  if (ValueFormat.UserActions === format) {
    return <UserActions currency={String(value)} />;
  }

  if (ValueFormat.Image === format) {
    return <MyexImage src={String(value)} alt='' width={32} height={32} className='rounded-full' />;
  }

  if (ValueFormat.Exchange === format) {
    return <Exchange value={value} />;
  }

  return <div>{String(value)}</div>;
}
