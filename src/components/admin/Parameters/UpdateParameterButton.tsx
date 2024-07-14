'use client';

import React from 'react';

import { faPencil } from '@fortawesome/pro-duotone-svg-icons';
import AwesomeIcon from '@myex/components/AwesomeIcon';
import { useMyexDispatch } from '@myex/store';
import { setParameterBeingUpdated } from '@myex/store/flags/actions';
import { StyleVariant } from '@myex/types/common';
import { Parameter } from '@prisma/client';

export default function UpdateParameterButton({ parameter }: { parameter: Parameter }) {
  const dispatch = useMyexDispatch();
  const onUpdate = () => dispatch(setParameterBeingUpdated(parameter));

  return (
    <AwesomeIcon
      icon={faPencil}
      tooltip={`Update parameter ${parameter.name}`}
      onClick={onUpdate}
      size='lg'
      variant={StyleVariant.Info}
    />
  );
}
