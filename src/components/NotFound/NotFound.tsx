import React from 'react';
import Image from 'next/image';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MyexLink from '@myex/components/MyexLink';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center p-6'>
      <Image src='/images/404.svg' width={800} height={591} alt='not found' />
      <Typography color='secondary' classes={{ root: 'my-10 text-center' }}>
        The page you are looking for has been removed or you have a wrong link.
      </Typography>
      <MyexLink href='/'>
        <Button variant='contained' color='primary' size='large'>
          Go Home
        </Button>
      </MyexLink>
    </div>
  );
}
