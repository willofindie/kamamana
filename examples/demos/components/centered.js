import { jsx } from 'kamamana';
import PropTypes from 'prop-types';
import React from 'react';
import Grid from './helper-grid';

const CenterStyled = jsx(
  'div',
  {
    h: '100vh',
    bxz: 'border-box',
    p: '80px',
    '& .story-grid-pallete': {
      pos: 'absolute',
      t: 0,
      l: 0,
      z: -1,
    },
  },
  'CenterWrapper'
);

const Center = props => (
  <CenterStyled>
    <Grid className='story-grid-pallete' />
    {props.children}
  </CenterStyled>
);

Center.propTypes = {
  children: PropTypes.node,
};

export default Center;
