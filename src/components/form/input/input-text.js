import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { KamamanaConsumer } from '/src/context';
import ContainerStyled from '../container-styled';
import shouldUpdateMemoize from '/utils/should-update-memoize';
import { rgba } from '/utils/colors';
import { isNumber, isEmpty } from '/utils/validators';

/**
 * Supported Input Types:
 *
 *  - Only text fields like `text`, `email`, `password` and related..., so as to reduce complexity
 *
 * TODO: https://www.chromium.org/developers/design-documents/create-amazing-password-forms
 */
export default class Input extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    htmlType: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['material', 'default']).isRequired,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    validator: PropTypes.func,
    // styles:
    style: PropTypes.object, // Reflects Container Styles...
    inputStyle: PropTypes.object.isRequired, // Reflects Input Styles..
    bdcHover: PropTypes.string,
    cols: PropTypes.string.isRequired, // Reflects how label and input should be aligned, and grow
    // Methods...
    onChange: PropTypes.func,
  };
  static defaultProps = {
    inputStyle: {},
    htmlType: 'text',
    type: 'default',
    cols: '1:4',
  };

  get validator() {
    return this.props;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || '',
      invalid: false,
    };
    this.getMemoizedData = memoizeOne(this.getTypeAndStyles, shouldUpdateMemoize);
  }

  handleBlur = e => {
    const value = e.target.value;
  };

  handleChange = e => {
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

  getDefaultCSS = shallowProps => {
    const inputTheme = shallowProps.context.input || {};
    const bgc = inputTheme.bgc || shallowProps.context.fadedWhite;
    const bdc = shallowProps.inputStyle.bdc || inputTheme.bdc || shallowProps.context.borderBlack;
    const _bdcHover = shallowProps.bdcHover || shallowProps.context.light.primary;
    return {
      bgc,
      bdc,
      bdcHover: _bdcHover,
    };
  };

  getCSSFromType = shallowProps => {
    switch (shallowProps.type) {
      case 'material':
        return {};
      default:
        return this.getDefaultCSS(shallowProps);
    }
  };

  getCSS = shallowProps => {
    const css = this.getCSSFromType(shallowProps);
    const focusColor = rgba(css.bdcHover, 0.3);
    const spans = shallowProps.cols.split(':').map(num => parseInt(num, 10));
    const totalWidth = spans.reduce((sum, val) => sum + val, 0);
    return {
      '& .input-label': {
        fxb: `${(spans[0] / totalWidth) * 100}%`,
      },
      '& .input-component': {
        fxb: `${(spans[1] / totalWidth) * 100}%`,
      },
      '& .input-component > input': {
        bgc: css.bgc,
        bd: `1px solid ${css.bdc}`,

        '&:hover, &:focus': {
          bd: `1px solid ${css.bdcHover}`,
        },

        '&:focus': {
          bxsh: `0 0 3px 1px ${focusColor}, 0 0 0 1px ${focusColor}`,
        },
        ...shallowProps.inputStyle,
      },
      ...shallowProps.style,
    };
  };

  filterInputStyle = inputStyle => {
    const { bgc, bdc, ...rest } = inputStyle;
    return rest;
  };

  getTypeAndStyles = (htmlType, shallowProps) => {
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
    memoizedData.css = this.getCSS(shallowProps);
    return memoizedData;
  };

  renderInput = context => {
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
      cols,
      ...rest
    } = this.props;
    const memoizedData = this.getMemoizedData(htmlType, {
      context,
      type,
      style,
      cols,
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
    return <KamamanaConsumer>{this.renderInput}</KamamanaConsumer>;
  }
}
