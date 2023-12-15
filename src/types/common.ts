import React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface PropsWithChildren {
  children: React.ReactNode;
  className?: string;
}

export type Option = {
  label: string | React.ReactNode;
  value: string | number;
  href?: string;
};

export const enum Status {
  Active = 'active',
  Inactive = 'inactive',
}

export type IMenu = {
  title: string;
  icon: IconProp;
  href: string;
  subMenus?: IMenu[];
};

export const enum StyleVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Highlight = 'highlight',
  Default = '',
}
