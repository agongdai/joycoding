'use client';

import React from 'react';

import { faPencil } from '@fortawesome/pro-duotone-svg-icons';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import { useMyexDispatch } from '@myex/store';
import { setCoinBeingUpdated } from '@myex/store/flags/actions';
import { StyleVariant } from '@myex/types/common';
import { Coin } from '@prisma/client';

export default function UpdateCoinButton({ coin }: { coin: Coin }) {
  const dispatch = useMyexDispatch();
  const onUpdate = () => dispatch(setCoinBeingUpdated(coin));

  return (
    <AwesomeIcon
      icon={faPencil}
      tooltip={`Update coin ${coin.name}`}
      onClick={onUpdate}
      size='lg'
      variant={StyleVariant.Info}
    />
  );
}
