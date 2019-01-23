import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import FlexboxStyled from './flex-styled';
import Row from './flex-row';
import shouldUpdateMemoize from '/utils/should-update-memoize';
import { isNumber } from '/utils/validators';

export default class Flexbox extends React.PureComponent {
  static CLASS_NAME = 'kamamana-flex-box';
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object.isRequired,
    gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
    return 15;
  };

  getCSS = shallowProps => {
    const gutter = this.getGutterSize(shallowProps.gutter);

    return {
      [`& > .${Row.CLASS_NAME} + .${Row.CLASS_NAME}`]: {
        mt: gutter,
      },
      ...shallowProps.style,
    };
  };

  render() {
    const shallowProps = { style: this.props.style, gutter: this.props.gutter };
    const css = this.getMemoizedCSS(shallowProps);
    return (
      <FlexboxStyled css={css} className={Flexbox.CLASS_NAME}>
        {this.props.children}
      </FlexboxStyled>
    );
  }
}
