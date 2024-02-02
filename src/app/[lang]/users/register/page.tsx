import React from 'react';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@myex/auth';
import { MyexPaper, MyexStyledPageWrapper } from '@myex/components/MyexStyled';
import ProtectedAreaWarning from '@myex/components/ProtectedAreaWarning';

import RegisterUserForm from './form';

export default async function RegisterUser() {
  const session = await auth();
  return (
    <MyexStyledPageWrapper>
      <h1>Register User</h1>
      <MyexPaper className='max-w-[80rem] my-6'>
        <SessionProvider session={session}>
          {session?.user ? <RegisterUserForm /> : <ProtectedAreaWarning />}
        </SessionProvider>
      </MyexPaper>
    </MyexStyledPageWrapper>
  );
}
