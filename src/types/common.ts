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

export enum Severity {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export enum ExchangeStatus {
  Operative = 1,
  Maintenance = 0,
}

export type IMenu = {
  title: string;
  icon: IconProp;
  href: string;
  subMenus?: IMenu[];
  protected?: boolean;
  adminOnly?: boolean;
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

export const enum ValueFormat {
  Number = 'number',
  Money = 'money',
  Percentage = 'percentage',
  Date = 'date',
  Boolean = 'boolean',
  String = 'string',
  Coin = 'coin',
  Volume = 'volume',
  UserActions = 'userActions',
  Image = 'image',
  Exchange = 'exchange',
}

export type Value = string | number | boolean | Date | null | undefined;

export type Coin = {
  name: string;
  currency: string;
  detailsUrl?: string;
};
