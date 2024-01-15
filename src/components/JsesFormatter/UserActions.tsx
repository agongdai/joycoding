'use client';
import React from 'react';

import JsesFavorite from '@jses/components/JsesFavorite';

export default function UserActions({ symbol }: { symbol: string }) {
  return (
    <div className='inline-flex'>
      <JsesFavorite symbol={symbol} />
    </div>
  );
}
