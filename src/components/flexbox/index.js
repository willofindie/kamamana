import React from 'react';
import FlexboxStyled from './flex-styled';
import FlexboxItemStyled from './flex-item-styled';

import type { Props, State, ItemElement } from './index.d';

export default class Flexbox extends React.PureComponent<Props, State> {
  static defaultProps = {
    style: {
      fxd: 'row',
    },
  };

  constructor(props: Props) {
    super(props);
    const colSpanList = props.cols ? props.cols.split(':').map(num => parseInt(num, 10)) : null;
    this.state = {
      // Surround each Child with FlexItem for proper, width calculations...
      children: this.prefix(props, colSpanList),
      colSpanList,
    };
  }

  // This method helps in wrapping flex items inside <FlexItemStyled /> if already not inside it.
  // Helps in removing extra code for <FlexItemStyled /> Wrappers...
  prefix = (props: Props, colSpanList: ?Array<number>): Array<ItemElement> => {
    const childCount = React.Children.count(props.children);
    let total, colCount;
    if (colSpanList) {
      total = colSpanList.reduce((sum, n) => sum + n, 0);
      colCount = colSpanList.length;
    } else {
      colCount = childCount;
    }
    if (colCount === childCount) {
      return React.Children.map(props.children, (child, i) => {
        if (child.type === Flexbox) {
          return child;
        }
        const width = colSpanList ? (colSpanList[i] * 100) / total : 100;
        if (child.type === FlexboxItemStyled) {
          return React.cloneElement(
            child,
            { css: { ...child.props.style, fxb: `${width}%` } },
            child.props.children
          );
        }
        const { itemStyle, ...rest } = child.props;
        return (
          <FlexboxItemStyled css={{ ...itemStyle, fxb: `${width}%` }}>
            {React.cloneElement(child, { ...rest }, child.props.children)}
          </FlexboxItemStyled>
        );
      });
    }
    throw new Error('Child Count must be equal to Column Count');
  };

  render() {
    const css = { ...this.props.style };
    return <FlexboxStyled css={css}>{this.state.children}</FlexboxStyled>;
  }
}
