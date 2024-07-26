'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { faXmark } from '@fortawesome/pro-solid-svg-icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { myexCreateParameter } from '@myex/app/serverActions/myexParameter';
import UpsertParameterForm from '@myex/components/admin/Parameters/UpsertParameterForm';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import MyexLoadingButton from '@myex/components/ui/MyexLoadingButton';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { toggleCreateParameterModalOpen } from '@myex/store/flags/actions';
import { selectCreateParameterModalOpen } from '@myex/store/flags/selectors';
import { IFormNewParameter } from '@myex/types/parameter';

export default function CreateParameterModal() {
  const dispatch = useMyexDispatch();
  const createParameterModalOpen = useMyexSelector(selectCreateParameterModalOpen);
  const router = useRouter();
  const onClose = () => dispatch(toggleCreateParameterModalOpen());

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormNewParameter>({
    defaultValues: {
      name: '',
      description: '',
      defaultValue: '',
      enabled: true,
    },
  });

  const onSubmit = async (data: IFormNewParameter) => {
    const res = await myexCreateParameter(data);
    if (res.success) {
      reset();
      onClose();
      enqueueSnackbar('The parameter has been added to MyEx.AI successfully.', {
        variant: 'success',
      });
      router.refresh();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  };

  return (
    <Dialog
      open={Boolean(createParameterModalOpen)}
      onClose={onClose}
      maxWidth='sm'
      classes={{ paper: 'w-full' }}
    >
      <DialogTitle classes={{ root: 'flex justify-between items-center' }}>
        Create Parameter
        <AwesomeIcon icon={faXmark} size='sm' onClick={onClose} tooltip='Cancel' />
      </DialogTitle>
      <DialogContent>
        <form id='create-parameter-form' onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <UpsertParameterForm control={control} errors={errors} />
        </form>
      </DialogContent>
      <DialogActions classes={{ root: 'justify-between' }}>
        <Button onClick={onClose} color='secondary' variant='contained'>
          Cancel
        </Button>
        <MyexLoadingButton formId='create-parameter-form' loading={isSubmitting} />
      </DialogActions>
    </Dialog>
  );
}
