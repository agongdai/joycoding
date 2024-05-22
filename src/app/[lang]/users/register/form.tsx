'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';

import { myexCreateUser } from '@myex/app/serverActions/myexUser';
import TextField from '@myex/components/form/TextField';
import MyexLoadingButton from '@myex/components/ui/MyexLoadingButton';
import { IFormNewUser } from '@myex/types/user';

export default function RegisterUserForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormNewUser>({
    defaultValues: {
      username: '',
    },
  });
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!!session?.user?.username) {
      router.push(`${window.location.origin}/`);
    }
  }, [router, session]);

  const onSubmit = async (data: IFormNewUser) => {
    try {
      const res = await myexCreateUser(data);
      if (res.success) {
        enqueueSnackbar('User registered successfully', { variant: 'success' });
        setTimeout(() => {
          window.location.href = `${window.location.origin}/`;
        }, 1000);
        return;
      } else {
        enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
      }
    } catch (e) {
      enqueueSnackbar('Error: failed to register user', { variant: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <Controller
        render={({ field }) => (
          <TextField
            error={!!errors.username}
            helperText={errors.username?.message}
            label='Username'
            placeholder='Username - Letters and numbers only'
            {...field}
            ref={null}
          />
        )}
        rules={{
          required: 'Please provide an unique username.',
          pattern: {
            value: /^[a-z0-9]+$/i,
            message: 'Only letters and numbers are allowed.',
          },
        }}
        name='username'
        control={control}
      />
      <div className='my-6'>
        <TextField label='Name' value={session?.user?.name} disabled />
      </div>
      <div className='my-6'>
        <TextField label='Email' value={session?.user?.email} disabled />
      </div>
      <div className='mt-6'>
        <MyexLoadingButton loading={isSubmitting} />
      </div>
    </form>
  );
}
