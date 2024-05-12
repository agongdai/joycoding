import React from 'react';
import cx from 'classnames';

interface Props {
  label: string;
  children: React.ReactNode;
  className?: string;
  info?: React.ReactNode | string;
  infoClassName?: string;
}

export default function Card({ label, children, className = '', info, infoClassName = '' }: Props) {
  return (
    <div
      className={cx(
        'shadow rounded-2xl bg-bg-light-light dark:bg-bg-dark-light relative min-h-[16rem]',
        className,
      )}
    >
      <div
        role='heading'
        aria-level={5}
        className='absolute left-0 top-0 bg-info-main text-white text-sm font-semibold py-1 px-2 rounded-ss-2xl rounded-ee-2xl'
      >
        {label}
      </div>
      <div className='text-6xl font-medium justify-center flex items-center h-full w-full flex-wrap'>
        {children}
      </div>
      {info && (
        <div
          className={cx(
            'absolute right-0 bottom-0 text-white text-sm font-semibold py-1 px-2 rounded-ss-2xl rounded-ee-2xl',
            infoClassName,
          )}
        >
          {info}
        </div>
      )}
    </div>
  );
}
