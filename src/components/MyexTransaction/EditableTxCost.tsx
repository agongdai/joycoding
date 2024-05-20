'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import BigNumber from 'bignumber.js';
import { enqueueSnackbar } from 'notistack';

import { faPencil, faSave } from '@fortawesome/pro-solid-svg-icons';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { myexUpdateTxOpenPrice } from '@myex/app/serverActions/myexTransaction';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import Money from '@myex/components/MyexFormatter/Money';
import { Transaction } from '@prisma/client';

interface Props {
  price: string;
  tx: Transaction | null | undefined;
}

export default function EditableTxCost({ price, tx }: Props) {
  console.log('tx', tx);
  const router = useRouter();
  const cost = BigNumber(tx?.openPrice || 0)
    .multipliedBy(BigNumber(tx?.totalAmount || 0))
    .toFixed(0);
  const [editing, setEditing] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [value, setValue] = React.useState(cost ? cost.toString() : '');

  const currentPrice = BigNumber(price);

  const onClick = async () => {
    if (editing) {
      const res = await myexUpdateTxOpenPrice(
        tx?.myexId || 0,
        BigNumber(value)
          .dividedBy(BigNumber(tx?.totalAmount || 0))
          .toString(),
      );
      if (res?.success) {
        enqueueSnackbar(`The open price has been updated successfully.`, {
          variant: 'success',
        });
        router.refresh();
        setEditing(false);
      }
    } else {
      setEditing(true);
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setEditing(false)}>
      <div
        className='flex flex-col w-full'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Money value={currentPrice.multipliedBy(BigNumber(tx?.totalAmount || 0)).toFixed(0)} />
        <div className='text-gray-500 flex items-center leading-none'>
          {editing ? (
            <input
              autoFocus
              type='number'
              className='w-full px-1'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          ) : (
            <Money value={cost} />
          )}
          {(hover || editing) && (
            <AwesomeIcon
              icon={editing ? faSave : faPencil}
              size='sm'
              className='cursor-pointer ml-2'
              onClick={onClick}
              tooltip={editing ? 'Save' : 'Edit'}
            />
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
}
