import React from 'react';

import MyexLink from '@myex/components/MyexLink';

export default function UnderConstructionPage() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <h1 className='text-4xl max-w-[70rem] text-center'>
        We are still working hard on MyEx.AI. Please{' '}
        <MyexLink href='mailto:caishaojiang@gmail.com'>email us</MyexLink> in case you would like to
        know more.
      </h1>
    </div>
  );
}
