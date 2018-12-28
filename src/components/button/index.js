import React, { Component } from 'react';
import ButtonStyled from './button-styled';
import defaultTheme from 'src/theme';
import { darken, isDark, hexToRgb, rgbToHex } from 'utils/colors';
import filterKeys from 'utils/filterKeys';

// Import Types
import type { Color } from 'utils/colors';
import type { Props, State, Theme } from './index.d';

export default class Button extends Component<Props, State> {
  get filteredStyleProp(): Theme {
    return filterKeys(this.props.style);
  }
  get filteredBtnThemeProp(): Theme {
    if (this.props.theme) {
      return filterKeys(this.props.theme.btn);
    }
    return {};
  }
  get bgHoverC(): string {
    const defaultC = rgbToHex(darken(hexToRgb(this.state.theme.bgc), 10));
    return this.props.bgHoverC || (defaultC ? defaultC : defaultTheme.light.primary);
  }
  get fgHoverC() {
    return (
      this.props.bgHoverC ||
      (isDark(hexToRgb(this.bgHoverC)) ? defaultTheme.fadedWhite : defaultTheme.fadedBlack)
    );
  }
  get border() {
    return `1px solid ${this.state.theme.bgc ? this.state.theme.bgc : defaultTheme.light.primary}`;
  }
  get borderHoverC() {
    return `1px solid ${this.bgHoverC}`;
  }

  getDefaultState = (): Theme => ({
    fz: defaultTheme.btn.fz,
    c: defaultTheme.light.primaryFg,
    bgc: defaultTheme.light.primary,
  });

  // Theme precedence... defaultTheme < props.theme < props.style
  constructor(props: Props) {
    super(props);
    const defaults: Theme = this.getDefaultState();
    const filteredPropsStyle = this.filteredStyleProp;
    const filteredPropsBtnTheme = this.filteredBtnThemeProp;
    if (props.theme) {
      this.state = {
        theme: { ...defaults, ...filteredPropsBtnTheme, ...filteredPropsStyle },
      };
    } else {
      this.state = {
        theme: { ...defaults, ...filteredPropsStyle },
      };
    }
  }

  render() {
    const { text, disabled, block, icon, portraitIcon, className, ...rest } = this.props;
    const css = {
      bgc: this.state.theme.bgc,
      c: this.state.theme.c,
      bd: this.border,
      '&:hover': {
        '&:not([disabled])': {
          bgc: this.bgHoverC,
          c: this.fgHoverC,
          bd: this.borderHoverC,
        },
      },
    };
    const iconBg =
      portraitIcon &&
      {
        // bg: pallete.white,
      };
    return (
      <ButtonStyled css={css} disabled={disabled} className={className}>
        {text}
      </ButtonStyled>
    );
  }
}
