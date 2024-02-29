'use client';

import React from 'react';

import MyexTable from '@myex/components/MyexTable';
import { ColumnData } from '@myex/components/MyexTable/types';
import { ValueFormat } from '@myex/types/common';
import { User } from '@prisma/client';

interface Props {
  users: User[];
}

const columns: ColumnData<User>[] = [
  {
    label: 'ID',
    dataKey: 'myexId',
    sortable: true,
    widthRem: 7,
  },
  {
    label: 'Image',
    dataKey: 'image',
    format: ValueFormat.Image,
    widthRem: 10,
  },
  {
    label: 'Username',
    dataKey: 'username',
    sortable: true,
  },
  {
    label: 'Name',
    dataKey: 'name',
    sortable: true,
  },
  {
    label: 'Email',
    dataKey: 'email',
  },
  {
    label: 'Provider',
    dataKey: 'provider',
  },
  {
    label: 'Admin?',
    dataKey: 'isAdmin',
  },
];

export default function UsersList({ users = [] }: Props) {
  return (
    <>
      <h1>Users</h1>
      <MyexTable<User>
        data={users}
        columns={columns}
        defaultSortingField='myexId'
        defaultSortingDirection='-'
      />
    </>
  );
}
