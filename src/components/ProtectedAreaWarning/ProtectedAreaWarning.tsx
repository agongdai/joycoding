import React from 'react';

import { Alert } from '@mui/material';
import SignIn from '@myex/components/SignIn';

export default function ProtectedAreaWarning({ adminOnly = false }: { adminOnly?: boolean }) {
  return (
    <Alert severity='error' classes={{ root: 'py-4 my-20 max-w-[48rem] mx-auto' }}>
      <h5 className='mb-4'>
        {adminOnly
          ? 'You need to sign in as an admin to visit this page'
          : 'Yor are visiting protected content. Please sign in first.'}
      </h5>
      <SignIn size='medium' />
    </Alert>
  );
}
