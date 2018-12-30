import React from 'react';
import type { Node } from 'react';
import { jsx } from '/src/nano';

type Props = {
  children: Node,
  bgc: string,
};

const Colored = jsx(
  'div',
  {
    mih: '100px',
    bxz: 'border-box',
    bxsh: '0 0 15px -8px rgba(0,0,0,0.1), 0 2px 5px rgba(0,0,0,0.2)',
    bdrs: '2px',
    c: '#fafafa',
    p: 20,
  },
  'ColoredLayerStyled'
);

const ColoredLayer = (props: Props) => <Colored css={{ bgc: props.bgc }}>{props.children}</Colored>;

export default ColoredLayer;
