import type { Element } from 'react';

export type Props = {
  style: Object,
  // Styles specific Props
  bgcHover?: string, // Background Hover Color
  fgcHover?: string, // Text Hover Color
  bdcHover?: string, // Text Hover Color

  id?: string,
  className?: string,
  htmlType: string,
  type?: 'bordered' | 'ghost',
  block?: boolean,
  // Button-DOM Specific Props
  disabled?: boolean,
  text?: string,
  icon?: Element<any>,
  iconW?: number | string,
  iconH?: number | string,

  // Event Handlers
  onClick?: Function,
  onFocus?: Function,
  onBlur?: Function,
};

export type MemoizedData = {
  type: string,
  css: Object,
};
