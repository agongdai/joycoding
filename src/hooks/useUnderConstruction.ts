'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function useUnderConstruction() {
  const [underConstruction, setUnderConstruction] = useState(true);
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  useEffect(() => {
    // @todo only allow developer to access the app right now. Move the flag to db later.
    if (user?.email === 'caishaojiang@gmail.com') {
      setUnderConstruction(false);
    }
  }, [router, user]);

  return { underConstruction };
}
