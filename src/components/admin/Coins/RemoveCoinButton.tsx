'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import { faTrashCan } from '@fortawesome/pro-duotone-svg-icons';
import { Button, Popover } from '@mui/material';
import { myexRemoveCoin } from '@myex/app/serverActions';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import { useMyexDispatch } from '@myex/store';
import { StyleVariant } from '@myex/types/common';
import { Coin } from '@prisma/client';

export default function RemoveCoinButton({ coin }: { coin: Coin }) {
  const dispatch = useMyexDispatch();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onRemove = async () => {
    const res = await myexRemoveCoin(coin.myexId);
    handleClose();
    if (res.success) {
      enqueueSnackbar('The coin has been removed from MyEx.AI successfully.', {
        variant: 'success',
      });
      router.refresh();
    } else {
      enqueueSnackbar(`Error: ${res.message}`, { variant: 'error' });
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <AwesomeIcon
        icon={faTrashCan}
        tooltip={`Remove coin ${coin.name}`}
        onClick={handleClick}
        size='lg'
        variant={StyleVariant.Danger}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{ paper: 'p-4 max-w-[30rem]' }}
      >
        <h6 className='mb-3'>You will lose the coin permanently in MyEx.AI, sure?</h6>
        <Button onClick={onRemove} variant='contained' color='primary'>
          Remove
        </Button>
      </Popover>
    </div>
  );
}
