import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div className='flex h-full justify-center items-center min-h-screen	relative bottom-24'>
      <CircularProgress />
    </div>
  );
}
