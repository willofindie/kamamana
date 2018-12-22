import type {Node} from 'react';

export type Props = {
  // Styles specific Props
  bg?: string,
  fg?: string,
  bgHover?: string,
  fgHover?: string,
  ghost?: boolean,
  block?: boolean,
  // Button-DOM Specific Props
  disabled?: boolean,
  text: string,
  portraitIcon?: boolean,
  icon?: Node
}
