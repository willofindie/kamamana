import React, { Component } from 'react';
import pallete from '../../utils/pallete';

// Import Types
import type { Props } from './index.d';

export default class Button extends Component<Props> {
  render() {
    const {
      text,
      bg,
      fg,
      ghost,
      fgHover,
      bgHover,
      disabled,
      block,
      icon,
      portraitIcon,
      ...rest
    } = this.props;
    const iconBg = portraitIcon && {
      bg: pallete.white,
    };
    return (
      <button>{text + text}</button>
      // <ButtonStyled
      //   className='s-button'
      //   block={block}
      //   disabled={disabled}
      //   ghost={ghost ? ghost : undefined}
      //   bg={bg}
      //   fg={fg}
      //   fgHover={fgHover}
      //   bgHover={bgHover}
      //   {...rest}
      // >
      //   {icon && <Icon className='btn-icon' width={16} height={16} icon={icon} {...iconBg} />}
      //   <span className='btn-text'>{text}</span>
      // </ButtonStyled>
    );
  }
}
