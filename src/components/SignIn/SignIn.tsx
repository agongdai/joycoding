import React from 'react';

import { Button } from '@mui/material';
import { authSignIn } from '@myex/app/serverActions/auth';

type Props = { provider?: string } & React.ComponentPropsWithRef<typeof Button>;

export default function SignIn({ provider, ...props }: Props) {
  return (
    <form action={authSignIn}>
      <Button {...props} variant='contained' type='submit' size='small'>
        Sign In
      </Button>
    </form>
  );
}
