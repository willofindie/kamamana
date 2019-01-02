import React from 'react';
import type { Node } from 'react';
import { jsx } from '/src/nano';
import Grid from './helper-grid';

const CenterStyled = jsx(
  'div',
  {
    height: '100vh',
    boxSizing: 'border-box',
    padding: '80px',
    '& .story-grid-pallete': {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: -1,
    },
  },
  'CenterWrapper'
);

const Center = (props: { children: Node }) => (
  <CenterStyled>
    <Grid className='story-grid-pallete' />
    {props.children}
  </CenterStyled>
);

export default Center;
