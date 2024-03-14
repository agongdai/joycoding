'use client';

import React from 'react';

import Button from '@mui/material/Button';
import { useMyexDispatch } from '@myex/store';
import { toggleCreateCoinModal } from '@myex/store/flags/actions';

export default function CreateCoinButton() {
  const dispatch = useMyexDispatch();
  const onCreate = () => dispatch(toggleCreateCoinModal());

  return (
    <Button variant='contained' color='primary' onClick={onCreate}>
      Add New Coin
    </Button>
  );
}
