'use client';

import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import Switch from '@myex/components/form/Switch';
import TextField from '@myex/components/form/TextField';
import { IFormNewParameter } from '@myex/types/parameter';

interface Props {
  control: Control<IFormNewParameter>;
  errors: FieldErrors<IFormNewParameter>;
  update?: boolean;
}

export default function UpsertParameterForm({ control, errors, update }: Props) {
  return (
    <div className='w-full'>
      <div className='my-4'>
        <Controller
          render={({ field }) => (
            <TextField
              error={!!errors.name}
              helperText={errors.name?.message}
              label='Parameter Name (e.g. "dom.mobileSiderbarOpen")'
              placeholder='Please follow the format like: dom.mobileSiderbarOpen'
              {...field}
              ref={null}
            />
          )}
          rules={{
            required: 'Please provide a parameter name.',
          }}
          name='name'
          disabled={update}
          control={control}
        />
      </div>

      <div className='mb-4'>
        <Controller
          render={({ field }) => (
            <TextField
              multiline
              error={!!errors.description}
              helperText={errors.description?.message}
              label='Description'
              placeholder='optional description'
              {...field}
              ref={null}
            />
          )}
          name='description'
          control={control}
        />
      </div>

      <div className='mb-4'>
        <Controller
          render={({ field }) => <Switch label='Enabled' {...field} ref={null} />}
          name='enabled'
          control={control}
        />
      </div>
    </div>
  );
}
