'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BigNumber from 'bignumber.js';
import { enqueueSnackbar } from 'notistack';

import { faPencil, faSave } from '@fortawesome/pro-solid-svg-icons';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { myexUpdateTxOpenPrice } from '@myex/app/serverActions/myexTransaction';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import Money from '@myex/components/ui/MyexFormatter/Money';
import useOptimistic from '@myex/hooks/useOptimistic';
import { removeTrailingZeros } from '@myex/utils/number';
import { Transaction } from '@prisma/client';

interface Props {
  price: string;
  tx: Transaction | null | undefined;
}

export default function EditableTxOpenPrice({ price, tx }: Props) {
  const router = useRouter();
  const openPrice = BigNumber(tx?.openPrice || 0).toFixed(8);
  const [editing, setEditing] = useState(false);
  const [hover, setHover] = useState(false);
  const [value, setValue] = useState(openPrice ? removeTrailingZeros(openPrice) : '');
  const [optimistic, setOptimistic] = useOptimistic<string>(openPrice);

  const currentPrice = BigNumber(price);

  useEffect(() => {
    editing && setValue(openPrice || '');
  }, [openPrice, editing]);

  const onClick = async () => {
    if (editing) {
      const res = await myexUpdateTxOpenPrice(tx?.myexId || 0, value);
      setOptimistic(value);
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
        className='flex flex-col w-full xs:text-sm'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Money value={currentPrice.toNumber()} />
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
            <Money value={optimistic} />
          )}
          {(hover || editing) && (
            <AwesomeIcon
              icon={editing ? faSave : faPencil}
              size='sm'
              className='cursor-pointer ml-2 md:hidden'
              onClick={onClick}
              tooltip={editing ? 'Save' : 'Edit'}
            />
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
}
