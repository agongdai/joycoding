'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';

import { myexCreateExchangeApi } from '@myex/app/serverActions';
import TextField from '@myex/components/MyexForm/TextField';
import MyexLoadingButton from '@myex/components/ui/MyexLoadingButton';
import { IFormNewExchangeApi } from '@myex/types/exchange';

export default function ExchangesForm({ exchangeId }: { exchangeId: string }) {
  const { data: session, update: updateSession } = useSession();
  const exchange = session?.user?.exchangeApis?.find((e) => e.exchangeId === exchangeId);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormNewExchangeApi>({
    defaultValues: {
      exchangeId: exchangeId || '',
      apiKey: exchange?.apiKey || '',
      apiSecret: exchange?.apiSecret || '',
      url: '',
    },
  });

  useEffect(() => {
    reset({
      exchangeId: exchangeId || '',
      apiKey: exchange?.apiKey || '',
      apiSecret: exchange?.apiSecret || '',
      url: exchange?.url || '',
    });
  }, [exchange?.apiKey, exchange?.apiSecret, exchange?.url, exchangeId, reset]);

  const onSubmit = async (data: IFormNewExchangeApi) => {
    const res = await myexCreateExchangeApi(data);
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
      <div className='my-6'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.url}
              helperText={errors.url?.message}
              label='Exchange URL'
              placeholder='URL to go to the exchange'
              {...field}
              ref={null}
            />
          )}
          name='url'
          control={control}
        />
      </div>
      <div className='mt-6'>
        <MyexLoadingButton loading={isSubmitting} />
      </div>
    </form>
  );
}
