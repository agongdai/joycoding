import React from 'react';
import _range from 'lodash/range';

import Skeleton from '@mui/material/Skeleton';

export default function MyexSkeleton() {
  return (
    <div>
      {_range(12).map((v) => (
        <div key={v} className='grid gap-4 grid-cols-9 my-4'>
          <Skeleton variant='rectangular' width='100%' height={50} className='col-span-3' />
          <Skeleton variant='rectangular' width='100%' height={50} />
          <Skeleton variant='rectangular' width='100%' height={50} />
          <Skeleton variant='rectangular' width='100%' height={50} />
          <Skeleton variant='rectangular' width='100%' height={50} />
          <Skeleton variant='rectangular' width='100%' height={50} className='col-span-2' />
        </div>
      ))}
    </div>
  );
}
