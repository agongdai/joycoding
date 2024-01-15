import React from 'react';

import { PropsWithChildren } from '@myex/types/common';

export function MyexStyledPageHeader({ children }: PropsWithChildren) {
  return <h1 className='mb-6 md:mb-4 md:mx-4'>{children}</h1>;
}
