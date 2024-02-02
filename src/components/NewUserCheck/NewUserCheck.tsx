'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import useLocale from '@myex/hooks/useLocale';

const registerUserPath = '/users/register';

export default function NewUserCheck() {
  const { data: session } = useSession();
  const { locale, pathName } = useLocale();
  const user = session?.user;
  const router = useRouter();

  useEffect(() => {
    if (user && !!user?.username && pathName === registerUserPath) {
      router.push(`${window.location.origin}/`);
    }
  }, [pathName, router, user]);

  useEffect(() => {
    if (user && !user?.username && pathName !== registerUserPath) {
      router.push(`${window.location.origin}/${locale}${registerUserPath}`);
    }
  }, [locale, pathName, router, user]);

  return <></>;
}
