import React from 'react';

import MyexTooltip from '@myex/components/ui/MyexTooltip';

interface Props {
  text: string;
  limit?: number;
}

export default function MyexLimitedWords({ text, limit = 180 }: Props) {
  const more = text.length > limit;
  if (more) {
    return (
      <MyexTooltip title={text}>
        <p>{text.substring(0, limit)} ...</p>
      </MyexTooltip>
    );
  }

  return <p>{text}</p>;
}
