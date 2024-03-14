'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { faXmark } from '@fortawesome/pro-solid-svg-icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { myexCreateCoin } from '@myex/app/serverActions';
import CreateCoinForm from '@myex/components/admin/Coins/CreateCoinForm';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import MyexLoadingButton from '@myex/components/ui/MyexLoadingButton/MyexLoadingButton';
import { useMyexDispatch, useMyexSelector } from '@myex/store';
import { toggleCreateCoinModal } from '@myex/store/flags/actions';
import { selectCreateCoinModalOpen } from '@myex/store/flags/selectors';
import { IFormNewCoin } from '@myex/types/coin';

export default function CreateCoinModal() {
  const dispatch = useMyexDispatch();
  const createCoinModalOpen = useMyexSelector(selectCreateCoinModalOpen);
  const router = useRouter();
  const onClose = () => dispatch(toggleCreateCoinModal());

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormNewCoin>({
    defaultValues: {
      name: '',
      currency: '',
      projectUrl: '',
      cmcUrl: '',
      rating: 0,
      icon: '',
      exchangeSymbols: '',
    },
  });

  const onSubmit = async (data: IFormNewCoin) => {
    const res = await myexCreateCoin(data);
    if (res.success) {
      onClose();
      enqueueSnackbar('The coin has been added to MyEx.AI successfully.', { variant: 'success' });
      router.refresh();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  };

  return (
    <Dialog
      open={Boolean(createCoinModalOpen)}
      onClose={onClose}
      maxWidth='sm'
      classes={{ paper: 'w-full' }}
    >
      <DialogTitle classes={{ root: 'flex justify-between items-center' }}>
        Create Coin
        <AwesomeIcon icon={faXmark} size='sm' onClick={onClose} tooltip='Cancel' />
      </DialogTitle>
      <DialogContent>
        <form id='create-coin-form' onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <CreateCoinForm control={control} errors={errors} />
        </form>
      </DialogContent>
      <DialogActions classes={{ root: 'justify-between' }}>
        <Button onClick={onClose} color='secondary' variant='contained'>
          Cancel
        </Button>
        <MyexLoadingButton formId='create-coin-form' loading={isSubmitting} />
      </DialogActions>
    </Dialog>
  );
}
