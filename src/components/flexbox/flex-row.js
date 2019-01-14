import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import FlexRowStyled from './flex-row-styled';
import Column from './flex-col';
import shouldUpdateMemoize from '/utils/should-update-memoize';
import { isNumber } from '/utils/validators';

export default class Row extends React.PureComponent {
  static CLASS_NAME = 'kamamana-flex-row';
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object.isRequired,
    gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
  static defaultProps = {
    style: {},
    gutter: 15,
  };

  constructor(props) {
    super(props);
    this.getMemoizedCSS = memoizeOne(this.getCSS, shouldUpdateMemoize);
  }

  getGutterSize = gutter => {
    if (isNumber(gutter)) {
      return parseInt(gutter, 10);
    }
    return 0;
  };

  getCSS = shallowProps => {
    const gutter = this.getGutterSize(shallowProps.gutter);
    return {
      [`& > .${Column.CLASS_NAME} + .${Column.CLASS_NAME}`]: {
        ml: gutter,
      },
      ...shallowProps.style,
    };
  };

  render() {
    const shallowProps = {
      style: this.props.style,
      gutter: this.props.gutter,
    };
    const css = this.getMemoizedCSS(shallowProps);
    return (
      <FlexRowStyled css={css} className={Row.CLASS_NAME}>
        {this.props.children}
      </FlexRowStyled>
    );
  }
}
