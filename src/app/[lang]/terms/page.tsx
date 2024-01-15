'use client';
import React from 'react';

import { MyexPaper, MyexStyledPageWrapper } from '@myex/components/MyexStyled';

import TermsMd from './terms.mdx';

export default function TermsPage() {
  return (
    <MyexStyledPageWrapper>
      <MyexPaper className='prose dark:prose-invert'>
        <TermsMd />
      </MyexPaper>
    </MyexStyledPageWrapper>
  );
}
