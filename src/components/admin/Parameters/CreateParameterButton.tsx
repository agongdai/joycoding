'use client';

import React from 'react';

import Button from '@mui/material/Button';
import { useMyexDispatch } from '@myex/store';
import { toggleCreateParameterModalOpen } from '@myex/store/flags/actions';

export default function CreateParameterButton() {
  const dispatch = useMyexDispatch();
  const onCreate = () => dispatch(toggleCreateParameterModalOpen());

  return (
    <Button variant='contained' color='primary' onClick={onCreate}>
      Add New Parameter
    </Button>
  );
}
