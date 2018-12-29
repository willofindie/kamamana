import type { Node } from 'react';

export type Props = {
  theme?: any,
  style?: any,
  // Styles specific Props
  bgHoverC?: string, // Background Hover Color
  fgHoverC?: string, // Text Hover Color

  type?: 'bordered' | 'ghost',
  block?: boolean,
  // Button-DOM Specific Props
  disabled?: boolean,
  text: string,
  icon?: string,
  iconW: string,
  iconH: string,

  // Default Props
  className?: string,
};

export type Theme = {
  fz?: string | number,
  bgc?: string,
  c?: string,
  bdc?: string,
};

export type State = {
  theme: Theme,
};
