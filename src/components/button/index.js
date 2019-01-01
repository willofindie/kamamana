import React, { Component } from 'react';
import { KamamanaConsumer } from '/src/context';
import ButtonStyled, { disabledCSS } from './button-styled';
import Icon from '/src/icons';
import { darkenHexToAmount, isDarkHex } from '/utils/colors';
import filterKeys from '/utils/filterKeys';
import filterProps from './filter-props';

// Import Types
import type { Color } from '/utils/colors';
import type { Props, State, Theme } from './index.d';

const darkenHexByTen = darkenHexToAmount(10);

export default class Button extends Component<Props, State> {
  static defaultProps = {
    style: {},
    iconW: '16px',
    iconH: '16px',
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
    return {
      bgc: css.bgc,
      c: css.fgc,
      bd: `1px solid ${css.bdc}`,
      '&:hover': {
        '&:not([disabled])': {
          bgc: css.bgcHover,
          c: css.fgcHover,
          bd: `1px solid ${css.bdcHover}`,
        },
      },
      '&[disabled], &.disabled': disabledCSS(context),
      ...this.props.style,
    };
  };

  render() {
    const { custom, rest } = filterProps(this.props);
    return (
      <KamamanaConsumer>
        {context => {
          console.log('Inside Render', this.context);
          return (
            <ButtonStyled
              css={this.getCSS(custom.type, context)}
              disabled={custom.disabled}
              className={custom.className}
              {...rest}
            >
              {custom.icon && (
                <Icon className='btn-icon' icon={custom.icon} w={custom.iconW} h={custom.iconH} />
              )}
              <span>{custom.text}</span>
            </ButtonStyled>
          );
        }}
      </KamamanaConsumer>
    );
  }
}
