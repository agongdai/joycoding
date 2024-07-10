import React from 'react';

import Skeleton from '@mui/material/Skeleton';

export default function MyexSkeleton() {
  return (
    <div>
      {new Array(10).fill(1).map((v) => (
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
