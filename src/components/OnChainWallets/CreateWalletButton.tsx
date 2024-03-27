'use client';

import React from 'react';

import Button from '@mui/material/Button';
import { useMyexDispatch } from '@myex/store';
import { toggleUpsertWalletModal } from '@myex/store/flags/actions';

export default function CreateWalletButton() {
  const dispatch = useMyexDispatch();
  const onCreate = () => dispatch(toggleUpsertWalletModal());

  return (
    <Button variant='contained' color='primary' onClick={onCreate}>
      Add New Wallet
    </Button>
  );
}
