import React, { Component } from 'react';
import { KamamanaConsumer } from '/src/context';
import ContainerStyled from '../container-styled';
import { rgba } from '/utils/colors';

import type { Props, State } from './index.d';

/**
 * Supported Input Types:
 *
 *  - text, email and stuffs...
 *  - number
 *  - Anything that is not text or number, will be default to text.
 */
export default class Input extends Component<Props, State> {
  static defaultProps = {
    inputStyle: {},
    type: 'text',
  };

  state = {
    value: '',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.defaultValue || '',
    };
  }

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({
      value,
    });
  };

  getDefaultCSS = (context: Object) => {
    const inputTheme = context.input || {};
    const bgc = this.props.inputStyle.bgc || inputTheme.bgc || context.fadedWhite;
    const bdc = this.props.inputStyle.bdc || inputTheme.bdc || context.borderBlack;
    const bdcHover = this.props.bdcHover || context.light.primary;
    return {
      bgc,
      bdc,
      bdcHover,
    };
  };

  getCSSFromType = (type: string, context: Object) => {
    switch (type) {
      case 'number':
        return {};
      default:
        return this.getDefaultCSS(context);
    }
  };

  getCSS = (type: string, context: Object) => {
    const css = this.getCSSFromType(type, context);
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
      },
    };
  };

  filterInputStyle = (inputStyle: Object) => {
    const { bgc, bdc, ...rest } = inputStyle;
    return rest;
  };

  render() {
    const {
      id,
      className,
      label,
      type,
      placeholder,
      value,
      onChange,
      inputStyle,
      ...rest
    } = this.props;
    return (
      <KamamanaConsumer>
        {context => (
          <ContainerStyled css={this.getCSS(type, context)}>
            {label && (
              <label htmlFor={id} className='input-label'>
                {label}
              </label>
            )}
            <div id={id} className='input-component' style={this.filterInputStyle(inputStyle)}>
              <input
                type={type}
                placeholder={placeholder}
                value={value || this.state.value}
                onChange={onChange || this.handleChange}
                {...rest}
              />
            </div>
          </ContainerStyled>
        )}
      </KamamanaConsumer>
    );
  }
}
