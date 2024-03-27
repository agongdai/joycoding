'use client';

import React from 'react';

import { faPencil } from '@fortawesome/pro-duotone-svg-icons';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import { useMyexDispatch } from '@myex/store';
import { setWalletBeingUpdated } from '@myex/store/flags/actions';
import { StyleVariant } from '@myex/types/common';
import { OnChainWallet } from '@prisma/client';

export default function UpdateWalletButton({ wallet }: { wallet: OnChainWallet }) {
  const dispatch = useMyexDispatch();
  const onUpdate = () => dispatch(setWalletBeingUpdated(wallet));

  return (
    <AwesomeIcon
      icon={faPencil}
      tooltip={`Update wallet ${wallet.name}`}
      onClick={onUpdate}
      size='lg'
      variant={StyleVariant.Info}
    />
  );
}
