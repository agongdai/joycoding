import React from 'react';

import { fetchUsers } from '@myex/app/serverActions/local';
import UsersList from '@myex/components/admin/UsersList';

export const revalidate = 10;

export default async function Users() {
  const users = await fetchUsers();
  return (
    <div>
      <UsersList users={users} />
    </div>
  );
}
