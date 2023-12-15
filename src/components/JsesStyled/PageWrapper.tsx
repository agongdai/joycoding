import React from 'react';

import { PropsWithChildren } from '@jses/types/common';

export function JsesStyledPageWrapper({ children, className = '' }: PropsWithChildren) {
  return (
    <div className={`pt-4 px-4 mx-[auto] max-w-[120rem] min-h-screen md:p-0 ${className}`}>
      {children}
    </div>
  );
}
