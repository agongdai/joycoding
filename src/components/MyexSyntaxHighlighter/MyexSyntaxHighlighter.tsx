import React from 'react';
import cx from 'classnames';
import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { shadesOfPurple } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';
import Copiable from '@myex/components/Copiable';

type Props = Omit<SyntaxHighlighterProps, 'children'> & {
  snippet: string;
};

export default function MyexSyntaxHighlighter({ snippet, ...props }: Props) {
  const multiline = snippet.indexOf('\n') > -1;
  return (
    <div className='relative'>
      <SyntaxHighlighter
        language={(props.language || 'javascript').toLowerCase()}
        style={shadesOfPurple}
        showLineNumbers={multiline}
        // make <pre> tag display:grid to make horizontal scrollbar work. @todo: find a better way
        className={cx('!grid', { '!pr-8': !multiline })}
      >
        {snippet}
      </SyntaxHighlighter>
      <Copiable text={snippet} tipText='Copy Code' className='absolute top-0 right-0 sm:-right-4'>
        <IconButton>
          <ContentCopyIcon fontSize='small' color='white' />
        </IconButton>
      </Copiable>
    </div>
  );
}
