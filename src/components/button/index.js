import React, { Component } from 'react';
import ButtonStyled from './button-styled';
import pallete from 'utils/pallete';
import { isDark, hexToRgb } from 'utils/colors';

// Import Types
import type { Props } from './index.d';

export default class Button extends Component<Props> {
  get bgColor() {
    return this.props.bg || pallete.white;
  }
  get bgHoverColor() {
    return this.props.bgHover || pallete.blueGrey[500];
  }
  get fgColor() {
    return (
      this.props.fg || (isDark(hexToRgb(this.bgColor)) ? pallete.white : pallete.blueGrey[500])
    );
  }
  get fgHoverColor() {
    return (
      this.props.fgHover ||
      (isDark(hexToRgb(this.bgHoverColor)) ? pallete.white : pallete.blueGrey[500])
    );
  }
  get border() {
    return `1px solid ${this.props.border || this.bgHoverColor}`;
  }
  get borderHover() {
    return `1px solid ${this.props.borderHover || this.bgHoverColor}`;
  }

  render() {
    const {
      text,
      bg,
      fg,
      fgHover,
      bgHover,
      disabled,
      block,
      icon,
      portraitIcon,
      className,
      ...rest
    } = this.props;
    const css = {
      backgroundColor: this.bgColor,
      color: this.fgColor,
      border: this.border,
      '&:hover': {
        '&:not([disabled])': {
          backgroundColor: this.bgHoverColor,
          color: this.fgHoverColor,
          border: this.borderHover,
        },
      },
    };
    const iconBg = portraitIcon && {
      bg: pallete.white,
    };
    return (
      <ButtonStyled css={css} disabled={disabled} className={className}>
        {text}
      </ButtonStyled>
    );
  }
}
