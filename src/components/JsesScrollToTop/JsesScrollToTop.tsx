'use client';
import React from 'react';

import JsesTooltip from '@jses/components/@mui/material/Tooltip';
import { useJsesDispatch, useJsesSelector } from '@jses/store';
import { setScrollTop } from '@jses/store/dom/actions';
import { selectScrollTop } from '@jses/store/dom/selectors';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Fab, Zoom } from '@mui/material';

export default function JsesScrollToTop() {
  const dispatch = useJsesDispatch();
  const scrollTop = useJsesSelector(selectScrollTop);
  const scrollToTop = () => {
    dispatch(setScrollTop(0));
  };

  return (
    <JsesTooltip title='Scroll to Top' placement='top'>
      <div className='fixed right-8 bottom-8'>
        <Zoom in={scrollTop > 600} unmountOnExit onClick={scrollToTop}>
          <Fab color='primary'>
            <ArrowUpwardIcon />
          </Fab>
        </Zoom>
      </div>
    </JsesTooltip>
  );
}
