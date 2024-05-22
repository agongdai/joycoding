import React from 'react';
import cx from 'classnames';

interface Props {
  label: string;
  children: React.ReactNode;
  className?: string;
  info?: React.ReactNode | string;
  infoClassName?: string;
}

export default function MyexCard({
  label,
  children,
  className = '',
  info,
  infoClassName = '',
}: Props) {
  return (
    <div
      className={cx(
        'shadow rounded-2xl bg-bg-light-light dark:bg-bg-dark-light relative min-h-[16rem] lg:min-h-[14rem] sm:min-h-[12rem] xs:min-h-[10rem]',
        className,
      )}
    >
      <div
        role='heading'
        aria-level={5}
        className='absolute left-0 top-0 bg-info-main text-white text-sm lg:text-xs font-semibold py-1 px-2 lg:py-[0.2rem] rounded-ss-2xl rounded-ee-2xl'
      >
        {label}
      </div>
      <div className='text-4xl xxl:text-3xl sm:text-2xl font-medium justify-center flex items-center h-full w-full flex-wrap'>
        {children}
      </div>
      {info && (
        <div
          className={cx(
            'absolute right-0 bottom-0 text-white text-sm xl:text-xs font-semibold py-1 px-2 rounded-ss-2xl rounded-ee-2xl xs:leading-none',
            infoClassName,
          )}
        >
          {info}
        </div>
      )}
    </div>
  );
}
