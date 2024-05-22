'use client';
import React from 'react';

import { MyexPaper, MyexStyledPageWrapper } from '@myex/components/ui/MyexStyled';

import PrivacyMd from './privacy.mdx';

export default function PrivacyPage() {
  return (
    <MyexStyledPageWrapper>
      <MyexPaper className='prose dark:prose-invert'>
        <PrivacyMd />
      </MyexPaper>
    </MyexStyledPageWrapper>
  );
}
