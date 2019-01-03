import type { Node, Element } from 'react';

export type Props = {
  style: Object,
  // Styles specific Props
  bgcHover?: string, // Background Hover Color
  fgcHover?: string, // Text Hover Color
  bdcHover?: string, // Text Hover Color

  type?: 'bordered' | 'ghost',
  block?: boolean,
  // Button-DOM Specific Props
  disabled?: boolean,
  text: string,
  icon?: Element<any>,
  iconW?: number | string,
  iconH?: number | string,

  // Default Props
  className?: string,
};

export type Theme = {
  light: Object,
  fadedWhite: string,
  fadedBlack: string,
  fz?: string | number,
  bgc?: string,
  c?: string,
  bdc?: string,
};

export type State = {
  theme: Theme,
};
