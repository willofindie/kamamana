import React from 'react';
import memoizeOne from 'memoize-one';
import { KamamanaConsumer } from '/src/context';
import defaultTheme from '/src/theme';
import shouldUpdateMemoize from '/utils/should-update-memoize';
import { isString } from '/utils/validators';
import CardStyled from './card-styled';
import CardTitle from './title';
import CardContent from './content';

import type { Props } from './index.d';

export default class Card extends React.PureComponent<Props> {
  static defaultProps = {
    style: {},
  };

  getMemoizedCSS: Function;

  constructor(props: Props) {
    super(props);
    this.getMemoizedCSS = memoizeOne(this.getCSS, shouldUpdateMemoize);
  }

  getTitle = (css: Object) => {
    if (!this.props.title) {
      return null;
    } else if (
      !isString(this.props.title) &&
      React.Children.count(this.props.title) === 1 &&
      React.Children.only(this.props.title).type === CardTitle
    ) {
      return this.props.title;
    }
    return <CardTitle style={css}>{this.props.title}</CardTitle>;
  };

  getContent = (css: Object) => {
    if (
      !isString(this.props.children) &&
      React.Children.count(this.props.children) === 1 &&
      React.Children.only(this.props.children).type === CardContent
    ) {
      return this.props.children;
    }
    return <CardContent style={css}>{this.props.children}</CardContent>;
  };

  getCSS = (shallowProps: Object) => {
    return {
      c: shallowProps.context.fadedBlack,
      bgc: shallowProps.context.fadedWhite,
      ...shallowProps.style,
    };
  };

  renderCard = (context: Object) => {
    const shallowProps = { context, style: this.props.style };
    const css = this.getMemoizedCSS(shallowProps);
    return (
      <CardStyled css={css}>
        {this.getTitle(css)}
        {this.getContent(css)}
      </CardStyled>
    );
  };

  render() {
    return <KamamanaConsumer>{this.renderCard}</KamamanaConsumer>;
  }
}
