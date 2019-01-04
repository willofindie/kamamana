import React, { Component } from 'react';
import { KamamanaConsumer } from '/src/context';
import ButtonStyled, { disabledCSS } from './button-styled';
import { darkenHexToAmount, isDarkHex, hexToRgb } from '/utils/colors';
import filterKeys from '/utils/filterKeys';
import filterProps from './filter-props';

// Import Types
import type { Element } from 'react';
import type { Color } from '/utils/colors';
import type { Props, State, Theme } from './index.d';

const darkenHexByTen = darkenHexToAmount(10);

export default class Button extends Component<Props, State> {
  static defaultProps = {
    style: {},
  };

  getGhostCSS = (context: Object) => {
    const btnTheme = context.btn || {};
    const bgc = 'transparent';
    const bgcHover = bgc;
    const fgc = this.props.style.c || btnTheme.c || context.fadedWhite;
    const fgcHover = this.props.fgcHover || context.light.primary;
    return {
      bgc,
      bgcHover,
      fgc,
      fgcHover,
      bdc: this.props.style.bdc || btnTheme.bdc || fgc,
      bdcHover: this.props.bdcHover || fgcHover,
    };
  };

  getBorderedCSS = (context: Object) => {
    const btnTheme = context.btn || {};
    const bgc = context.fadedWhite;
    const bgcHover = bgc;
    const fgc = this.props.style.c || btnTheme.c || context.fadedBlack;
    const fgcHover = this.props.fgcHover || context.light.primary;
    return {
      bgc,
      bgcHover,
      fgc,
      fgcHover,
      bdc: this.props.style.bdc || btnTheme.bdc || fgc,
      bdcHover: this.props.bdcHover || fgcHover,
    };
  };

  getDefaultCSS = (context: Object) => {
    const btnTheme = context.btn || {};
    const bgc = this.props.style.bgc || btnTheme.bgc || context.light.primary;
    const bgcHover =
      this.props.bgcHover ||
      darkenHexByTen(this.props.style.bgc || btnTheme.bgc || context.light.primary);
    return {
      bgc,
      bgcHover,
      fgc: this.props.style.c || btnTheme.c || context.fadedWhite,
      fgcHover:
        this.props.fgcHover || (isDarkHex(bgcHover) ? context.fadedWhite : context.fadedBlack),
      bdc: this.props.style.bdc || btnTheme.bdc || bgc,
      bdcHover: this.props.bdcHover || bgcHover,
    };
  };

  getCSSFromType = (type: ?string, context: Object) => {
    switch (type) {
      case 'ghost':
        return this.getGhostCSS(context);
      case 'bordered':
        return this.getBorderedCSS(context);
      default:
        return this.getDefaultCSS(context);
    }
  };

  // Dynamic CSS
  getCSS = (type: ?string, context: Object) => {
    const css = this.getCSSFromType(type, context);
    const iconSize = {};
    if (this.props.iconH && this.props.iconW) {
      iconSize.h = this.props.iconH;
      iconSize.w = this.props.iconW;
    }
    const outlineRGB = hexToRgb(css.bdcHover);
    const focusColor = outlineRGB
      ? opacity => `rgba(${outlineRGB.r}, ${outlineRGB.g}, ${outlineRGB.b}, ${opacity})`
      : opacity => `rgba(0, 0, 0, ${opacity})`;
    return {
      bgc: css.bgc,
      c: css.fgc,
      bd: `1px solid ${css.bdc}`,
      '&:hover, &:focus': {
        '&:not([disabled])': {
          bgc: css.bgcHover,
          c: css.fgcHover,
          bd: `1px solid ${css.bdcHover}`,
        },
      },
      '&:focus': {
        bxsh: `0 0 3px 2px ${focusColor(0.3)}, 0 0 0 2px ${focusColor(0.1)}`,
      },
      '& .btn-icon': iconSize,
      '&[disabled], &.disabled': disabledCSS(context),
      ...this.props.style,
    };
  };

  getIconNode = (icon: ?Element<any>): ?Element<any> => {
    if (icon && React.Children.count(icon)) {
      const className = icon.props.className ? `${icon.props.className} btn-icon` : `btn-icon`;
      return React.cloneElement(icon, { className }, icon.props.children);
    }

    return null;
  };

  render() {
    const { custom, rest } = filterProps(this.props);
    const { icon, text, type, disabled, className } = custom;
    return (
      <KamamanaConsumer>
        {context => {
          return (
            <ButtonStyled
              css={this.getCSS(type, context)}
              disabled={disabled}
              className={className}
              {...rest}
            >
              {this.getIconNode(icon)}
              {text && <span className='btn-text'>{text}</span>}
            </ButtonStyled>
          );
        }}
      </KamamanaConsumer>
    );
  }
}
