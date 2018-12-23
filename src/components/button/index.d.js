import type { Node } from 'react';

export type Props = {
  // Styles specific Props
  bg?: string,
  fg?: string,
  border?: string,
  bgHover?: string,
  fgHover?: string,
  borderHover?: string,
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
