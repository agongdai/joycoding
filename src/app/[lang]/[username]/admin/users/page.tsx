import React from 'react';

import { myexFetchUsers } from '@myex/app/serverActions/myexUser';
import UsersList from '@myex/components/admin/UsersList';

export const revalidate = 10;

export default async function Users() {
  const users = await myexFetchUsers();
  return (
    <div>
      <UsersList users={users} />
    </div>
  );
}
