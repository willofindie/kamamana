import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import FlexColStyled from './flex-col-styled';
import shouldUpdateMemoize from '/utils/should-update-memoize';
import { isNumber } from '/utils/validators';

export default class Column extends React.PureComponent {
  static CLASS_NAME = 'kamamana-flex-col';
  static propTypes = {
    children: PropTypes.node,
    span: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    style: PropTypes.object.isRequired,
  };
  static defaultProps = {
    style: {},
    span: 6,
  };

  totalSpan = 12; // Keeping it similar to bootstrap column counts

  constructor(props) {
    super(props);
    this.getMemoizedCSS = memoizeOne(this.getCSS, shouldUpdateMemoize);
  }

  getCSS = shallowProps => {
    let fxb = '50%';
    if (isNumber(shallowProps.span)) {
      fxb = `${(parseInt(shallowProps.span, 10) / this.totalSpan) * 100}%`;
    }
    return {
      fxb,
      ...shallowProps.style,
    };
  };

  render() {
    const shallowProps = {
      style: this.props.style,
      span: this.props.span,
    };
    const css = this.getMemoizedCSS(shallowProps);
    return (
      <FlexColStyled css={css} className={Column.CLASS_NAME}>
        {this.props.children}
      </FlexColStyled>
    );
  }
}
