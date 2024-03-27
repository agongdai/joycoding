'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { faXmark } from '@fortawesome/pro-solid-svg-icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { myexCreateOnChainWallet } from '@myex/app/serverActions/myexOnChainWallet';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import UpsertWalletForm from '@myex/components/OnChainWallets/UpsertWalletForm';
import MyexLoadingButton from '@myex/components/ui/MyexLoadingButton';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { toggleUpsertWalletModal } from '@myex/store/flags/actions';
import { selectUpsertWalletModalOpen } from '@myex/store/flags/selectors';
import { WalletProvider } from '@myex/types/trading';
import { IFormOnChainWallet } from '@myex/types/wallet';

export default function CreateWalletModal() {
  const dispatch = useMyexDispatch();
  const upsertWalletModalOpen = useMyexSelector(selectUpsertWalletModalOpen);
  const router = useRouter();
  const onClose = () => dispatch(toggleUpsertWalletModal());

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormOnChainWallet>({
    defaultValues: {
      name: '',
      address: '',
      network: '',
      protocol: '',
      provider: WalletProvider.Unknown,
      coinMyexId: 0,
    },
  });

  const onSubmit = async (data: IFormOnChainWallet) => {
    const res = await myexCreateOnChainWallet(data);
    if (res.success) {
      reset();
      onClose();
      enqueueSnackbar('The wallet has been added to MyEx.AI successfully.', { variant: 'success' });
      router.refresh();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  };

  return (
    <Dialog
      open={Boolean(upsertWalletModalOpen)}
      onClose={onClose}
      maxWidth='sm'
      classes={{ paper: 'w-full' }}
    >
      <DialogTitle classes={{ root: 'flex justify-between items-center' }}>
        Create Wallet On Chain
        <AwesomeIcon icon={faXmark} size='sm' onClick={onClose} tooltip='Cancel' />
      </DialogTitle>
      <DialogContent>
        <form id='upsert-coin-form' onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <UpsertWalletForm control={control} errors={errors} />
        </form>
      </DialogContent>
      <DialogActions classes={{ root: 'justify-between' }}>
        <Button onClick={onClose} color='secondary' variant='contained'>
          Cancel
        </Button>
        <MyexLoadingButton formId='upsert-coin-form' loading={isSubmitting} />
      </DialogActions>
    </Dialog>
  );
}
