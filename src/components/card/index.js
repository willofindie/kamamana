import React from 'react';
import { KamamanaConsumer } from '/src/context';
import defaultTheme from '/src/theme';
import { isString } from '/utils/validators';
import CardStyled from './card-styled';
import CardTitle from './title';
import CardContent from './content';

import type { Props } from './index.d';

export default class Card extends React.PureComponent<Props> {
  static defaultProps = {
    style: {},
  };

  getTitle = (context: Object) => {
    if (!this.props.title) {
      return null;
    } else if (
      !isString(this.props.title) &&
      React.Children.count(this.props.title) === 1 &&
      React.Children.only(this.props.title).type === CardTitle
    ) {
      return this.props.title;
    }
    return <CardTitle style={this.getCSS(context)}>{this.props.title}</CardTitle>;
  };

  getContent = (context: Object) => {
    if (
      !isString(this.props.children) &&
      React.Children.count(this.props.children) === 1 &&
      React.Children.only(this.props.children).type === CardContent
    ) {
      return this.props.children;
    }
    return <CardContent style={this.getCSS(context)}>{this.props.children}</CardContent>;
  };

  getCSS = (context: Object) => {
    return {
      c: context.fadedBlack,
      bgc: context.fadedWhite,
      ...this.props.style,
    };
  };

  render() {
    return (
      <KamamanaConsumer>
        {context => (
          <CardStyled css={this.getCSS(context)}>
            {this.getTitle(context)}
            {this.getContent(context)}
          </CardStyled>
        )}
      </KamamanaConsumer>
    );
  }
}
