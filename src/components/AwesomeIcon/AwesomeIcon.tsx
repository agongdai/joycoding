import React from 'react';
import cx from 'classnames';

import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { variant2Color } from '@jses/theme/palette';
import { StyleVariant } from '@jses/types/common';
import { Tooltip, Zoom } from '@mui/material';

interface Props {
  icon: IconProp;
  size?: SizeProp;
  className?: string;
  color?: string;
  contrast?: boolean;
  tooltip?: string;
  variant?: StyleVariant;
}

export default function AwesomeIcon({
  icon,
  size = 'xl',
  className,
  color,
  contrast = false,
  tooltip = '',
  variant = StyleVariant.Default,
}: Props) {
  const variantColor = variant2Color(variant);

  const iconNode = (
    <FontAwesomeIcon
      icon={icon}
      size={size}
      style={{ color: variantColor || color }}
      className={cx(`text-tertiary-main dark:text-tertiary-dark ${className}`, {
        'text-text-highlight dark:text-text-highlight': contrast,
      })}
    />
  );

  return tooltip ? (
    <Tooltip arrow TransitionComponent={Zoom} title={tooltip}>
      {iconNode}
    </Tooltip>
  ) : (
    iconNode
  );
}
