import React, { memo } from 'react';

import MyexFormatter from '@myex/components/ui/MyexFormatter';
import Coin from '@myex/components/ui/MyexFormatter/Coin';
import CoinIcon from '@myex/components/ui/MyexFormatter/CoinIcon';
import Exchange from '@myex/components/ui/MyexFormatter/Exchange';
import { ColumnData } from '@myex/components/ui/MyexTable/types';
import { MarketCoin } from '@myex/types/coin';
import { Value, ValueFormat } from '@myex/types/common';
import { Coin as DbCoin } from '@prisma/client';

export default memo(function CellRenderer<T>({ column, item }: { column: ColumnData<T>; item: T }) {
  if (column.renderComponent) {
    return column.renderComponent(item[column.dataKey], item);
  }

  if (column.format === ValueFormat.CoinIcon) {
    return <CoinIcon coin={item as DbCoin} />;
  }

  if (column.format === ValueFormat.Coin) {
    return <Coin coin={(item as MarketCoin)?.myexCoin} />;
  }

  if (column.format === ValueFormat.Exchange) {
    return (
      <Exchange value={(item as MarketCoin)?.exchanges} currency={(item as MarketCoin)?.currency} />
    );
  }

  return (
    <MyexFormatter
      value={item[column.dataKey] as Value}
      format={column.format || ValueFormat.String}
    />
  );
});
