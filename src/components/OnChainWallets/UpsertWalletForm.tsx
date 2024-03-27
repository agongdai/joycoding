'use client';

import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import FieldCoinSelect from '@myex/components/MyexForm/FieldCoinSelect';
import FieldWalletProvider from '@myex/components/MyexForm/FieldWalletProvider';
import TextField from '@myex/components/MyexForm/TextField';
import { IFormOnChainWallet } from '@myex/types/wallet';

interface Props {
  control: Control<IFormOnChainWallet>;
  errors: FieldErrors<IFormOnChainWallet>;
  update?: boolean;
}

export default function UpsertWalletForm({ control, errors, update }: Props) {
  return (
    <div className='w-full'>
      <div className='my-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.name}
              helperText={errors.name?.message}
              label='Wallet Name'
              placeholder='Wallet name like Ledger Nano S'
              {...field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide a wallet name.',
          }}
          name='name'
          control={control}
        />
      </div>

      <div className='mb-6'>
        <FieldCoinSelect control={control} error={errors?.coinMyexId?.message} />
      </div>

      <div className='mb-6'>
        <FieldWalletProvider control={control} error={errors?.provider?.message} />
      </div>

      <div className='mb-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.address}
              helperText={errors.address?.message}
              label='Address'
              placeholder='Wallet address like 0x1234567890abcdef'
              {...field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide an address.',
          }}
          disabled={update}
          name='address'
          control={control}
        />
      </div>

      <div className='mb-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.protocol}
              helperText={errors.protocol?.message}
              label='Protocol'
              placeholder='Protocol like Ethereum, Binance Smart Chain'
              {...field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide a protocol.',
          }}
          name='protocol'
          control={control}
        />
      </div>

      <div className='mb-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.network}
              helperText={errors.network?.message}
              label='Network'
              placeholder='Network like Mainnet, Testnet'
              {...field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide a network.',
          }}
          name='network'
          control={control}
        />
      </div>

      {update && (
        <div className='mb-6'>
          <Controller
            render={({ field }) => (
              <TextField
                error={!!errors.addedTimestamp}
                helperText={errors.addedTimestamp?.message}
                label='Added Timestamp'
                disabled
                {...field}
                ref={null}
              />
            )}
            name='addedTimestamp'
            control={control}
          />
        </div>
      )}
    </div>
  );
}
