import React from 'react';

import { auth } from '@myex/auth';
import { MyexStyledPageWrapper } from '@myex/components/MyexStyled';
import ProtectedAreaWarning from '@myex/components/ProtectedAreaWarning';
import { ParamsWithChildren } from '@myex/types/i18n';

export default async function ProtectedLayout({ children }: ParamsWithChildren) {
  const session = await auth();
  return (
    <MyexStyledPageWrapper>
      {session?.user ? children : <ProtectedAreaWarning />}
    </MyexStyledPageWrapper>
  );
}
