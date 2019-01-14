import React from 'react';
import PropTypes from 'prop-types';
import FlexboxStyled from './flex-styled';
import FlexboxItemStyled from './flex-item-styled';

export default class Flexbox extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    cols: PropTypes.string,
    style: PropTypes.object.isRequired,
  };
  static defaultProps = {
    style: {
      fxd: 'row',
    },
  };

  // This method helps in wrapping flex items inside <FlexItemStyled /> if already not inside it.
  // Helps in removing extra code for <FlexItemStyled /> Wrappers...
  prefix = (props, colSpanList) => {
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
            { css: { fxb: `${width}%`, ...child.props.style } },
            child.props.children
          );
        }
        const { itemStyle, ...rest } = child.props;
        return (
          <FlexboxItemStyled css={{ fxb: `${width}%`, ...itemStyle }}>
            {React.cloneElement(child, { ...rest }, child.props.children)}
          </FlexboxItemStyled>
        );
      });
    }
    throw new Error('Child Count must be equal to Column Count');
  };

  render() {
    const css = this.props.style;
    const colSpanList = this.props.cols
      ? this.props.cols.split(':').map(num => parseInt(num, 10))
      : null;
    return <FlexboxStyled css={css}>{this.prefix(this.props, colSpanList)}</FlexboxStyled>;
  }
}
