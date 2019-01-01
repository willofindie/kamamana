import React from 'react';
import { KamamanaConsumer } from '/src/context';
import { lightenHexToAmount } from '/utils/colors';
import CardContentStyled from './card-content-styled';

import type { Node } from 'react';

const lightenHexBy10 = lightenHexToAmount(10);

export type Props = {
  children?: Node,
  className: string,
  style?: Object,
};

export default class CardContent extends React.Component<Props> {
  static defaultProps = {
    className: 'content',
  };

  getCSS = (context: Object) => {
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
