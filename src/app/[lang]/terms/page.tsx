'use client';
import React from 'react';

import { JsesPaper, JsesStyledPageWrapper } from '@jses/components/JsesStyled';

import TermsMd from './terms.mdx';

export default function TermsPage() {
  return (
    <JsesStyledPageWrapper>
      <JsesPaper className='prose dark:prose-invert'>
        <TermsMd />
      </JsesPaper>
    </JsesStyledPageWrapper>
  );
}
