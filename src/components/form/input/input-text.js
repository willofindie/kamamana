import React, { PureComponent } from 'react';
import memoizeOne from 'memoize-one';
import { KamamanaConsumer } from '/src/context';
import ContainerStyled from '../container-styled';
import { rgba } from '/utils/colors';
import { isNumber, isEmpty } from '/utils/validators';

import type { Props, State, MemoizedData } from './index.d';

/**
 * Supported Input Types:
 *
 *  - Only text fields like `text`, `email`, `password` and related..., so as to reduce complexity
 *
 * TODO: https://www.chromium.org/developers/design-documents/create-amazing-password-forms
 */
export default class Input extends PureComponent<Props, State> {
  static defaultProps = {
    inputStyle: {},
    htmlType: 'text',
    type: 'default',
  };

  get validator() {
    return this.props;
  }

  getMemoizedData: Function;

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.defaultValue || '',
      invalid: false,
    };
    this.getMemoizedData = memoizeOne(this.getTypeAndStyles, this.shouldUpdateMemoize);
  }

  handleBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const value = e.target.value;
  };

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (this.props.validator) {
      this.props.validator(value) &&
        this.setState({
          value,
        });
      return;
    }
    this.setState({
      value,
    });
  };

  getDefaultCSS = (context: Object, props: Props) => {
    const inputTheme = context.input || {};
    const bgc = inputTheme.bgc || context.fadedWhite;
    const bdc = props.inputStyle.bdc || inputTheme.bdc || context.borderBlack;
    const _bdcHover = props.bdcHover || context.light.primary;
    return {
      bgc,
      bdc,
      bdcHover: _bdcHover,
    };
  };

  getCSSFromType = (context: Object, props: Props) => {
    switch (props.type) {
      case 'material':
        return {};
      default:
        return this.getDefaultCSS(context, props);
    }
  };

  getCSS = (context: Object, props: Props) => {
    const css = this.getCSSFromType(context, props);
    const focusColor = rgba(css.bdcHover, 0.3);
    return {
      '& .input-component > input': {
        bgc: css.bgc,
        bd: `1px solid ${css.bdc}`,

        '&:hover, &:focus': {
          bd: `1px solid ${css.bdcHover}`,
        },

        '&:focus': {
          bxsh: `0 0 3px 1px ${focusColor}, 0 0 0 1px ${focusColor}`,
        },
        ...props.inputStyle,
      },
      ...props.style,
    };
  };

  filterInputStyle = (inputStyle: Object) => {
    const { bgc, bdc, ...rest } = inputStyle;
    return rest;
  };

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

  getTypeAndStyles = (htmlType: string, context: Object, props: Props): MemoizedData => {
    const memoizedData = {
      type: 'text',
      css: null,
    };
    switch (htmlType) {
      case 'password':
      case 'email':
      case 'url':
      case 'search':
        memoizedData.type = htmlType;
        break;
      default:
        break;
    }
    memoizedData.css = this.getCSS(context, props);
    return memoizedData;
  };

  renderInput = (context: Object) => {
    const {
      id,
      className,
      defaultValue,
      label,
      htmlType,
      type,
      placeholder,
      value,
      onChange,
      style,
      inputStyle,
      bdcHover,
      validator,
      ...rest
    } = this.props;
    const memoizedData = this.getMemoizedData(htmlType, context, {
      type,
      style,
      inputStyle,
      bdcHover,
    });
    return (
      <ContainerStyled css={memoizedData.css}>
        {label && (
          <label htmlFor={id} className='input-label'>
            {label}
          </label>
        )}
        <div id={id} className='input-component' style={this.filterInputStyle(inputStyle)}>
          <input
            type={memoizedData.type}
            placeholder={placeholder}
            value={value || this.state.value}
            onChange={onChange || this.handleChange}
            {...rest}
          />
        </div>
      </ContainerStyled>
    );
  };

  render() {
    return <KamamanaConsumer>{context => this.renderInput(context)}</KamamanaConsumer>;
  }
}
