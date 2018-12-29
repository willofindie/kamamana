import React from 'react';
import FlexboxStyled from './flex-styled';
import FlexboxItemStyled from './flex-item-styled';

import type { Props, State, ItemElement } from './index.d';

export default class Flexbox extends React.PureComponent<Props, State> {
  static defaultProps = {
    style: {
      fxd: 'row',
    },
    cols: 1,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      // Surround each Child with FlexItem for proper, width calculations...
      children: this.prefix(props),
    };
  }

  prefix = (props: Props): Array<ItemElement> => {
    const width = 100 / props.cols;
    return React.Children.map(props.children, child => {
      if (child.type === FlexboxItemStyled) {
        return React.cloneElement(
          child,
          { css: { ...child.props.style, fxb: `${width}%` } },
          child.props.children
        );
      } else if (child.type === Flexbox) {
        return child;
      }
      const { itemStyle, ...rest } = child.props;
      return (
        <FlexboxItemStyled css={{ ...itemStyle, fxb: `${width}%` }}>
          {React.cloneElement(child, { ...rest }, child.props.children)}
        </FlexboxItemStyled>
      );
    });
  };

  render() {
    const css = { ...this.props.style };
    return <FlexboxStyled css={css}>{this.state.children}</FlexboxStyled>;
  }
}
