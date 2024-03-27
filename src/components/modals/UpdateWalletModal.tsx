'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { faXmark } from '@fortawesome/pro-solid-svg-icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { myexUpdateWallet } from '@myex/app/serverActions/myexOnChainWallet';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import UpsertWalletForm from '@myex/components/OnChainWallets/UpsertWalletForm';
import MyexLoadingButton from '@myex/components/ui/MyexLoadingButton/MyexLoadingButton';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { setWalletBeingUpdated } from '@myex/store/flags/actions';
import { selectWalletBeingUpdated } from '@myex/store/flags/selectors';
import { IFormOnChainWallet } from '@myex/types/wallet';

export default function UpdateWalletModal() {
  const dispatch = useMyexDispatch();
  const walletToUpdate = useMyexSelector(selectWalletBeingUpdated);
  const router = useRouter();
  const onClose = () => dispatch(setWalletBeingUpdated(null));

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormOnChainWallet>({
    defaultValues: {
      ...walletToUpdate,
    },
  });

  useEffect(() => {
    if (walletToUpdate) {
      reset({ ...walletToUpdate });
    }
  }, [walletToUpdate, reset]);

  const onSubmit = async (data: IFormOnChainWallet) => {
    if (!walletToUpdate) return;

    const res = await myexUpdateWallet(walletToUpdate.myexId, data);
    if (res.success) {
      onClose();
      enqueueSnackbar(`The coin ${walletToUpdate.name} has been updated successfully.`, {
        variant: 'success',
      });
      router.refresh();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  };

  return (
    <Dialog
      open={Boolean(walletToUpdate)}
      onClose={onClose}
      maxWidth='sm'
      classes={{ paper: 'w-full' }}
    >
      <DialogTitle classes={{ root: 'flex justify-between items-center' }}>
        Update Wallet {walletToUpdate?.name}
        <AwesomeIcon icon={faXmark} size='sm' onClick={onClose} tooltip='Cancel' />
      </DialogTitle>
      <DialogContent>
        <form id='update-wallet-form' onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <UpsertWalletForm control={control} errors={errors} update />
        </form>
      </DialogContent>
      <DialogActions classes={{ root: 'justify-between' }}>
        <Button onClick={onClose} color='secondary' variant='contained'>
          Cancel
        </Button>
        <MyexLoadingButton formId='update-wallet-form' loading={isSubmitting} />
      </DialogActions>
    </Dialog>
  );
}
