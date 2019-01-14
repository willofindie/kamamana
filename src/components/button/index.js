import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { KamamanaConsumer } from '/src/context';
import ButtonStyled, { disabledCSS } from './button-styled';
import shouldUpdateMemoize from '/utils/should-update-memoize';
import { darkenHexToAmount, isDarkHex, hexToRgb } from '/utils/colors';

const darkenHexByTen = darkenHexToAmount(10);

export default class Button extends PureComponent {
  static propTypes = {
    // Styles specific Props
    style: PropTypes.object.isRequired,
    bgcHover: PropTypes.string, // Background Hover Color
    fgcHover: PropTypes.string, // Text Hover Color
    bdcHover: PropTypes.string, // Text Hover Color

    type: PropTypes.oneOf(['bordered', 'ghost']),
    block: PropTypes.bool,
    // Button-DOM Specific Props
    disabled: PropTypes.bool,
    text: PropTypes.string,
    icon: PropTypes.element,
    iconW: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    iconH: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    // Default Props
    className: PropTypes.string,
  };
  static defaultProps = {
    style: {},
  };

  constructor(props) {
    super(props);
    this.getMemoizedCSS = memoizeOne(this.getCSS, shouldUpdateMemoize);
  }

  getGhostCSS = shallowProps => {
    const btnTheme = shallowProps.context.btn || {};
    const bgc = 'transparent';
    const bgcHover = bgc;
    const fgc = shallowProps.style.c || btnTheme.c || shallowProps.context.fadedWhite;
    const fgcHover = shallowProps.fgcHover || shallowProps.context.light.primary;
    return {
      bgc,
      bgcHover,
      fgc,
      fgcHover,
      bdc: shallowProps.style.bdc || btnTheme.bdc || fgc,
      bdcHover: shallowProps.bdcHover || fgcHover,
    };
  };

  getBorderedCSS = shallowProps => {
    const btnTheme = shallowProps.context.btn || {};
    const bgc = shallowProps.context.fadedWhite;
    const bgcHover = bgc;
    const fgc = shallowProps.style.c || btnTheme.c || shallowProps.context.fadedBlack;
    const fgcHover = shallowProps.fgcHover || shallowProps.context.light.primary;
    return {
      bgc,
      bgcHover,
      fgc,
      fgcHover,
      bdc: shallowProps.style.bdc || btnTheme.bdc || fgc,
      bdcHover: shallowProps.bdcHover || fgcHover,
    };
  };

  getDefaultCSS = shallowProps => {
    const btnTheme = shallowProps.context.btn || {};
    const bgc = shallowProps.style.bgc || btnTheme.bgc || shallowProps.context.light.primary;
    const bgcHover =
      shallowProps.bgcHover ||
      darkenHexByTen(shallowProps.style.bgc || btnTheme.bgc || shallowProps.context.light.primary);
    return {
      bgc,
      bgcHover,
      fgc: shallowProps.style.c || btnTheme.c || shallowProps.context.fadedWhite,
      fgcHover:
        shallowProps.fgcHover ||
        (isDarkHex(bgcHover) ? shallowProps.context.fadedWhite : shallowProps.context.fadedBlack),
      bdc: shallowProps.style.bdc || btnTheme.bdc || bgc,
      bdcHover: shallowProps.bdcHover || bgcHover,
    };
  };

  getCSSFromType = (type, shallowProps) => {
    switch (type) {
      case 'ghost':
        return this.getGhostCSS(shallowProps);
      case 'bordered':
        return this.getBorderedCSS(shallowProps);
      default:
        return this.getDefaultCSS(shallowProps);
    }
  };

  // Dynamic CSS
  getCSS = (type, shallowProps) => {
    const css = this.getCSSFromType(type, shallowProps);
    const iconSize = {};
    if (shallowProps.iconH && shallowProps.iconW) {
      iconSize.h = shallowProps.iconH;
      iconSize.w = shallowProps.iconW;
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
      '&[disabled], &.disabled': disabledCSS(shallowProps.context),
      ...shallowProps.style,
    };
  };

  getIconNode = icon => {
    if (icon && React.Children.count(icon)) {
      const className = icon.props.className ? `${icon.props.className} btn-icon` : `btn-icon`;
      return React.cloneElement(icon, { className }, icon.props.children);
    }

    return null;
  };

  renderButton = context => {
    const {
      style,
      bgcHover,
      fgcHover,
      bdcHover,
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
    const shallowProps = { context, style, bgcHover, fgcHover, bdcHover, iconH, iconW };
    const css = this.getMemoizedCSS(type, shallowProps);
    return (
      <ButtonStyled css={css} disabled={disabled} className={className} {...rest}>
        {this.getIconNode(icon)}
        {text && <span className='btn-text'>{text}</span>}
      </ButtonStyled>
    );
  };

  render() {
    return <KamamanaConsumer>{this.renderButton}</KamamanaConsumer>;
  }
}
