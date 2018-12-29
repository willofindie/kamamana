import React from 'react';
import CardTitleStyled from './car-title-styled';

import type { Node } from 'react';

export type Props = {
  children?: Node,
  className: string,
};

export default class CardTitle extends React.Component<Props> {
  static defaultProps = {
    className: 'title',
  };

  render() {
    const { className } = this.props;
    return <CardTitleStyled className={className}>{this.props.children}</CardTitleStyled>;
  }
}
