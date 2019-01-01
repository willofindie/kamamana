import React from 'react';
import { jsx } from '/src/nano';

import type { Node, Element } from 'react';

export type Props = {
  w: string | number,
  h: string | number,
  bgc?: string,
  className?: string,
  children?: Node,
};

export type Styles = {
  w: string | number,
  h: string | number,
  bgc?: string,
  p?: string | number,
  bdrs?: string | number,
};

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

const WrapperStyled = (props: Props): Element<typeof WrapperJSX> => {
  let css: Styles = { w: props.w, h: props.h };
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

WrapperStyled.defaultProps = {
  w: 20,
  h: 20,
};

export default WrapperStyled;