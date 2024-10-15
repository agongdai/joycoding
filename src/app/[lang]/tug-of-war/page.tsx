import React from 'react';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@myex/auth';
import ProtectedAreaWarning from '@myex/components/ProtectedAreaWarning';
import Game from '@myex/components/tug/Game';
import { MyexPaper, MyexStyledPageWrapper } from '@myex/components/ui/MyexStyled';

export default async function TugOfWar() {
  const session = await auth();
  return (
    <MyexStyledPageWrapper>
      <h1>Tug of War</h1>
      <MyexPaper className='max-w-[80rem] my-6'>
        <SessionProvider session={session}>
          {session?.user ? <Game playerId={session?.user?.myexId} /> : <ProtectedAreaWarning />}
        </SessionProvider>
      </MyexPaper>
    </MyexStyledPageWrapper>
  );
}
