import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { KamamanaConsumer } from '/src/context';
import InputButtonStyled, { disabledCSS } from './input-button-styled';
import shouldUpdateMemoize from '/utils/should-update-memoize';
import { darkenHexToAmount, isDarkHex, hexToRgb } from '/utils/colors';
import { isNumber, isEmpty } from '/utils/validators';

const darkenHexByTen = darkenHexToAmount(10);

/**
 * Supported Input Types:
 *
 *  - Only button types like `submit`, `reset` and `button`
 *
 * This Component is a total replica of Button component, w.r.t. styles.
 */
export default class InputButton extends PureComponent {
  static propTypes = {
    // Styles specific Props
    style: PropTypes.object.isRequired,
    bgcHover: PropTypes.string, // Background Hover Color
    fgcHover: PropTypes.string, // Text Hover Color
    bdcHover: PropTypes.string, // Text Hover Color

    id: PropTypes.string,
    className: PropTypes.string,
    htmlType: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bordered', 'ghost']),
    block: PropTypes.bool,
    // Button-DOM Specific Props
    disabled: PropTypes.bool,
    text: PropTypes.string,
    icon: PropTypes.element,
    iconW: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    iconH: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    // Event Handlers
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };
  static defaultProps = {
    style: {},
    htmlType: 'submit',
  };

  constructor(props) {
    super(props);
    this.getMemoizedData = memoizeOne(this.getTypeAndStyles, shouldUpdateMemoize);
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

  getCSSFromType = shallowProps => {
    switch (shallowProps.type) {
      case 'ghost':
        return this.getGhostCSS(shallowProps);
      case 'bordered':
        return this.getBorderedCSS(shallowProps);
      default:
        return this.getDefaultCSS(shallowProps);
    }
  };

  // Dynamic CSS
  getCSS = shallowProps => {
    const css = this.getCSSFromType(shallowProps);
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
        '&:not([disabled])': {
          bxsh: `0 0 3px 2px ${focusColor(0.3)}, 0 0 0 2px ${focusColor(0.1)}`,
        },
      },
      '& .btn-icon': iconSize,
      '&[disabled], &.disabled': disabledCSS(shallowProps.context),
      ...shallowProps.style,
    };
  };

  /**
   * This Function should be used, after being memoized
   * Currently `this.getMemoizedData` is used for memoizing this function.
   *
   */
  getTypeAndStyles = (htmlType, shallowProps) => {
    const memoizedData = {
      type: 'submit',
      css: null,
    };
    switch (htmlType) {
      case 'reset':
      case 'button':
        memoizedData.type = htmlType;
        break;
      default:
        break;
    }
    memoizedData.css = this.getCSS(shallowProps);
    return memoizedData;
  };

  getIconNode = icon => {
    if (icon && React.Children.count(icon)) {
      const className = icon.props.className ? `${icon.props.className} btn-icon` : `btn-icon`;
      return React.cloneElement(icon, { className }, icon.props.children);
    }

    return null;
  };

  handleClick = e => {
    if (this.props.onClick) {
      this.props.onClick(e);
      return;
    }
    const inputEle = e.target.querySelector('.btn-text');
    // Trigger Custom Events: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
    var event = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true,
    });
    inputEle && inputEle.dispatchEvent(event);
  };

  renderInput = context => {
    const {
      style,
      bgcHover,
      fgcHover,
      bdcHover,
      htmlType,
      type,
      block,
      disabled,
      text,
      icon,
      iconW,
      iconH,
      onClick,
      ...rest
    } = this.props;
    const memoizedData = this.getMemoizedData(htmlType, {
      context,
      type,
      style,
      bgcHover,
      fgcHover,
      bdcHover,
      iconH,
      iconW,
    });
    return (
      <InputButtonStyled
        tabIndex={0}
        css={memoizedData.css}
        disabled={disabled}
        onClick={this.handleClick}
        {...rest}
      >
        {this.getIconNode(icon)}
        <input
          tabIndex={-1}
          className='btn-text'
          type={memoizedData.type}
          value={text}
          disabled={disabled}
        />
      </InputButtonStyled>
    );
  };

  render() {
    return <KamamanaConsumer>{context => this.renderInput(context)}</KamamanaConsumer>;
  }
}
