import React from 'react';
import { KamamanaConsumer } from '/src/context';
import CardTitleStyled from './car-title-styled';

import type { Node } from 'react';

export type Props = {
  children?: Node,
  className: string,
  style?: Object,
};

export default class CardTitle extends React.Component<Props> {
  static defaultProps = {
    className: 'title',
  };

  getCSS = (context: Object) => {
    return {
      c: context.fadedBlack,
      ...this.props.style,
    };
  };

  render() {
    const { className, style } = this.props;
    return (
      <KamamanaConsumer>
        {context => (
          <CardTitleStyled css={this.getCSS(context)} className={className}>
            {this.props.children}
          </CardTitleStyled>
        )}
      </KamamanaConsumer>
    );
  }
}
