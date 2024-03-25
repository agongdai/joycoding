import React from 'react';

import MyexFormatter from '@myex/components/MyexFormatter';
import Coin from '@myex/components/MyexFormatter/Coin';
import CoinIcon from '@myex/components/MyexFormatter/CoinIcon';
import { ColumnData } from '@myex/components/MyexTable/types';
import { CoinInMarket } from '@myex/types/coin';
import { Value, ValueFormat } from '@myex/types/common';
import { Coin as DbCoin } from '@prisma/client';

export default function CellRenderer<T>({ column, item }: { column: ColumnData<T>; item: T }) {
  if (column.renderComponent) {
    return column.renderComponent(item[column.dataKey], item);
  }

  if (column.format === ValueFormat.CoinIcon) {
    return <CoinIcon coin={item as DbCoin} />;
  }

  if (column.format === ValueFormat.Coin) {
    return <Coin coin={(item as CoinInMarket).myexCoin} />;
  }

  return (
    <MyexFormatter
      value={item[column.dataKey] as Value}
      format={column.format || ValueFormat.String}
    />
  );
}
