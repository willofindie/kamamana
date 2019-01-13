import React, { PureComponent } from 'react';
import memoizeOne from 'memoize-one';
import { KamamanaConsumer } from '/src/context';
import InputButtonStyled, { disabledCSS } from './input-button-styled';
import { darkenHexToAmount, isDarkHex, hexToRgb } from '/utils/colors';
import { isNumber, isEmpty } from '/utils/validators';

import type { Props, MemoizedData } from './index-button.d';
import type { Element, ElementRef } from 'react';

const darkenHexByTen = darkenHexToAmount(10);

/**
 * Supported Input Types:
 *
 *  - Only button types like `submit`, `reset` and `button`
 *
 * This Component is a total replica of Button component.
 */
export default class InputButton extends PureComponent<Props> {
  static defaultProps = {
    style: {},
    htmlType: 'submit',
  };

  inputWrapper: ?ElementRef<'span'>;
  getMemoizedData: Function;

  constructor(props: Props) {
    super(props);
    this.getMemoizedData = memoizeOne(this.getTypeAndStyles, this.shouldUpdateMemoize);
  }

  getGhostCSS = (shallowProps: Object) => {
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

  getBorderedCSS = (shallowProps: Object) => {
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

  getDefaultCSS = (shallowProps: Object) => {
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

  getCSSFromType = (shallowProps: Object) => {
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
  getCSS = (shallowProps: Object) => {
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
   * O(n) complexity for `shallowProps`. so looks ok for now.
   */
  shouldUpdateMemoize = (newArgs: mixed[], oldArgs: mixed[]): boolean =>
    newArgs.length === oldArgs.length &&
    newArgs.every(
      (newArg: mixed, index: number): boolean => {
        if (newArg && typeof newArg === 'object' && typeof oldArgs[index] === 'object') {
          // this check is very vague, but since I know (for now) args can be either string or object, it will work fine.
          const next: Object = newArg;
          const last: Object = oldArgs[index];
          return Object.keys(next).every(
            // Helps in one level down shallow comparison for objects...
            (key: string): boolean => {
              if (next.hasOwnProperty(key) && last.hasOwnProperty(key)) {
                return next[key] === last[key];
              }
              return false;
            }
          );
        }
        return newArg === oldArgs[index];
      }
    );

  /**
   * This Function should be used, after being memoized
   * Currently `this.getMemoizedData` is used for memoizing this function.
   *
   */
  getTypeAndStyles = (htmlType: string, shallowProps: Object): MemoizedData => {
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

  getIconNode = (icon: ?Element<any>): ?Element<any> => {
    if (icon && React.Children.count(icon)) {
      const className = icon.props.className ? `${icon.props.className} btn-icon` : `btn-icon`;
      return React.cloneElement(icon, { className }, icon.props.children);
    }

    return null;
  };

  handleClick = (e: SyntheticInputEvent<HTMLInputElement>) => {
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

  renderInput = (context: Object) => {
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
