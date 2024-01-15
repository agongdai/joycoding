'use client';

import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import { TooltipProps } from '@mui/material';
import Tooltip from '@myex/components/@mui/material/Tooltip';

interface Props {
  text: string;
  tipText?: string;
  children?: React.ReactNode;
  tipPlacement?: TooltipProps['placement'];
  className?: string;
}

export default function Copiable({
  text,
  tipText = 'Copy',
  children = null,
  tipPlacement = 'top',
  className = '',
}: Props) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const navigator = window.navigator;
    navigator.clipboard.writeText(text).then(
      () => setCopied(true),
      () =>
        window.prompt("Whoops, we can't copy in your browser. Please copy your text here:", text),
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 3000);
    return () => window?.clearTimeout(timer);
  }, [copied]);

  return (
    <Tooltip title={copied ? 'Copied' : tipText} placement={tipPlacement}>
      <div role='presentation' onClick={copy} className={cx('inline-block', className)}>
        {children || text}
      </div>
    </Tooltip>
  );
}
