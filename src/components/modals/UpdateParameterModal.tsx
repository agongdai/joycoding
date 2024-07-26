'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { faXmark } from '@fortawesome/pro-solid-svg-icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { myexUpdateParameter } from '@myex/app/serverActions/myexParameter';
import UpsertParameterForm from '@myex/components/admin/Parameters/UpsertParameterForm';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import MyexLoadingButton from '@myex/components/ui/MyexLoadingButton';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setParameterBeingUpdated } from '@myex/store/flags/actions';
import { selectParameterBeingUpdated } from '@myex/store/flags/selectors';
import { IFormNewParameter } from '@myex/types/parameter';

export default function UpdateParameterModal() {
  const dispatch = useMyexDispatch();
  const parameterToUpdate = useMyexSelector(selectParameterBeingUpdated);
  const router = useRouter();
  const onClose = () => dispatch(setParameterBeingUpdated(null));

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormNewParameter>({
    defaultValues: {
      ...parameterToUpdate,
    },
  });

  useEffect(() => {
    if (parameterToUpdate) {
      reset({ ...parameterToUpdate });
    }
  }, [parameterToUpdate, reset]);

  const onSubmit = async (data: IFormNewParameter) => {
    if (!parameterToUpdate) return;

    const res = await myexUpdateParameter(parameterToUpdate.myexId, data);
    if (res.success) {
      onClose();
      enqueueSnackbar(`The parameter ${parameterToUpdate.name} has been updated successfully.`, {
        variant: 'success',
      });
      router.refresh();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  };

  return (
    <Dialog
      open={Boolean(parameterToUpdate)}
      onClose={onClose}
      maxWidth='sm'
      classes={{ paper: 'w-full' }}
    >
      <DialogTitle classes={{ root: 'flex justify-between items-center' }}>
        Update parameter {parameterToUpdate?.name}
        <AwesomeIcon icon={faXmark} size='sm' onClick={onClose} tooltip='Cancel' />
      </DialogTitle>
      <DialogContent>
        <form id='update-parameter-form' onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <UpsertParameterForm control={control} errors={errors} update />
        </form>
      </DialogContent>
      <DialogActions classes={{ root: 'justify-between' }}>
        <Button onClick={onClose} color='secondary' variant='contained'>
          Cancel
        </Button>
        <MyexLoadingButton formId='update-parameter-form' loading={isSubmitting} />
      </DialogActions>
    </Dialog>
  );
}
