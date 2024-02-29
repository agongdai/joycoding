'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';

import { myexCreateExchange } from '@myex/app/serverActions';
import TextField from '@myex/components/MyexForm/TextField';
import MyexLoadingButton from '@myex/components/ui/MyexLoadingButton';
import { IFormNewExchange } from '@myex/types/exchange';

export default function AccountsForm({ exchangeName }: { exchangeName: string }) {
  const { data: session, update: updateSession } = useSession();
  const exchange = session?.user?.exchanges?.find((e) => e.name === exchangeName);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormNewExchange>({
    defaultValues: {
      name: exchangeName || '',
      apiKey: exchange?.apiKey || '',
      apiSecret: exchange?.apiSecret || '',
    },
  });

  useEffect(() => {
    reset({
      name: exchangeName || '',
      apiKey: exchange?.apiKey || '',
      apiSecret: exchange?.apiSecret || '',
    });
  }, [exchange?.apiKey, exchange?.apiSecret, exchangeName, reset]);

  const onSubmit = async (data: IFormNewExchange) => {
    const res = await myexCreateExchange(data);
    if (res.success) {
      await updateSession();
      enqueueSnackbar('The exchange info has been updated successfully.', { variant: 'success' });
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <div className='mb-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.apiKey}
              helperText={errors.apiKey?.message}
              label='API Key'
              placeholder='API Key'
              {...field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide a API Key.',
          }}
          name='apiKey'
          control={control}
        />
      </div>
      <div className='my-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.apiSecret}
              helperText={errors.apiSecret?.message}
              label='API Secret (better to keep permissions to read only)'
              placeholder='API Secret'
              {...field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide a API Secret.',
          }}
          name='apiSecret'
          control={control}
        />
      </div>
      <div className='mt-6'>
        <MyexLoadingButton loading={isSubmitting} />
      </div>
    </form>
  );
}
