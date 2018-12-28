import type { Node } from 'react';

export type Props = {
  theme?: any,
  style?: any,
  // Styles specific Props
  bgHoverC?: string, // Background Hover Color
  fgHoverC?: string, // Text Hover Color
  ghost?: boolean,
  block?: boolean,
  // Button-DOM Specific Props
  disabled?: boolean,
  text: string,
  portraitIcon?: boolean,
  icon?: Node,

  // Default Props
  className?: string,
};

export type Theme = {
  fz?: string | number,
  bgc?: string,
  c?: string,
};

export type State = {
  theme: Theme,
};
