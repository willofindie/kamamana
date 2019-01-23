import React from 'react';
import PropTypes from 'prop-types';
import { jsx } from '/src/nano';

const WrapperJSX = jsx(
  'div',
  {
    pos: 'relative',
    d: 'inline-block',
    '& svg': {
      pos: 'absolute',
      t: 0,
      l: 0,
    },
  },
  'icon-wrapper'
);

const WrapperStyled = props => {
  let css = {};
  if (props.bgc) {
    css.bgc = props.bgc;
    css.p = 2;
    css.bdrs = 2;
  }
  return (
    <WrapperJSX className={props.className} css={css}>
      {props.children}
    </WrapperJSX>
  );
};

WrapperStyled.propTypes = {
  bgc: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default WrapperStyled;
