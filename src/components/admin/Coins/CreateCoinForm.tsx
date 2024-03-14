'use client';

import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import TextField from '@myex/components/MyexForm/TextField';
import { IFormNewCoin } from '@myex/types/coin';

interface Props {
  control: Control<IFormNewCoin>;
  errors: FieldErrors<IFormNewCoin>;
  update?: boolean;
}

export default function CreateCoinForm({ control, errors, update }: Props) {
  return (
    <div className='w-full'>
      <div className='my-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.name}
              helperText={errors.name?.message}
              label='Coin Name'
              placeholder='Coin name like Bitcoin'
              {...field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide a coin name.',
          }}
          name='name'
          disabled={update}
          control={control}
        />
      </div>

      <div className='mb-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.currency}
              helperText={errors.currency?.message}
              label='Currency'
              placeholder='Currency symbol like BTC'
              {...field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide a coin currency.',
          }}
          disabled={update}
          name='currency'
          control={control}
        />
      </div>

      <div className='mb-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.projectUrl}
              helperText={errors.projectUrl?.message}
              label='Project URL'
              placeholder='Homepage of the coin project'
              {...field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide a project URL.',
          }}
          name='projectUrl'
          control={control}
        />
      </div>

      <div className='mb-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.cmcUrl}
              helperText={errors.cmcUrl?.message}
              label='CoinMarketCap URL'
              placeholder='Coin details page on CoinMarketCap'
              {...field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide a CoinMarketCap URL.',
          }}
          name='cmcUrl'
          control={control}
        />
      </div>

      <div className='mb-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.rating}
              helperText={errors.rating?.message}
              label='Coin Rating (from CMC or CoinCheckup)'
              placeholder='Rating 1 to 5'
              type='number'
              {...field}
              ref={null}
            />
          )}
          name='rating'
          control={control}
        />
      </div>

      <div className='mb-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.icon}
              helperText={errors.icon?.message}
              label='Icon image URL'
              placeholder='Coin icon from Bitfinex etc'
              {...field}
              ref={null}
            />
          )}
          name='icon'
          control={control}
        />
      </div>

      <div className='mb-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.exchangeSymbols}
              helperText={errors.exchangeSymbols?.message}
              label='Exchange Symbols'
              placeholder='Symbol variants at different exchanges: binance:ATOM;bitfinex:ATO'
              {...field}
              ref={null}
            />
          )}
          name='exchangeSymbols'
          control={control}
        />
      </div>
    </div>
  );
}
