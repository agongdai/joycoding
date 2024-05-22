'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { faXmark } from '@fortawesome/pro-solid-svg-icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { myexUpdateCoin } from '@myex/app/serverActions';
import CreateCoinForm from '@myex/components/admin/Coins/CreateCoinForm';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import MyexLoadingButton from '@myex/components/ui/MyexLoadingButton';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setCoinBeingUpdated } from '@myex/store/flags/actions';
import { selectCoinBeingUpdated } from '@myex/store/flags/selectors';
import { IFormNewCoin } from '@myex/types/coin';

export default function UpdateCoinModal() {
  const dispatch = useMyexDispatch();
  const coinToUpdate = useMyexSelector(selectCoinBeingUpdated);
  const router = useRouter();
  const onClose = () => dispatch(setCoinBeingUpdated(null));

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormNewCoin>({
    defaultValues: {
      ...coinToUpdate,
    },
  });

  useEffect(() => {
    if (coinToUpdate) {
      reset({ ...coinToUpdate });
    }
  }, [coinToUpdate, reset]);

  const onSubmit = async (data: IFormNewCoin) => {
    if (!coinToUpdate) return;

    const res = await myexUpdateCoin(coinToUpdate.myexId, data);
    if (res.success) {
      onClose();
      enqueueSnackbar(`The coin ${coinToUpdate.name} has been updated successfully.`, {
        variant: 'success',
      });
      router.refresh();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  };

  return (
    <Dialog
      open={Boolean(coinToUpdate)}
      onClose={onClose}
      maxWidth='sm'
      classes={{ paper: 'w-full' }}
    >
      <DialogTitle classes={{ root: 'flex justify-between items-center' }}>
        Update Coin {coinToUpdate?.name}
        <AwesomeIcon icon={faXmark} size='sm' onClick={onClose} tooltip='Cancel' />
      </DialogTitle>
      <DialogContent>
        <form id='update-coin-form' onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <CreateCoinForm control={control} errors={errors} update />
        </form>
      </DialogContent>
      <DialogActions classes={{ root: 'justify-between' }}>
        <Button onClick={onClose} color='secondary' variant='contained'>
          Cancel
        </Button>
        <MyexLoadingButton formId='update-coin-form' loading={isSubmitting} />
      </DialogActions>
    </Dialog>
  );
}
