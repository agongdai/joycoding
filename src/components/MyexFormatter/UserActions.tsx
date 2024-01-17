import React from 'react';

import MyexFavorite from '@myex/components/MyexFavorite';

export default function UserActions({ symbol }: { symbol: string }) {
  return (
    <div className='inline-flex'>
      <MyexFavorite symbol={symbol} />
    </div>
  );
}
