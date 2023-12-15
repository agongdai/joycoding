import React from 'react';

import JsesTooltip from '@jses/components/@mui/material/Tooltip';

interface Props {
  text: string;
  limit?: number;
}

export default function JsesLimitedWords({ text, limit = 180 }: Props) {
  const more = text.length > limit;
  if (more) {
    return (
      <JsesTooltip title={text}>
        <p>{text.substring(0, limit)} ...</p>
      </JsesTooltip>
    );
  }

  return <p>{text}</p>;
}
