'use client';

import React from 'react';

import JsesTooltip from '@jses/components/@mui/material/Tooltip';

interface Props {
  url: string;
  children: React.ReactNode;
  className?: string;
  tooltip?: string;
}

/**
 * Opens a link in a new window through onClick event. It's used when this is a child of another link.
 *
 * @param url
 * @param children
 * @param className
 * @param tooltip
 * @constructor
 */
export default function JsesWindowOpenLink({ url, children, className = '', tooltip = '' }: Props) {
  const goToExternalLink = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank');
  };

  if (!url) {
    return children;
  }

  // Still add a <a> tag, so that clicking middle wheel on it will open the link in a new tab.
  const link = (
    <a href={url} className={`cursor-pointer ${className}`} onClick={goToExternalLink}>
      {children}
    </a>
  );

  return tooltip ? <JsesTooltip title={tooltip}>{link}</JsesTooltip> : link;
}
