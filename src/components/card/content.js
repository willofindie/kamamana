import React from 'react';
import CardContentStyled from './card-content-styled';

import type { Node } from 'react';

export type Props = {
  children?: Node,
  className: string,
  style?: Object,
};

export default class CardContent extends React.Component<Props> {
  static defaultProps = {
    className: 'content',
  };

  render() {
    const { className, style } = this.props;
    return (
      <CardContentStyled css={style} className={className}>
        {this.props.children}
      </CardContentStyled>
    );
  }
}
