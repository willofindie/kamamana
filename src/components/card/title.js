import React from 'react';
import PropTypes from 'prop-types';
import { KamamanaConsumer } from '/src/context';
import CardTitleStyled from './car-title-styled';

export default class CardTitle extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
  };
  static defaultProps = {
    className: 'title',
    style: {},
  };

  getCSS = context => {
    return {
      c: 'inherit',
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
