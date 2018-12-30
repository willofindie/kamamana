import React, { Component } from 'react';
import ButtonStyled from './button-styled';
import Icon from '/src/icons';
import defaultTheme from '/src/theme';
import { darken, isDark, hexToRgb, rgbToHex } from '/utils/colors';
import filterKeys from '/utils/filterKeys';

// Import Types
import type { Color } from '/utils/colors';
import type { Props, State, Theme } from './index.d';

export default class Button extends Component<Props, State> {
  static defaultProps = {
    iconW: '16px',
    iconH: '16px',
  };

  get filteredStyleProp(): Theme {
    return filterKeys(this.props.style);
  }
  get filteredBtnThemeProp(): Theme {
    if (this.props.theme) {
      return filterKeys(this.props.theme.btn);
    }
    return {};
  }
  get isGhostType(): boolean {
    return this.props.type === 'ghost'; // Means Background is transparent, ALWAYS and Border animates
  }
  get isBorderedType(): boolean {
    return this.props.type === 'bordered'; // Means Background is white, Always, and Border animates
  }
  // Background related Colors...
  get bgc(): ?string {
    if (this.isGhostType) {
      return 'transparent';
    } else if (this.isBorderedType) {
      return defaultTheme.fadedWhite;
    }
    return this.state.theme.bgc;
  }
  get bgHoverC(): string {
    const defaultC = rgbToHex(darken(hexToRgb(this.state.theme.bgc), 10));
    if (this.isGhostType) {
      return 'transparent';
    } else if (this.isBorderedType) {
      return defaultTheme.fadedWhite;
    }
    return this.props.bgHoverC || (defaultC ? defaultC : defaultTheme.light.primary);
  }
  // Foreground related Colors...
  get fgc(): string {
    if (this.isGhostType) {
      return defaultTheme.fadedWhite;
    } else if (this.isBorderedType) {
      return defaultTheme.fadedBlack;
    }
    return this.state.theme.c || defaultTheme.fadedBlack;
  }
  get fgHoverC() {
    if (this.isGhostType || this.isBorderedType) {
      return this.props.fgHoverC || defaultTheme.light.primary;
    }
    return (
      this.props.fgHoverC ||
      (isDark(hexToRgb(this.bgHoverC)) ? defaultTheme.fadedWhite : defaultTheme.fadedBlack)
    );
  }
  // Border related Colors...
  get border() {
    let bdc =
      this.state.theme.bdc ||
      (this.state.theme.bgc ? this.state.theme.bgc : defaultTheme.light.primary);
    if (this.isGhostType || this.isBorderedType) {
      bdc = this.state.theme.bdc || this.fgc;
    }
    return `1px solid ${bdc}`;
  }
  get borderHoverC() {
    let bdc = this.state.theme.bdc || this.bgHoverC;
    if (this.isGhostType || this.isBorderedType) {
      bdc = this.state.theme.bdc || this.fgHoverC;
    }
    return `1px solid ${bdc}`;
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
    const {
      theme,
      style,
      bgHoverC,
      fgHoverC,
      type,
      block,
      text,
      disabled,
      icon,
      iconW,
      iconH,
      className,
      ...rest
    } = this.props;
    const css = {
      bgc: this.bgc,
      c: this.fgc,
      bd: this.border,
      '&:hover': {
        '&:not([disabled])': {
          bgc: this.bgHoverC,
          c: this.fgHoverC,
          bd: this.borderHoverC,
        },
      },
      ...style,
    };
    return (
      <ButtonStyled css={css} disabled={disabled} className={className} {...rest}>
        {icon && <Icon className='btn-icon' icon={icon} w={iconW} h={iconH} />}
        <span>{text}</span>
      </ButtonStyled>
    );
  }
}
