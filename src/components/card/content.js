import React from 'react';
import PropTypes from 'prop-types';
import { KamamanaConsumer } from '/src/context';
import { lightenHexToAmount } from '/utils/colors';
import CardContentStyled from './card-content-styled';

const lightenHexBy10 = lightenHexToAmount(10);

export default class CardContent extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
  };
  static defaultProps = {
    className: 'content',
    style: {},
  };

  // since it's a very simple calculation on each render, memoizing it doesn't look good...
  getCSS = context => {
    return {
      c: lightenHexBy10(context.fadedBlack),
      ...this.props.style,
    };
  };

  render() {
    const { className, style } = this.props;
    return (
      <KamamanaConsumer>
        {context => (
          <CardContentStyled css={this.getCSS(context)} className={className}>
            {this.props.children}
          </CardContentStyled>
        )}
      </KamamanaConsumer>
    );
  }
}
